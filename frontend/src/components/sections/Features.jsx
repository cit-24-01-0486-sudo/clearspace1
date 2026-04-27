import { MapPin, Recycle, Users, LineChart } from "lucide-react";

const features = [
    {
        k: "hotspot",
        icon: MapPin,
        title: "Waste Hotspot Reporting",
        desc: "Pin problem areas in seconds. Every geo-tagged report feeds a map of hotspots that need urgent attention.",
        span: "lg:col-span-5 lg:row-span-2",
        image:
            "https://images.pexels.com/photos/12730915/pexels-photo-12730915.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
    {
        k: "reduction",
        icon: Recycle,
        title: "Reduction Awareness",
        desc: "Simple, practical tips that turn daily habits into long-term environmental impact.",
        span: "lg:col-span-7",
    },
    {
        k: "community",
        icon: Users,
        title: "Community Participation",
        desc: "Share reports, rally neighbors and join local cleanup initiatives.",
        span: "lg:col-span-4",
        image:
            "https://images.pexels.com/photos/6995380/pexels-photo-6995380.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
    {
        k: "monitoring",
        icon: LineChart,
        title: "Waste Monitoring",
        desc: "Track recurrence over time so authorities can fix the root cause — not just the symptom.",
        span: "lg:col-span-3",
    },
];

export default function Features() {
    return (
        <section
            id="features"
            data-testid="features-section"
            className="relative bg-[#0B251B]/30 border-y border-[#183D2D]"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-32">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 reveal">
                    <div>
                        <div className="text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                            Key Features
                        </div>
                        <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-medium leading-[1.02] max-w-3xl">
                            Everything you need to{" "}
                            <span className="italic text-[#4AD68B]">make a difference</span>.
                        </h2>
                    </div>
                    <p className="text-[#A3B8B0] max-w-md">
                        Tools built around how communities actually solve waste problems —
                        from report to resolution.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 lg:grid-rows-2 gap-5">
                    {features.map((f) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={f.k}
                                data-testid={`feature-${f.k}`}
                                className={`feature-card p-8 md:p-10 flex flex-col justify-between reveal ${f.span}`}
                            >
                                <div>
                                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-sm bg-[#05130F] border border-[#183D2D] text-[#4AD68B]">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="font-display mt-7 text-2xl md:text-3xl tracking-tight leading-[1.1]">
                                        {f.title}
                                    </h3>
                                    <p className="mt-4 text-[#A3B8B0] leading-relaxed max-w-prose">
                                        {f.desc}
                                    </p>
                                </div>
                                {f.image && (
                                    <div className="mt-8 overflow-hidden border border-[#183D2D]">
                                        <img
                                            src={f.image}
                                            alt={f.title}
                                            className="w-full h-52 md:h-64 object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
