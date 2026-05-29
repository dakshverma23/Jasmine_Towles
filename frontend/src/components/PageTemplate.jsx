import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useVenetianReveal } from "../hooks/useVenetianReveal";
import ParallaxImage from "./venetian/ParallaxImage";
import SplitHeading from "./venetian/SplitHeading";

export default function PageTemplate({ content }) {
  const { badge, title, subtitle, blocks, stats, contactInfo, heroImage } = content;
  const rootRef = useVenetianReveal();

  const titleLines = typeof title === "string"
    ? title
        .split(" ")
        .reduce((acc, word, i) => {
          if (i === 0) return [[word]];
          const last = acc[acc.length - 1];
          if (last.join(" ").length < 12) last.push(word);
          else acc.push([word]);
          return acc;
        }, [])
        .map((g) => g.join(" "))
    : title;

  return (
    <div ref={rootRef} className="pt-32 md:pt-36">
      <section className="ven-container pb-12 md:pb-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="ven-reveal ven-eyebrow mb-6">{badge}</p>
            <div className="ven-reveal">
              <SplitHeading lines={Array.isArray(title) ? title : titleLines} className="ven-heading-xl max-w-5xl" />
            </div>
            {subtitle && <p className="ven-reveal ven-body mt-7">{subtitle}</p>}
          </div>
          {stats && (
            <div className="ven-reveal grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((s) => (
                <div key={s.label} className="neo-panel p-5">
                  <p className="font-display text-4xl font-semibold text-ven-ink">{s.value}</p>
                  <p className="mt-1 ven-eyebrow">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {heroImage && (
        <div className="ven-container ven-reveal mb-16">
          <ParallaxImage src={heroImage} alt={badge} aspect="aspect-[21/10] md:aspect-[21/8]" className="w-full" />
        </div>
      )}

      <section className="border-t border-ven-line py-16 md:py-24">
        <div className="ven-container grid gap-4 md:grid-cols-2">
          {blocks?.map((block, i) => (
            <article key={block.title} className="ven-reveal neo-panel p-7 md:p-8">
              <p className="ven-eyebrow mb-5">0{i + 1}</p>
              <h3 className="font-display text-3xl font-semibold leading-tight text-ven-ink md:text-4xl">{block.title}</h3>
              <p className="mt-4 leading-relaxed text-ven-muted">{block.body}</p>
              {i === 0 && (
                <Link to="/products" className="ven-btn-outline mt-8 inline-flex">
                  View Products <ArrowRight size={16} />
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      {contactInfo && (
        <section className="border-t border-ven-line bg-[#101314] py-16 text-white md:py-24">
          <div className="ven-container grid gap-4 md:grid-cols-3">
            <div className="ven-reveal rounded-[8px] border border-white/10 bg-white/[0.06] p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#00d1c7]">Email</p>
              <p className="text-lg">{contactInfo.email}</p>
            </div>
            <div className="ven-reveal rounded-[8px] border border-white/10 bg-white/[0.06] p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#b7e85f]">Phone</p>
              <p className="text-lg">{contactInfo.phone}</p>
            </div>
            <div className="ven-reveal rounded-[8px] border border-white/10 bg-white/[0.06] p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#ff6f61]">Address</p>
              <p className="text-lg">{contactInfo.address}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
