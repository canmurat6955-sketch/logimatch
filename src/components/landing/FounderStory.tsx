'use client';

export default function FounderStory({ lang, dict }: { lang: string, dict: any }) {
    const { badge, title, titleHighlight, p1, p2, quote, p3, p3Highlight, p3End, p4 } = dict.founderStory;

    return (
        <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <span className="text-blue-500 font-semibold tracking-wider text-sm uppercase">{badge}</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 tracking-tight">
                        {title} <span className="text-blue-500">{titleHighlight}</span>
                    </h2>
                </div>

                <div className="prose prose-lg prose-invert mx-auto text-slate-300 leading-relaxed">
                    <p>{p1}</p>
                    <p>{p2}</p>
                    <div className="my-8 pl-6 border-l-4 border-blue-500 italic text-white text-xl">
                        {quote}
                    </div>
                    <p>
                        {p3} <span className="text-white font-bold">{p3Highlight}</span> {p3End}
                    </p>
                    <p>{p4}</p>
                </div>
            </div>
        </section>
    );
}
