import { getDictionary } from "@/lib/dictionary";
import Hero from "@/components/landing/Hero";
import ProblemSolution from "@/components/landing/ProblemSolution";
import Pricing from "@/components/landing/Pricing";
import FounderStory from "@/components/landing/FounderStory";

export default async function LandingPage({ params: { lang } }: { params: { lang: string } }) {
    const dict = await getDictionary(lang as any);

    return (
        <div className="flex flex-col min-h-screen">
            <Hero dict={dict} lang={lang} />
            <ProblemSolution lang={lang} />
            <Pricing lang={lang} />
            <FounderStory lang={lang} />
        </div>
    );
}
