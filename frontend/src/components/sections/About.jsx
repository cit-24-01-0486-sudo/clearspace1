import { CheckCircle2 } from "lucide-react";

const bullets = [
    "Identify waste hotspots in your neighborhood",
    "Alert authorities and local community leaders",
    "Encourage responsible disposal & recycling",
    "Track resolution progress over time",
];

export default function About() {
    return (
        <section
            id="about"
            data-testid="about-section"
            className="relative bg-[#05130F]"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-32 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-5 reveal order-2 lg:order-1">
                    <div className="hero-image-frame">
                        <img
                            src="https://images.pexels.com/photos/5029811/pexels-photo-5029811.jpeg?auto=compress&cs=tinysrgb&w=1000"
                            alt="Community volunteers cleaning up"
                            className="w-full h-[420px] md:h-[520px] object-cover"
                        />
                    </div>
                </div>

                <div className="lg:col-span-7 reveal order-1 lg:order-2">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                        About the platform
                    </div>
                    <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-medium leading-[1.02]">
                        Empowering citizens to{" "}
                        <span className="italic text-[#4AD68B]">take action</span>.
                    </h2>
                    <p className="mt-7 text-[#A3B8B0] text-base md:text-lg leading-relaxed max-w-2xl">
                        Waste pollution degrades our neighborhoods, waterways and public
                        health. ClearSpace turns everyday observations into actionable
                        intelligence — so small actions compound into cleaner cities.
                    </p>

                    <ul className="mt-10 grid sm:grid-cols-2 gap-5">
                        {bullets.map((b, i) => (
                            <li
                                key={i}
                                data-testid={`about-bullet-${i}`}
                                className="flex items-start gap-3 text-white/90"
                            >
                                <CheckCircle2
                                    size={20}
                                    className="mt-0.5 shrink-0 text-[#4AD68B]"
                                />
                                <span className="text-[15px] leading-relaxed">{b}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12 inline-flex items-baseline gap-4 border-t border-[#183D2D] pt-6">
                        <div className="font-display text-5xl text-white">94%</div>
                        <div className="text-[12px] uppercase tracking-[0.22em] text-[#A3B8B0]">
                            reported areas
                            <br />
                            addressed
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
