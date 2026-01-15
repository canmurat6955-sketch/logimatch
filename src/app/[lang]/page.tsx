import { getDictionary } from "@/lib/dictionary";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Features from "@/components/landing/Features";
import ProblemSolution from "@/components/landing/ProblemSolution";
// import Pricing from "@/components/landing/Pricing"; // Removed for redesign
import FounderStory from "@/components/landing/FounderStory";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default async function LandingPage({ params }: { params: Promise<{ lang: any }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <Hero dict={dict} lang={lang} />
            <Services dict={dict} lang={lang} />
            <Features dict={dict} lang={lang} />
            {/* Kept ProblemSolution as a secondary info block possibly? Or remove if too cluttered. Let's keep for now but Services is prioritized. */}
            <ProblemSolution dict={dict} lang={lang} />
            <FounderStory dict={dict} lang={lang} />
            <FAQ dict={dict} />
            <Footer dict={dict} lang={lang} />
        </div>
    );
}
