import { ArrowRight, MapPin } from "lucide-react";

export default function Hero() {
    const scroll = (id) => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section
            id="top"
            data-testid="hero-section"
            className="relative topo-bg overflow-hidden"
        >
            <div className="absolute inset-0 grid-lines opacity-[0.25] pointer-events-none" />

            <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 pt-14 md:pt-20 pb-20 md:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
                {/* Left: editorial copy */}
                <div className="lg:col-span-7 reveal">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#183D2D] rounded-full text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4AD68B] pulse-dot" />
                        Community-Powered Waste Reporting
                    </div>

                    <h1
                        data-testid="hero-title"
                        className="font-display mt-8 text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter font-medium"
                    >
                        Cleaner communities
                        <br />
                        start with{" "}
                        <span className="italic text-[#4AD68B]">awareness</span>.
                    </h1>

                    <p className="mt-8 max-w-xl text-[#A3B8B0] text-base md:text-lg leading-relaxed">
                        Spot a pile of waste? Pin it, describe it, submit it. Every report
                        becomes a data point that helps authorities and volunteers reclaim
                        public spaces — one hotspot at a time.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <button
                            data-testid="hero-report-cta"
                            onClick={() => scroll("#report")}
                            className="btn-shine group inline-flex items-center gap-3 bg-[#4AD68B] hover:bg-[#6EE0A4] text-[#05130F] font-medium px-7 py-4 rounded-sm text-sm uppercase tracking-[0.16em] transition-colors"
                        >
                            <MapPin size={16} />
                            Report a Waste Spot
                            <ArrowRight
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </button>
                        <button
                            data-testid="hero-learn-cta"
                            onClick={() => scroll("#about")}
                            className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.16em] text-white/90 hover:text-white border-b border-[#183D2D] hover:border-[#4AD68B] pb-1 transition-colors"
                        >
                            Learn how it works
                        </button>
                    </div>

                    <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg text-left">
                        {[
                            { n: "01", t: "Pin" },
                            { n: "02", t: "Describe" },
                            { n: "03", t: "Submit" },
                        ].map((s) => (
                            <div
                                key={s.n}
                                className="border-t border-[#183D2D] pt-4"
                                data-testid={`hero-step-${s.n}`}
                            >
                                <div className="text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                                    {s.n}
                                </div>
                                <div className="font-display text-xl mt-1">{s.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: tangible photo + offset block */}
                <div className="lg:col-span-5 reveal">
                    <div className="hero-image-frame">
                        <img
                            src="https://images.pexels.com/photos/109391/pexels-photo-109391.jpeg?auto=compress&cs=tinysrgb&w=1200"
                            alt="Forest pathway"
                            className="w-full h-[420px] md:h-[520px] object-cover"
                        />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-[#05130F]/80 backdrop-blur-md border border-[#183D2D] px-4 py-3">
                            <div>
                                <div className="text-[10px] uppercase tracking-[0.22em] text-[#4AD68B]">
                                    Live Reports
                                </div>
                                <div className="font-display text-lg">This week</div>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#A3B8B0]">
                                <span className="w-2 h-2 rounded-full bg-[#4AD68B] pulse-dot" />
                                Updating
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-divider max-w-[1400px] mx-auto" />
        </section>
    );
}
