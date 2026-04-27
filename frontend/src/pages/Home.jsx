import { useEffect } from "react";
import TopNav from "@/components/sections/TopNav";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import ReportForm from "@/components/sections/ReportForm";
import Footer from "@/components/sections/Footer";

export default function Home() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 },
        );
        document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div
            data-testid="home-page"
            className="min-h-screen bg-[#05130F] text-white selection:bg-[#4AD68B] selection:text-[#05130F]"
        >
            <TopNav />
            <main>
                <Hero />
                <Stats />
                <About />
                <Features />
                <HowItWorks />
                <ReportForm />
            </main>
            <Footer />
        </div>
    );
}
