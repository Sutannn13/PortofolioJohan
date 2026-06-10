// ─────────────────────────────────────────────
// GitHub Public API Service
// Semi-realtime data with in-memory caching
// No token required — uses public endpoints only
// ─────────────────────────────────────────────

const GITHUB_USERNAME = 'Sutannn13';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// ── Types ────────────────────────────────────────────────────────────────────

export interface GitHubUserProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepoDetail {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  pushed_at: string;
  updated_at: string;
  created_at: string;
  topics: string[];
}

export interface GitHubEventPayload {
  commits?: { message: string; sha: string; url: string }[];
  ref?: string;
  ref_type?: string;
  action?: string;
  description?: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  payload: GitHubEventPayload;
  created_at: string;
}

export interface GitHubActivityData {
  user: GitHubUserProfile | null;
  repos: GitHubRepoDetail[];
  events: GitHubEvent[];
  totalStars: number;
  error: string | null;
  loading: boolean;
}

// ── Language Colors ─────────────────────────────────────────────────────────

export const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  PHP: '#777bb4',
  HTML: '#e34f26',
  CSS: '#264de4',
  Python: '#3776ab',
  Java: '#b07219',
  'C#': '#178600',
  Go: '#00add8',
  Rust: '#dea584',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Kotlin: '#7f52ff',
  Swift: '#fa7343',
  Dart: '#00b4ab',
  Shell: '#89e051',
  Blade: '#f7523f',
  PLpgSQL: '#336791',
};

// ── Cache ────────────────────────────────────────────────────────────────────

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheEntry<unknown>> = {};

function getCached<T>(key: string): T | null {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    delete cache[key];
    return null;
  }
  return entry.data as T;
}

function setCache<T>(key: string, data: T): void {
  cache[key] = { data, timestamp: Date.now() };
}

// ── API Fetcher ──────────────────────────────────────────────────────────────

async function fetchGitHub<T>(endpoint: string): Promise<T | null> {
  const cacheKey = `gh:${endpoint}`;
  const cached = getCached<T>(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`https://api.github.com${endpoint}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    });

    if (!res.ok) {
      if (res.status === 403) {
        console.warn('[GitHub] Rate limited. Using cached/fallback data.');
      }
      return null;
    }

    const data = await res.json();
    setCache(cacheKey, data);
    return data as T;
  } catch (err) {
    console.warn('[GitHub] Fetch error:', err);
    return null;
  }
}

// ── Public API ───────────────────────────────────────────────────────────────

export async function fetchGitHubUser(): Promise<GitHubUserProfile | null> {
  return fetchGitHub<GitHubUserProfile>(`/users/${GITHUB_USERNAME}`);
}

export async function fetchGitHubRepos(): Promise<GitHubRepoDetail[]> {
  const data = await fetchGitHub<GitHubRepoDetail[]>(
    `/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=20&type=owner`
  );
  return Array.isArray(data) ? data.filter((r) => !r.fork) : [];
}

export async function fetchGitHubEvents(): Promise<GitHubEvent[]> {
  const data = await fetchGitHub<GitHubEvent[]>(
    `/users/${GITHUB_USERNAME}/events/public?per_page=30`
  );
  return Array.isArray(data) ? data : [];
}

export async function fetchAllGitHubData(): Promise<Omit<GitHubActivityData, 'loading'>> {
  const [user, repos, events] = await Promise.all([
    fetchGitHubUser(),
    fetchGitHubRepos(),
    fetchGitHubEvents(),
  ]);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  return {
    user,
    repos,
    events,
    totalStars,
    error: !user && repos.length === 0 ? 'GitHub activity temporarily unavailable. Please try again later.' : null,
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function timeAgo(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diff = now - then;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  return `${months}mo ago`;
}

export function getEventDescription(event: GitHubEvent): string {
  const repoName = event.repo.name.split('/')[1] || event.repo.name;

  switch (event.type) {
    case 'PushEvent': {
      const commits = event.payload.commits;
      if (commits && commits.length > 0) {
        return commits[0].message.split('\n')[0];
      }
      return `Pushed to ${repoName}`;
    }
    case 'CreateEvent':
      return `Created ${event.payload.ref_type || 'repository'} ${event.payload.ref || repoName}`;
    case 'DeleteEvent':
      return `Deleted ${event.payload.ref_type || 'branch'} ${event.payload.ref || ''}`;
    case 'WatchEvent':
      return `Starred ${repoName}`;
    case 'ForkEvent':
      return `Forked ${repoName}`;
    case 'IssuesEvent':
      return `${event.payload.action || 'updated'} issue in ${repoName}`;
    case 'PullRequestEvent':
      return `${event.payload.action || 'updated'} PR in ${repoName}`;
    case 'ReleaseEvent':
      return `Published release in ${repoName}`;
    default:
      return `Activity in ${repoName}`;
  }
}

export function getEventIcon(eventType: string): string {
  switch (eventType) {
    case 'PushEvent': return '⬆️';
    case 'CreateEvent': return '✨';
    case 'DeleteEvent': return '🗑️';
    case 'WatchEvent': return '⭐';
    case 'ForkEvent': return '🍴';
    case 'IssuesEvent': return '🐛';
    case 'PullRequestEvent': return '🔀';
    case 'ReleaseEvent': return '🚀';
    default: return '📌';
  }
}

export { GITHUB_USERNAME };
