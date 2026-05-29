import { ArrowRight, Gauge, Globe2, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Scene3D from "../components/Scene3D";
import ParallaxImage from "../components/venetian/ParallaxImage";
import SplitHeading from "../components/venetian/SplitHeading";
import { useHeroEntrance, useVenetianReveal } from "../hooks/useVenetianReveal";

const services = [
  {
    title: ["BATH", "TEXTILES"],
    sub: "Blankets and thermal towels",
    img: "https://images.unsplash.com/photo-1616627457505-60e9b4ecc7a3?auto=format&fit=crop&w=900&q=80",
    to: "/products"
  },
  {
    title: ["KITCHEN", "LINEN"],
    sub: "Pot holders and kitchen range",
    img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
    to: "/products"
  },
  {
    title: ["SALON", "TOWELS"],
    sub: "Professional salon lines",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
    to: "/products"
  },
  {
    title: ["EXPORT", "SERIES"],
    sub: "P / R / Y collections",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    to: "/products"
  }
];

const proof = [
  { icon: Gauge, label: "Integrated flow", value: "Cotton to dispatch" },
  { icon: ShieldCheck, label: "Certified ops", value: "ISO aligned" },
  { icon: Globe2, label: "Buyer reach", value: "Global export" },
  { icon: PackageCheck, label: "Order mode", value: "Bulk and custom" }
];

const reviews = [
  { name: "Global Buyer - USA", text: "Consistent quality across bulk duvet and kitchen linen orders with clear export documentation." },
  { name: "Hospitality Partner", text: "Custom colors and quantities were handled cleanly, and the finish held up through repeated commercial laundering." },
  { name: "Domestic Client", text: "From sampling to full production, Jasmine Towels delivered exactly what we specified." },
  { name: "Industrial Buyer", text: "Safety wear lines met our compliance requirements with transparent pricing before production." }
];

export default function HomePage() {
  const rootRef = useVenetianReveal();
  const heroRef = useRef(null);
  useHeroEntrance(heroRef);

  return (
    <div ref={rootRef}>
      <section ref={heroRef} className="relative overflow-hidden pt-32 md:pt-36">
        <Scene3D variant="home" className="left-auto right-0 top-10 h-[58vh] w-full opacity-70 md:h-[84vh] md:w-[72vw]" />
        <div className="ven-container grid min-h-[calc(100vh-6rem)] items-center gap-10 pb-10 lg:grid-cols-[1.06fr_0.94fr] lg:pb-12">
          <div className="relative z-10 pb-6">
            <p className="hero-fade ven-eyebrow mb-6">India's premier textile manufacturer</p>
            <h1 className="ven-heading-xl max-w-5xl">
              <span className="block overflow-hidden">
                <span className="hero-line inline-block">PRECISION</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line inline-block">TEXTILES FOR</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line inline-block italic text-[#00a6a6]">NEXT-GEN</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line inline-block">FULFILLMENT</span>
              </span>
            </h1>
            <p className="hero-fade mt-7 max-w-2xl text-lg leading-relaxed text-ven-muted">
              Jasmine Towels blends export-grade craftsmanship with a sharper digital storefront,
              ready for bulk orders, custom colors, and high-confidence sourcing.
            </p>
            <div className="hero-fade mt-9 flex flex-wrap gap-3">
              <Link to="/products" className="ven-btn">
                Explore Products <ArrowRight size={16} />
              </Link>
              <Link to="/quality" className="ven-btn-outline">
                View Quality
              </Link>
            </div>
          </div>

          <div className="hero-fade relative">
            <div className="neo-panel p-3">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1500&q=80"
                alt="Premium textile manufacturing"
                aspect="aspect-[4/5] md:aspect-[5/6]"
                className="w-full"
              />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 grid grid-cols-2 gap-2 md:left-8 md:right-8">
              <div className="rounded-[8px] border border-white/60 bg-white/86 p-4 shadow-[0_16px_50px_rgba(16,19,20,0.16)] backdrop-blur">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ven-muted">Factories</p>
                <p className="mt-1 font-display text-3xl font-semibold">02</p>
              </div>
              <div className="rounded-[8px] border border-white/60 bg-[#101314]/92 p-4 text-white shadow-[0_16px_50px_rgba(16,19,20,0.2)] backdrop-blur">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/54">Mode</p>
                <p className="mt-1 font-display text-3xl font-semibold">B2B</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ven-container py-14">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proof.map(({ icon: Icon, label, value }) => (
            <div key={label} className="ven-reveal neo-panel flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 place-items-center rounded-[8px] bg-[#00a6a6]/12 text-[#00a6a6]">
                <Icon size={20} />
              </span>
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ven-muted">{label}</span>
                <span className="mt-1 block font-display text-xl font-semibold">{value}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-ven-line py-20 md:py-28">
        <div className="ven-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="ven-reveal">
            <SplitHeading lines={["QUALITY IS", "A LIVE SYSTEM."]} className="ven-heading-lg" />
          </div>
          <div className="ven-reveal">
            <p className="ven-body">
              Every product moves through a controlled production path: spinning, weaving, wet processing,
              finishing, packing, and dispatch. The result is textile supply that feels calm, measurable, and ready for scale.
            </p>
            <Link to="/about" className="ven-btn-outline mt-9 inline-flex">
              Discover More <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-ven-line bg-[#101314] py-20 text-white md:py-28">
        <div className="ven-container">
          <div className="ven-reveal mb-4">
            <SplitHeading
              lines={["TEXTILE LINES,", "ENGINEERED", "FOR ORDER FLOW"]}
              className="ven-heading-lg max-w-4xl !text-white"
            />
          </div>
          <p className="ven-reveal mt-6 max-w-xl text-sm font-semibold uppercase tracking-[0.14em] text-white/54">
            From cotton to finished export goods.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, index) => (
              <Link key={s.title.join("")} to={s.to} className="group ven-reveal ven-service-tile !border-white/10 !bg-white/[0.06]">
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <img src={s.img} alt="" className="h-full w-full object-cover opacity-40" />
                </div>
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/44">0{index + 1}</span>
                  <Sparkles size={16} className="text-[#b7e85f]" />
                </div>
                <div className="relative z-10">
                  <h3 className="!text-white">
                    {s.title[0]}
                    <br />
                    {s.title[1]}
                  </h3>
                  <p className="!text-white/54">{s.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ven-line py-20 md:py-28">
        <div className="ven-container grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1000&q=80"
            alt="Textile production facility"
            className="ven-reveal w-full"
          />
          <div className="ven-reveal">
            <SplitHeading lines={["EVERY DETAIL,", "A SIGNAL."]} className="ven-heading-lg" />
            <p className="ven-body mt-7">
              Facilities in Madurai and Sivagangai connect production teams, lab checkpoints, and finishing lines
              into one responsive operation for buyers who need clarity before the shipment leaves the floor.
            </p>
            <Link to="/facilities" className="ven-btn mt-9 inline-flex">
              View Facilities <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-ven-line py-20 md:py-28">
        <div className="ven-container">
          <div className="ven-reveal text-center">
            <SplitHeading lines={["TRUSTED BY", "GLOBAL BUYERS"]} className="ven-heading-lg mx-auto" />
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <blockquote key={r.name} className="ven-reveal neo-panel p-7 md:p-8">
                <p className="font-display text-xl font-semibold leading-relaxed text-ven-ink md:text-2xl">
                  "{r.text}"
                </p>
                <footer className="mt-6 ven-eyebrow !normal-case">{r.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ven-line bg-ven-sand py-20 md:py-28">
        <div className="ven-container grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="ven-reveal">
            <SplitHeading lines={["READY TO", "BUILD AN ORDER?"]} className="ven-heading-lg" />
            <p className="ven-body mt-6">
              Plan a bulk order, export partnership, or product customization with the same storefront and backend flow already in place.
            </p>
          </div>
          <div className="ven-reveal flex flex-wrap gap-3">
            <Link to="/products" className="ven-btn">
              Start Cart <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="ven-btn-outline">
              Contact Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
