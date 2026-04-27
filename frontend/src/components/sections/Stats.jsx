import { useEffect, useState } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function formatNum(n) {
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    return `${n}`;
}

export default function Stats() {
    const [stats, setStats] = useState({
        reports_filed: 512,
        areas_cleaned: 128,
        community_members: 3240,
        resolution_rate: 94,
    });

    useEffect(() => {
        axios
            .get(`${API}/reports/stats`)
            .then((r) => setStats(r.data))
            .catch(() => {});
    }, []);

    const items = [
        { k: "reports", label: "Reports Filed", value: `${formatNum(stats.reports_filed)}+` },
        { k: "areas", label: "Areas Cleaned", value: `${formatNum(stats.areas_cleaned)}+` },
        {
            k: "members",
            label: "Community Members",
            value: `${formatNum(stats.community_members)}+`,
        },
        { k: "rate", label: "Resolution Rate", value: `${stats.resolution_rate}%` },
    ];

    return (
        <section
            data-testid="stats-section"
            className="relative bg-[#05130F] border-y border-[#183D2D]"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-14 md:py-20 grid grid-cols-2 lg:grid-cols-4 gap-10">
                {items.map((it) => (
                    <div
                        key={it.k}
                        data-testid={`stat-${it.k}`}
                        className="reveal"
                    >
                        <div
                            className="font-display stat-value text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white"
                        >
                            {it.value}
                        </div>
                        <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                            {it.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
