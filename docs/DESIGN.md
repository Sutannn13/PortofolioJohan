# Design Direction

## Anchor
Vercel - A stark black-and-ink duet on near-white or pure-black canvas, precision-engineered minimalism with zero neon glow.

## Tokens
- **Typography**: 
  - display: Geist, Inter, sans-serif
  - body: Geist, Inter, sans-serif
  - mono: Geist Mono, ui-monospace, monospace
  - scale method: aggressive negative tracking for display (-1px to -2px)
- **Colors**: 
  - primary: `#ffffff` (text on dark)
  - surface: `#000000` (canvas)
  - surface-inset: `#0a0a0a` (cards)
  - hairline: `#333333` (borders)
  - mute: `#888888` (secondary text)
  - success: `#0070f3` (blue accent, no neon)
  - error: `#ee0000`
- **Spacing**: base 4px scale
- **Radius**: md: 8px (marketing cards)
- **Shadow**: none or very subtle inset/stacked drop. No heavy glow.
- **Motion**: duration 200ms, easing ease-out, no continuous pulsing unless tiny status dots.

## Constraints
- WCAG 2.2 AA floor
- Anti-patterns: No neon glows, no glassmorphism (no backdrop-blur), no arbitrary decorative gradients.
- Ensure all user-supplied input is sanitized, all status indicators have non-color alternatives, and all interactive elements have visible focus states.

## Previous Directions
Neon dark mode with purple/pink gradients and glassmorphism. (Blocklist)
