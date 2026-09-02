import { useState } from 'react';
import { type JournalArticle } from '../data/vastuData';
import { BookOpen, Clock, ArrowRight, X, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsProvider';

export function JournalSection() {
  const { articles, copy } = useCms();
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <section id="journal" className="py-20 bg-[#FAF7F2] border-b border-vastu-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-vastu-terracotta text-xs font-sans font-semibold tracking-widest uppercase mb-2">
            <BookOpen className="w-3.5 h-3.5 text-vastu-gold" />
            <span>{copy('journal.eyebrow', 'ज्ञान पत्रिका • Sacred Vastu Wisdom & Insights')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-vastu-forest font-normal tracking-tight">
            {copy('journal.title', 'Thoughts on Space, Sound & Living')}
          </h2>
          <p className="mt-3 text-vastu-muted text-sm sm:text-base font-sans leading-relaxed">
            {copy('journal.subtitle', 'Essays on directional harmony, atmospheric cleansing, sacred geometry, and everyday rituals that transform the subtle energy of your sanctuary.')}
          </p>
        </div>

        {/* Journal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-sm border border-vastu-border hover:border-vastu-forest/40 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-vastu-cream relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#183125]/85 backdrop-blur-sm text-vastu-goldLight text-[10px] font-sans font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-sm border border-vastu-gold/30">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-vastu-muted font-sans">
                    <span>{article.date}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-vastu-forest group-hover:text-vastu-terracotta transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-vastu-muted font-sans line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-vastu-forest group-hover:text-vastu-terracotta uppercase tracking-wider transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-vastu-forestDark/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-sm border border-vastu-border max-w-3xl w-full shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-vastu-forest transition-colors shadow-sm"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
              <div className="aspect-[21/9] rounded overflow-hidden border border-vastu-border">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-vastu-terracotta font-sans font-semibold uppercase tracking-wider">
                  <span>{selectedArticle.category}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-vastu-forest font-medium leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>

              {/* Quote Highlight */}
              {selectedArticle.quote && (
                <blockquote className="border-l-3 border-vastu-gold pl-4 py-2 my-4 font-serif italic text-lg sm:text-xl text-vastu-forest bg-vastu-cream/40 rounded-r">
                  “{selectedArticle.quote}”
                </blockquote>
              )}

              {/* Content Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-vastu-charcoal font-sans leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-vastu-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-vastu-muted font-sans">
                  <Sparkles className="w-4 h-4 text-vastu-gold" />
                  <span>Zen Vastu Sacred Journal</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-vastu-forest text-white px-4 py-2 rounded-sm text-xs font-sans font-semibold uppercase tracking-wider"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
