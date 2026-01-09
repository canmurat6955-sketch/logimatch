'use client';

export default function FounderStory({ lang }: { lang: string }) {
    return (
        <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <span className="text-blue-500 font-semibold tracking-wider text-sm uppercase">Founder Story</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 tracking-tight">
                        "Bu fikir masada değil, <span className="text-blue-500">yolda doğdu.</span>"
                    </h2>
                </div>

                <div className="prose prose-lg prose-invert mx-auto text-slate-300 leading-relaxed">
                    <p>
                        12 yaşındayken kamyonlara olan ilgim, zamanla bir mesleki tutkuya dönüştü.
                        Eğitim hayatımda otomotiv ve maliye alanlarında ilerledim.
                        Bu sayede lojistiğe sadece araç tarafıyla değil, finansal yapı ve maliyet yönetimi perspektifiyle de bakmaya başladım.
                    </p>
                    <p>
                        Yıllar boyunca ağır vasıta satış sorumlusu olarak çalıştım. Çekici sahipleri, filo yöneticileri ve lojistik firmalarıyla doğrudan temas ettim.
                    </p>
                    <div className="my-8 pl-6 border-l-4 border-blue-500 italic text-white text-xl">
                        "Lojistik sektöründe herkes çok çalışıyor ama çok az kişi gerçekten ne kazandığını biliyor."
                    </div>
                    <p>
                        Piyasada yük bulmaya yarayan sistemler var. Piyasada muhasebe programları var.
                        Ama <span className="text-white font-bold">yük + rota + maliyet + kârlılığı</span> tek ekranda yöneten bir sistem yok.
                    </p>
                    <p>
                        İşte bu boşluk, Logimatch'in doğuş nedeni oldu. Amacımız sadece yük bulmak değil, lojistik sektörünün finansal işletim sistemi olmak.
                    </p>
                </div>
            </div>
        </section>
    );
}
