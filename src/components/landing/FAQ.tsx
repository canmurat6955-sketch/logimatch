'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ({ dict }: { dict: any }) {
    const { title, items } = dict.faq;

    return (
        <section id="faq" className="py-24 bg-slate-900 border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        {title}
                    </h2>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {items.map((item: any, i: number) => (
                        <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 rounded-lg px-4 bg-slate-950/50">
                            <AccordionTrigger className="text-slate-200 hover:text-blue-400 hover:no-underline text-left">
                                {item.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-400">
                                {item.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
