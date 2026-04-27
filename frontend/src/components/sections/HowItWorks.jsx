import { MapPin, FileText, Send } from "lucide-react";

const steps = [
    {
        k: "pin",
        n: "01",
        icon: MapPin,
        title: "Pin the location",
        desc: "Type the address or tap Use my current location to auto-detect GPS.",
    },
    {
        k: "describe",
        n: "02",
        icon: FileText,
        title: "Describe the issue",
        desc: "Pick the waste type, add a short description and an optional photo.",
    },
    {
        k: "submit",
        n: "03",
        icon: Send,
        title: "Submit your report",
        desc: "Your report is logged and routed to the right community contacts.",
    },
];

export default function HowItWorks() {
    return (
        <section
            id="how"
            data-testid="how-section"
            className="relative bg-[#05130F]"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-32">
                <div className="reveal">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                        Take Action
                    </div>
                    <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-medium leading-[1.02] max-w-4xl">
                        See waste? <span className="italic text-[#4AD68B]">Report it.</span>
                    </h2>
                </div>

                <div className="mt-16 grid md:grid-cols-3 gap-6">
                    {steps.map((s) => {
                        const Icon = s.icon;
                        return (
                            <div
                                key={s.k}
                                data-testid={`step-${s.k}`}
                                className="feature-card p-8 md:p-10 reveal"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="font-display text-5xl text-[#4AD68B]/80">
                                        {s.n}
                                    </div>
                                    <div className="w-10 h-10 grid place-items-center border border-[#183D2D] text-white">
                                        <Icon size={18} />
                                    </div>
                                </div>
                                <h3 className="font-display text-2xl mt-8">{s.title}</h3>
                                <p className="mt-3 text-[#A3B8B0] leading-relaxed">
                                    {s.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
