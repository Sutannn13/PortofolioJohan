import type { PortfolioData } from '../src/types';

// ─────────────────────────────────────────────
// All personal data is isolated here.
// Edit this file to update your portfolio content.
// ─────────────────────────────────────────────

import profileImage from './porto profil.jpeg';
import hmtiImage from './hmti.png';
import tokoListrikImage from './Toko listrik arip.jpeg';
import skillPathAiImage from './Skill Path AI.jpeg';

const portfolioData: PortfolioData = {
    personal: {
        name: 'Sutan Arlie Johan',
        firstName: 'Sutan Arlie',
        lastName: 'Johan',
        title: 'Backend Developer Intern',
        tagline: 'Backend Developer Intern specializing in Laravel, REST APIs, and database design.',
        bio: `Information Technology student (semester 6) at UBSI Depok, currently interning as a Backend Engineer at Connextion Tech. I build REST APIs with Laravel, design relational databases with MySQL, and ship tested, documented code. My work includes a HKI-certified smart waste management app (Trash Point, Juara 2 UBSI Jabar) and multiple real-client e-commerce platforms. I also hold MTCNA and Cisco networking certifications, and I am a published academic contributor in JITK.`,
        shortBio: 'Developer. Engineer. Creator.',
        email: 'sutanarliejohan@gmail.com',
        location: 'Bogor, Indonesia',
        availableForWork: true,
        profileImage,
    },

    socials: [
        {
            id: 'github',
            label: 'GitHub',
            url: 'https://github.com/sutanarlie',
            icon: 'github',
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            url: 'https://linkedin.com/in/sutanarlie',
            icon: 'linkedin',
        },
        {
            id: 'instagram',
            label: 'Instagram',
            url: 'https://instagram.com/sutanarlie',
            icon: 'instagram',
        },
        {
            id: 'email',
            label: 'Email',
            url: 'mailto:sutanarliejohan@gmail.com',
            icon: 'mail',
        },
    ],

    skills: [
        { id: 's6', name: 'Laravel', category: 'backend', proficiency: 85 },
        { id: 's7', name: 'PHP', category: 'backend', proficiency: 82 },
        { id: 's9', name: 'MySQL', category: 'database', proficiency: 80 },
        { id: 's12', name: 'Git', category: 'tools', proficiency: 85 },
        { id: 's8', name: 'Node.js', category: 'backend', proficiency: 70 },
        { id: 's2', name: 'TypeScript', category: 'frontend', proficiency: 80 },
        { id: 's1', name: 'React', category: 'frontend', proficiency: 85 },
        { id: 's3', name: 'Tailwind CSS', category: 'frontend', proficiency: 90 },
        { id: 's10', name: 'MikroTik', category: 'networking', proficiency: 85 },
        { id: 's11', name: 'Cisco', category: 'networking', proficiency: 75 },
        { id: 's14', name: 'Linux', category: 'tools', proficiency: 75 },
        { id: 's13', name: 'Figma', category: 'tools', proficiency: 70 },
        { id: 's15', name: 'Prompt Engineering', category: 'ai', proficiency: 85 },
        { id: 's16', name: 'AI Agents', category: 'ai', proficiency: 80 },
        { id: 's17', name: 'AI-Assisted Dev', category: 'ai', proficiency: 90 },
    ],

    projects: [
        {
            id: 'p1',
            title: 'Trash Point',
            description:
                'Smart waste management system innovation developed during an IT bootcamp. Awarded 2nd Place at UBSI West Java, featuring location tracking for waste drop-offs, an analytics dashboard, and a point-based reward system.',
            longDescription: `
                <div class="space-y-4">
                    <h4 class="text-xl font-semibold text-white">Latar Belakang</h4>
                    <p>Pengelolaan sampah seringkali menjadi masalah krusial di lingkungan urban. Kurangnya fasilitas yang terhubung dan kesadaran masyarakat menyebabkan banyak wilayah yang membuang sampah sembarangan. <strong>Trash Point</strong> diinisiasi sebagai solusi digital yang proaktif, menghubungkan masyarakat dengan manajemen sampah secara real-time.</p>
                    <h4 class="text-xl font-semibold text-white mt-6">Solusi & Fitur Utama</h4>
                    <p>Aplikasi web ini menghadirkan sistem pelacakan titik sampah terdekat dengan peta interaktif. Kami menerapkan model insentif berbasis poin di mana setiap pelaporan atau pembuangan sampah pada tempatnya dapat dikonversi menjadi hadiah.</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Dashboard Analitik:</strong> Memudahkan admin untuk memantau tren penumpukan sampah di berbagai distrik.</li>
                        <li><strong>Reward System:</strong> Menggunakan struktur poin agar masyarakat memiliki motivasi lebih tinggi dalam menjaga kebersihan lingkungan.</li>
                        <li><strong>Pelaporan Real-time:</strong> Pelaporan cepat lokasi yang darurat membutuhkan penanganan kebersihan.</li>
                    </ul>
                    <h4 class="text-xl font-semibold text-white mt-6">Dampak & Prestasi</h4>
                    <p>Proyek ini tidak hanya sekadar prototipe fungsional; dengan koordinasi tim yang solid, dedikasi, serta validasi kelayakan bisnis, proyek <strong>Trash Point</strong> sukses menempati posisi <strong>Juara 2 dalam ajang IT Bootcamp se-Universitas Bina Sarana Informatika Jawa Barat</strong>. Lebih lanjut, karya inovatif ini telah resmi menerima <strong>Sertifikat Hak Kekayaan Intelektual (HKI)</strong>.</p>
                </div>
            `,
            techStack: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'JavaScript'],
            imageUrl: '/sosial/HKI.jpeg',
            featured: true,
            category: 'Web App',
            award: '🏆 Juara 2 — UBSI Jawa Barat',
            projectType: 'Real Project',
            status: 'Live',
        },
        {
            id: 'p4',
            title: 'Website Toko Listrik Arip',
            description:
                'E-commerce platform for an electrical supply store featuring a product catalog, shopping cart, checkout flow, admin dashboard, and full transaction management.',
            longDescription: `
                <div class="space-y-4">
                    <h4 class="text-xl font-semibold text-white">Latar Belakang</h4>
                    <p>Toko perlengkapan listrik konvensional seringkali menghadapi kendala dalam pengelolaan stok, pencatatan transaksi, dan jangkauan pelanggan. <strong>Website Toko Listrik Arip</strong> dikembangkan sebagai solusi digital untuk modernisasi operasional toko, memungkinkan pelanggan menelusuri katalog produk dan melakukan pemesanan secara online.</p>
                    <h4 class="text-xl font-semibold text-white mt-6">Arsitektur & Fitur Utama</h4>
                    <p>Dibangun menggunakan <strong>Laravel</strong> dengan arsitektur MVC yang solid. Blade templating digunakan di sisi frontend untuk rendering tampilan yang dinamis dan responsif. Sistem ini mencakup seluruh alur e-commerce dari browsing produk hingga manajemen pesanan.</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Katalog Produk Digital:</strong> Menampilkan berbagai kategori perlengkapan listrik — kabel, saklar, lampu, MCB, dan komponen lainnya — dengan detail harga dan ketersediaan stok.</li>
                        <li><strong>Keranjang Belanja & Checkout:</strong> Sistem cart yang persisten dengan alur checkout yang ramah pengguna dan mendukung pembayaran manual.</li>
                        <li><strong>Dashboard Admin:</strong> Panel administrasi lengkap untuk mengelola produk, memantau pesanan masuk, dan mengatur status transaksi secara real-time.</li>
                        <li><strong>Manajemen Transaksi:</strong> Pencatatan dan pelacakan seluruh transaksi dari pemesanan hingga penyelesaian pembayaran.</li>
                    </ul>
                    <h4 class="text-xl font-semibold text-white mt-6">Potensi Pengembangan</h4>
                    <p>Project ini termasuk <strong>Real Project</strong> yang bisa dikembangkan lebih lanjut dengan integrasi payment gateway, tracking order, invoice otomatis, dan laporan penjualan untuk mendukung pertumbuhan bisnis toko listrik secara digital.</p>
                </div>
            `,
            techStack: ['Laravel', 'PHP', 'Blade', 'JavaScript', 'CSS'],
            imageUrl: tokoListrikImage,
            repoUrl: 'https://github.com/Sutannn13/toko-listrik-arip',
            featured: true,
            category: 'E-Commerce',
            projectType: 'Real Project',
            status: 'In Development',
        },
        {
            id: 'p2',
            title: 'E-Commerce Platform for Fresh Fish Transactions',
            description:
                'E-commerce platform specifically for fresh fish transactions, complete with product management, a shopping cart system, payment gateway integration, and an admin dashboard to monitor sales in real-time.',
            longDescription: `
                <div class="space-y-4">
                    <h4 class="text-xl font-semibold text-white">Tinjauan Proyek</h4>
                    <p>Pasar perikanan lokal kerap kali menghadapi kendala distribusi yang memakan waktu sehingga kesegaran hasil tangkapan menurun saat mencapai konsumen akhir. E-Commerce Platform khusus transaksi ikan segar ini dirancang dari nol bekerja sama dengan dosen universitas untuk memotong perantara (middle-men), memberdayakan nelayan lokal, dan menghadirkan ikan kualitas premium langsung ke tangan pelanggan secara efisien.</p>
                    <h4 class="text-xl font-semibold text-white mt-6">Arsitektur & Pengembangan</h4>
                    <p>Secara teknis, platform ini dibangun menggunakan <strong>Laravel & PHP</strong> sebagai fondasi *backend* yang melayani manajemen pengelolaan produk, stok inventaris, serta autentikasi berbasis *role* (pengguna vs admin). UI/UX di sisi publik dan area dashboard diformulasikan dengan <strong>Tailwind CSS</strong> agar sepenuhnya responsif pada segala ukuran perangkat seluler dan desktop.</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Modul Manajemen Inventaris:</strong> Monitoring level stok Ikan Nila & Ikan Mas Premium secara akurat.</li>
                        <li><strong>Gateway Pembayaran:</strong> Integrasi API transaksi digital guna memberikan kemudahan belanja dan tingkat keamanan yang sesuai standar industri.</li>
                        <li><strong>Admin Dashboard:</strong> Visualisasi grafik data untuk analitik pesanan dan pantauan pendapatan secara real-time.</li>
                    </ul>
                    <h4 class="text-xl font-semibold text-white mt-6">Hasil Akhir</h4>
                    <p>Aplikasi ini sukses mendemonstrasikan sistem tata kelola bisnis berbasis *Full-Stack* yang solid dengan arsitektur database relasional (MySQL) dengan pengelolaan *state* keranjang belanja yang persisten dan alur *checkout* transaksi yang ramah pengguna.</p>
                </div>
            `,
            techStack: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'JavaScript'],
            imageUrl: '/sosial/fish market.png',
            repoUrl: 'https://github.com/Sutannn13/E-commerce-platform-for-fresh-fish-transactions.git',
            featured: true,
            category: 'Web App',
            projectType: 'Real Project',
            status: 'Archived',
        },
        {
            id: 'p3',
            title: 'Website HMTI BSI Margonda',
            description:
                'Official website for the Information Technology Student Association (HMTI) at UBSI Margonda campus — a digital platform for event information, announcements, and organization profiles.',
            longDescription: `
                <div class="space-y-4">
                    <h4 class="text-xl font-semibold text-white">Tentang Proyek</h4>
                    <p><strong>HMTI BSI Margonda</strong> adalah organisasi kemahasiswaan di bawah Program Studi Teknologi Informasi, Universitas Bina Sarana Informatika. Website ini dikembangkan sebagai platform digital resmi HMTI untuk menampilkan informasi organisasi, agenda kegiatan, pengumuman, dan galeri dokumentasi kemahasiswaan.</p>
                    <h4 class="text-xl font-semibold text-white mt-6">Fitur & Arsitektur</h4>
                    <p>Dibangun menggunakan <strong>Laravel</strong> dengan arsitektur MVC yang terstruktur rapi. Blade templating digunakan di sisi frontend untuk rendering tampilan yang dinamis dan responsif di berbagai perangkat.</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Halaman Profil Organisasi:</strong> Menampilkan visi-misi, struktur kepengurusan, dan identitas HMTI secara profesional.</li>
                        <li><strong>Manajemen Konten Dinamis:</strong> Sistem backend untuk mengelola berita, agenda kegiatan, dan pengumuman secara real-time.</li>
                        <li><strong>Desain Responsif:</strong> Tampilan optimal di semua ukuran layar menggunakan Tailwind CSS dan Vite sebagai build tool modern.</li>
                    </ul>
                    <h4 class="text-xl font-semibold text-white mt-6">Konteks Pengembangan</h4>
                    <p>Proyek ini merupakan kontribusi nyata dalam ekosistem kampus UBSI, mendukung digitalisasi kegiatan kemahasiswaan dan memperkuat identitas digital HMTI di tingkat universitas.</p>
                </div>
            `,
            techStack: ['Laravel', 'PHP', 'Blade', 'MySQL', 'Tailwind CSS', 'Vite'],
            imageUrl: hmtiImage,
            repoUrl: 'https://github.com/Sutannn13/HMTI-Margonda.git',
            featured: true,
            category: 'Organization Website',
            projectType: 'Organization Website',
        },
        {
            id: 'p5',
            title: 'Skill Path AI',
            description:
                'Prototype AI platform designed to generate personalized learning roadmaps based on users\' career goals, interests, and current skill levels.',
            longDescription: `
                <div class="space-y-4">
                    <h4 class="text-xl font-semibold text-white">Tentang Project</h4>
                    <p><strong>Skill Path AI</strong> adalah dummy project yang dirancang sebagai platform pembelajaran berbasis AI. Tujuannya membantu pengguna menentukan jalur belajar yang lebih terarah, mulai dari pemilihan skill, urutan materi, rekomendasi project latihan, hingga evaluasi progres.</p>
                    <h4 class="text-xl font-semibold text-white mt-6">Fitur & Arsitektur</h4>
                    <p>Dibangun menggunakan <strong>TypeScript</strong> sebagai bahasa utama dengan arsitektur modern yang memanfaatkan <strong>PostgreSQL</strong> untuk penyimpanan data relasional. Sistem ini dirancang untuk menghasilkan roadmap belajar yang dipersonalisasi sesuai kebutuhan setiap pengguna.</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Personalized Roadmap:</strong> Algoritma yang menyesuaikan jalur belajar berdasarkan target karier, level kemampuan saat ini, dan minat pengguna.</li>
                        <li><strong>Skill Assessment:</strong> Evaluasi awal untuk menentukan starting point yang tepat dalam roadmap pembelajaran.</li>
                        <li><strong>Project Recommendations:</strong> Rekomendasi project latihan yang relevan untuk setiap tahap pembelajaran.</li>
                        <li><strong>Progress Tracking:</strong> Pemantauan progres belajar dengan visualisasi pencapaian dan milestone.</li>
                    </ul>
                    <h4 class="text-xl font-semibold text-white mt-6">Potensi Masa Depan</h4>
                    <p>Walaupun masih prototype, project ini punya peluang menjadi <strong>real product</strong> karena relevan untuk mahasiswa, career switcher, dan orang yang ingin belajar teknologi secara terstruktur. Pengembangan lanjutan meliputi integrasi AI yang lebih canggih, community features, dan partnership dengan platform edtech.</p>
                </div>
            `,
            techStack: ['TypeScript', 'JavaScript', 'PostgreSQL', 'CSS'],
            imageUrl: skillPathAiImage,
            repoUrl: 'https://github.com/Sutannn13/Skill-Path-AI',
            featured: true,
            category: 'AI Learning Platform',
            projectType: 'Dummy Project',
            status: 'Prototype',
        },
    ],

    experiences: [
        {
            id: 'e0',
            role: 'Backend Engineer Intern',
            company: 'Connextion',
            location: 'Indonesia (Remote)',
            startDate: 'Mar 2026',
            endDate: 'Present',
            description:
                'Currently working as a Backend Engineer Intern at Connextion (connextion.tech), helping aspiring founders build market-ready products by developing scalable backend architectures and API integrations.',
            highlights: [
                'Set up and configured Firebase and Google Authentication for secure user access.',
                "Designed and implemented the database schema for the platform's questionnaire responses.",
                'Developed and integrated REST APIs connecting the frontend questionnaire forms with the backend system.',
            ],
        },
        {
            id: 'e1',
            role: 'Peneliti & Pengembang Aplikasi',
            company: 'Universitas Bina Sarana Informatika, Project Base',
            location: 'Depok, Indonesia',
            startDate: 'Sept 2025',
            endDate: 'Jan 2026',
            description:
                'Co-developed a gamified mobile application for educating early childhood about preventing child sexual abuse (CSA). Contributed to academic publication on UX evaluation and facilitated community-based Digital Marketing training.',
            highlights: [
                'Co-developed a gamified mobile education app for child sexual abuse (CSA) prevention targeting early childhood users.',
                'Conducted User Acceptance Testing (UAT) by collecting qualitative feedback from teachers and parents for application feasibility analysis.',
                'Co-authored a research paper published in Jurnal Ilmu Pengetahuan dan Teknologi Komputer (JITK) on user experience evaluation of educational applications.',
                'Facilitated community-based Digital Marketing training to help participants develop visual content creation skills.',
                'Registered as inventor/copyright holder under Direktorat Jenderal Kekayaan Intelektual (HKI Indonesia) for the developed application.',
            ],
        },
        {
            id: 'e2',
            role: 'Project Manager & Lead Developer',
            company: 'IT Bootcamp — Universitas Bina Sarana Informatika',
            location: 'Depok, Indonesia',
            startDate: '2024',
            endDate: '2025',
            description:
                'Led a 9-person team in a fullstack web development bootcamp, building "Trash Point" — a web-based education and waste management app.',
            highlights: [
                'Coordinated full project lifecycle: ideation, design, task delegation, and final jury presentation',
                'Achieved 2nd place out of dozens of competing teams at UBSI Jawa Barat',
                'Project registered and awarded HKI Intellectual Property Certificate',
                'Built with Laravel, MySQL, Tailwind CSS, and JavaScript',
            ],
        },

    ],

    certificates: [
        {
            id: 'c1',
            title: 'MTCNA — MikroTik Certified Network Associate',
            issuer: 'MikroTik',
            date: '2024',
            imageUrl: '/sosial/Sutan-Arlie-MTCNA_page-0001.jpg',
        },
        {
            id: 'c2',
            title: 'Cisco Networking Certificate',
            issuer: 'Cisco',
            date: '2024',
            imageUrl: '/sosial/Sertifikat-Cisco_page-0001.jpg',
        },
        {
            id: 'c3',
            title: 'Bootcamp Fullstack Web Development',
            issuer: 'UBSI — Bina Sarana Informatika',
            date: '2025',
            imageUrl: '/sosial/Sertifikat-Bootcamp-Sutan-Arlie_page-0001.jpg',
        },
        {
            id: 'c4',
            title: 'HKI — Intellectual Property Certificate',
            issuer: 'HKI Indonesia',
            date: '2025',
            imageUrl: '/sosial/HKI.jpeg',
        },
        {
            id: 'c5',
            title: 'IT & Web Development Competency',
            issuer: 'IT Training Provider',
            date: '2025',
            imageUrl: '/sosial/Sertifikat 5.jpeg',
        },
        {
            id: 'c6',
            title: 'Technology Seminar & Workshop',
            issuer: 'IT Seminar Provider',
            date: '2025',
            imageUrl: '/sosial/sertifikat 6.jpeg',
        },
    ],

    navigation: [
        { id: 'nav-home', label: 'Home', href: '#home' },
        { id: 'nav-about', label: 'About', href: '#about' },
        { id: 'nav-experience', label: 'Experience', href: '#experience' },
        { id: 'nav-projects', label: 'Projects', href: '#projects' },
        { id: 'nav-skills', label: 'Skills', href: '#skills' },
        { id: 'nav-certificates', label: 'Certificates', href: '#certificates' },
        { id: 'nav-github', label: 'GitHub', href: '#github' },
        { id: 'nav-contact', label: 'Contact', href: '#contact' },
    ],
};

export default portfolioData;
