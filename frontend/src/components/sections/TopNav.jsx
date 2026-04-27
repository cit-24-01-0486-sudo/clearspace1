import { useEffect, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";

const links = [
    { href: "#about", label: "About" },
    { href: "#features", label: "Features" },
    { href: "#how", label: "How It Works" },
    { href: "#report", label: "Report" },
];

export default function TopNav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setOpen(false);
    };

    return (
        <header
            data-testid="top-nav"
            className={`sticky top-0 z-40 transition-all duration-300 ${
                scrolled
                    ? "backdrop-blur-2xl bg-[#05130F]/75 border-b border-[#183D2D]"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 h-20 flex items-center justify-between">
                <a
                    href="#top"
                    data-testid="brand-link"
                    className="flex items-center gap-3 group"
                >
                    <span className="grid place-items-center w-10 h-10 rounded-full bg-[#4AD68B] text-[#05130F]">
                        <Leaf size={20} strokeWidth={2.25} />
                    </span>
                    <span className="font-display text-xl tracking-tight">
                        <span className="text-white">Clear</span>
                        <span className="text-[#4AD68B]">Space</span>
                    </span>
                </a>

                <nav className="hidden md:flex items-center gap-10">
                    {links.map((l) => (
                        <button
                            key={l.href}
                            data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                            onClick={() => scrollTo(l.href)}
                            className="text-sm uppercase tracking-[0.18em] text-[#A3B8B0] hover:text-white transition-colors"
                        >
                            {l.label}
                        </button>
                    ))}
                </nav>

                <div className="hidden md:block">
                    <button
                        data-testid="nav-report-cta"
                        onClick={() => scrollTo("#report")}
                        className="btn-shine inline-flex items-center gap-2 bg-[#4AD68B] hover:bg-[#6EE0A4] text-[#05130F] font-medium px-5 py-2.5 rounded-sm text-sm transition-colors"
                    >
                        Report Waste
                        <span className="w-1.5 h-1.5 rounded-full bg-[#05130F] pulse-dot" />
                    </button>
                </div>

                <button
                    data-testid="mobile-menu-toggle"
                    onClick={() => setOpen((v) => !v)}
                    className="md:hidden p-2 text-white"
                    aria-label="Toggle menu"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {open && (
                <div className="md:hidden border-t border-[#183D2D] bg-[#05130F]/95 backdrop-blur-xl">
                    <div className="px-6 py-6 flex flex-col gap-4">
                        {links.map((l) => (
                            <button
                                key={l.href}
                                data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={() => scrollTo(l.href)}
                                className="text-left text-sm uppercase tracking-[0.18em] text-[#A3B8B0] hover:text-white"
                            >
                                {l.label}
                            </button>
                        ))}
                        <button
                            data-testid="mobile-nav-report-cta"
                            onClick={() => scrollTo("#report")}
                            className="mt-2 inline-flex items-center justify-center bg-[#4AD68B] text-[#05130F] font-medium px-5 py-3 rounded-sm text-sm"
                        >
                            Report Waste
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
