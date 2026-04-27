import { Phone, ArrowUpRight, Leaf } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer
            data-testid="site-footer"
            className="relative bg-[#05130F] border-t border-[#183D2D] overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 pt-20 md:pt-24 pb-10">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-3">
                            <span className="grid place-items-center w-10 h-10 rounded-full bg-[#4AD68B] text-[#05130F]">
                                <Leaf size={20} strokeWidth={2.25} />
                            </span>
                            <span className="font-display text-xl tracking-tight">
                                <span className="text-white">Clear</span>
                                <span className="text-[#4AD68B]">Space</span>
                            </span>
                        </div>
                        <p className="mt-8 max-w-xl text-[#A3B8B0] leading-relaxed">
                            A community-powered waste reporting platform — built to turn
                            everyday observations into cleaner streets, parks and waterways.
                        </p>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                            Get in touch
                        </div>
                        <a
                            href="tel:+94759772144"
                            data-testid="footer-phone-link"
                            className="mt-4 inline-flex items-center gap-3 group"
                        >
                            <span className="w-11 h-11 grid place-items-center border border-[#183D2D] group-hover:border-[#4AD68B] text-[#4AD68B] transition-colors">
                                <Phone size={18} />
                            </span>
                            <span className="font-display text-2xl md:text-3xl tracking-tight text-white group-hover:text-[#4AD68B] transition-colors">
                                +94 75 977 2144
                            </span>
                            <ArrowUpRight
                                size={18}
                                className="text-[#A3B8B0] group-hover:text-[#4AD68B] transition-colors"
                            />
                        </a>
                        <div className="mt-4 text-sm text-[#A3B8B0]">
                            Available Mon – Sat · Community Support Line
                        </div>
                    </div>
                </div>
            </div>

            {/* Giant wordmark */}
            <div
                aria-hidden="true"
                className="px-6 md:px-10 lg:px-14 overflow-hidden select-none"
                data-testid="footer-wordmark"
            >
                <div className="font-display font-medium tracking-[-0.04em] leading-none text-[22vw] lg:text-[18vw] bg-gradient-to-b from-[#1a4a37] to-[#05130F] bg-clip-text text-transparent">
                    CLEARSPACE
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 pb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-[#183D2D] pt-6">
                <div className="text-xs text-[#A3B8B0]">
                    © {year} ClearSpace · Cleaner communities, together.
                </div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                    Built for impact
                </div>
            </div>
        </footer>
    );
}
