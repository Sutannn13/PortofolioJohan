import { useRef, useEffect, useState, type FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, CheckCircle, TriangleAlert } from 'lucide-react';
import SplitText from '@/components/reactbits/SplitText';
import confetti from 'canvas-confetti';
import { LoaderOne } from '@/components/ui/loader';
import {
    PreviewLinkCard,
    PreviewLinkCardTrigger,
    PreviewLinkCardPanel,
    PreviewLinkCardImage,
} from '@/components/animate-ui/components/base/preview-link-card';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogPopup,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/animate-ui/components/base/alert-dialog';
import type { PersonalInfo } from '@/types';
import { supabase } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
    personal: PersonalInfo;
}

const Contact: React.FC<ContactProps> = ({ personal }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const pendingFormRef = useRef<HTMLFormElement | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personal.email)}`;
    const homeMapsUrl = 'https://maps.app.goo.gl/YaaHGQCsyFTfoDgX7';
    const homeAddress = 'Jl. Kav. Polri 2 No.14B, Cilangkap, Kec. Tapos, Kota Depok, Jawa Barat 16458';

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                infoRef.current,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                formRef.current,
                { opacity: 0, x: 30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        once: true,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const launchSuccessConfetti = () => {
        confetti({
            particleCount: 90,
            startVelocity: 32,
            spread: 70,
            origin: { x: 0.5, y: 0.65 },
        });
    };

    const sendMessage = async (form: HTMLFormElement) => {
        const formData = new FormData(form);
        const name = String(formData.get('name') ?? '').trim();
        const email = String(formData.get('email') ?? '').trim();
        const message = String(formData.get('message') ?? '').trim();

        if (!name || !email || !message) {
            alert('Mohon lengkapi nama, email, dan pesan terlebih dahulu.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch("https://formsubmit.co/ajax/sutanarliejohan@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                    _subject: `New Portfolio Contact from ${name}`
                })
            });

            if (response.ok) {
                setSubmitted(true);
                
                const generatedUsername = `@${name.toLowerCase().replace(/\s+/g, '')}`;
                const generatedImg = `https://avatar.vercel.sh/${encodeURIComponent(name)}`;
                
                await supabase.from('contact_messages').insert([{
                    name: name,
                    username: generatedUsername,
                    body: message,
                    img: generatedImg
                }]);

                form.reset();
                launchSuccessConfetti();
                setTimeout(() => setSubmitted(false), 3000);
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            console.error(error);
            alert("Maaf, terjadi kesalahan saat mengirim pesan. Coba lagi nanti.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading || submitted) {
            return;
        }
        pendingFormRef.current = e.currentTarget;
        setConfirmOpen(true);
    };

    const handleConfirmSend = async () => {
        const form = pendingFormRef.current;
        if (!form || isLoading || submitted) {
            return;
        }
        await sendMessage(form);
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative z-10 py-12 sm:py-section px-4 sm:px-6"
        >
            <div className="mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="mb-12 sm:mb-16 text-center">
                    <span className="section-label mb-3 sm:mb-4 block">Get In Touch</span>
                    <SplitText
                        text="Let's Work Together"
                        className="font-display text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl"
                        tag="h2"
                        delay={30}
                        duration={0.8}
                        splitType="words"
                        from={{ opacity: 0, y: 30 }}
                        to={{ opacity: 1, y: 0 }}
                    />
                </div>

                <div className="grid items-start gap-12 md:grid-cols-2">
                    {/* Info */}
                    <div ref={infoRef} className="opacity-0">
                        <p className="mb-8 text-base leading-relaxed text-text-secondary">
                            I'm always open to discussing new projects, creative ideas, or
                            opportunities to be part of something amazing. Feel free to reach
                            out!
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-bg-card">
                                    <Mail size={16} className="text-accent" />
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted">Email</p>
                                    <PreviewLinkCard href={gmailComposeUrl} followCursor="x">
                                        <PreviewLinkCardTrigger
                                            target="_blank"
                                            className="text-sm text-text-primary underline decoration-dotted underline-offset-4 transition-colors hover:text-accent"
                                        >
                                            {personal.email}
                                        </PreviewLinkCardTrigger>
                                        <PreviewLinkCardPanel
                                            side="right"
                                            sideOffset={14}
                                            align="start"
                                            target="_blank"
                                        >
                                            <PreviewLinkCardImage alt="Preview Gmail compose ke Sutan Arlie Johan" />
                                        </PreviewLinkCardPanel>
                                    </PreviewLinkCard>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-bg-card">
                                    <MapPin size={16} className="text-accent" />
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted">Location</p>
                                    <PreviewLinkCard href={homeMapsUrl} followCursor="x">
                                        <PreviewLinkCardTrigger
                                            target="_blank"
                                            className="line-clamp-3 max-w-[24rem] text-sm leading-relaxed text-text-primary underline decoration-dotted underline-offset-4 transition-colors hover:text-accent"
                                        >
                                            {homeAddress}
                                        </PreviewLinkCardTrigger>
                                        <PreviewLinkCardPanel
                                            side="right"
                                            sideOffset={14}
                                            align="start"
                                            target="_blank"
                                        >
                                            <PreviewLinkCardImage alt="Preview lokasi rumah Sutan Arlie Johan" />
                                        </PreviewLinkCardPanel>
                                    </PreviewLinkCard>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div ref={formRef} className="opacity-0">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4 rounded-2xl border border-border bg-bg-card p-6 sm:p-8"
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="contact-name"
                                        className="mb-1.5 block text-xs font-medium text-text-muted"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        required
                                        className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="contact-email"
                                        className="mb-1.5 block text-xs font-medium text-text-muted"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="mb-1.5 block text-xs font-medium text-text-muted"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full resize-none rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                                <AlertDialogTrigger
                                    render={
                                        <button
                                            type="submit"
                                            id="contact-submit"
                                            disabled={submitted || isLoading}
                                            className="group mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 disabled:opacity-50"
                                        >
                                            {isLoading ? (
                                                <LoaderOne className="text-white" />
                                            ) : submitted ? (
                                                <>
                                                    <CheckCircle size={16} />
                                                    Message Sent!
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send
                                                        size={14}
                                                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                                                    />
                                                </>
                                            )}
                                        </button>
                                    }
                                />

                                <AlertDialogPopup from="bottom" className="sm:max-w-[460px] border-cyan-200/20">
                                    <AlertDialogHeader>
                                        <div className="mb-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-200">
                                            <TriangleAlert size={18} />
                                        </div>
                                        <AlertDialogTitle>
                                            Konfirmasi Pengiriman Pesan
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Pesan yang anda akan kirim ini akan masuk ke Gmail Sutan Arlie Johan (sutanarliejohan@gmail.com). Pastikan data yang diisi sudah benar sebelum melanjutkan.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel disabled={isLoading}>
                                            Batal
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleConfirmSend}
                                            disabled={isLoading || submitted}
                                        >
                                            {isLoading ? 'Mengirim...' : 'Ya, Kirim Pesan'}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogPopup>
                            </AlertDialog>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
