import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { MenCards, WomenCards } from "../components/Products"; // ✅ import card strips
import Header from "../components/Header";
import Footer from "../components/Footer";

function LandingPage() {
  const textRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const chars = textRef.current;
    if (!chars.length) return;
    gsap.fromTo(chars,
      { rotationX: -90, opacity: 0 },
      { rotationX: 0, opacity: 1, duration: 0.8, stagger: 0.05, repeat: -1, yoyo: true, ease: "power2.inOut" }
    );
  }, []);

  const text = "Wear your confidence".split("");

  return (
    <>
      <Header />
      {/* ── 1. Hero ── */}
      <section className="w-full min-h-screen bg-[#f6f6f6]">
        <div className="grid min-h-[calc(100vh-120px)] grid-cols-1 md:grid-cols-3">

          <div className="flex items-center justify-center overflow-hidden px-6">
            <h1 className="flex flex-wrap justify-center text-[70px] font-bold uppercase leading-none tracking-[-0.08em] md:text-[110px]">
              {text.map((char, index) => (
                <span key={index} ref={(el) => (textRef.current[index] = el)} className="inline-block m-2">
                  {char}
                </span>
              ))}
            </h1>
          </div>

          <div className="flex items-end justify-center overflow-hidden">
            <img
              src="https://zappfashion.in/wp-content/uploads/2025/06/Screenshot-2025-05-08-162722.png"
              alt="mainImage"
              className="h-[500px] w-auto object-contain md:h-[650px]"
            />
          </div>

          <div className="flex items-center justify-center px-6">
            <div className="max-w-[260px] text-center md:text-left">
              <h2 className="text-2xl font-semibold uppercase tracking-wide text-black">New Drop</h2>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Premium men's streetwear collection with bold style, comfort, and modern fit.
              </p>
              <button className="mt-6 rounded-full bg-black px-6 py-3 text-sm uppercase tracking-wide text-white">
                Shop Now
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. Men / Women Split ── */}
      <section className="w-full grid grid-cols-2 h-[80vh]">

        <div className="relative overflow-hidden group cursor-pointer" onClick={() => navigate("/men")}>
          <img src="public/pexels-cottonbro-4727484.jpg" alt="Men's Collection"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-3">Bold. Strong. Defined.</p>
            <h2 className="text-6xl font-black uppercase tracking-tight text-white leading-none mb-6">Men</h2>
            <button className="rounded-full border border-white px-8 py-3 text-[11px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors duration-300">
              Shop Men
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden group cursor-pointer" onClick={() => navigate("/women")}>
          <img src="https://static.zara.net/assets/public/26de/1a46/08ba4e539360/4e47d2cb9ad8/03666080800-p/03666080800-p.jpg?ts=1772714980034&w=750" alt="Women's Collection"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-3">Elegant. Fierce. Free.</p>
            <h2 className="text-6xl font-black uppercase tracking-tight text-white leading-none mb-6">Women</h2>
            <button className="rounded-full border border-white px-8 py-3 text-[11px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors duration-300">
              Shop Women
            </button>
          </div>
        </div>

      </section>

      {/* ── 3. Men's Cards — heading lives here, cards from Products.jsx ── */}
      <section className="bg-[#dce8e5]">
        <div className="px-10 pt-12 pb-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-1">New Arrivals — 2026</p>
            <h2 className="text-4xl font-black uppercase tracking-tight text-black leading-none">Men's Collection</h2>
          </div>
          <button onClick={() => navigate("/men")}
            className="rounded-full border border-black px-6 py-2.5 text-[10px] uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors duration-300">
            View All
          </button>
        </div>
        {/*  Card strip from Products.jsx */}
        <MenCards />
      </section>

      {/* ── 4. Women's Cards — heading lives here, cards from Products.jsx ── */}
      <section className="bg-[#f0e8e4]">
        <div className="px-10 pt-12 pb-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-1">New Arrivals — 2026</p>
            <h2 className="text-4xl font-black uppercase tracking-tight text-black leading-none">Women's Collection</h2>
          </div>
          <button onClick={() => navigate("/women")}
            className="rounded-full border border-black px-6 py-2.5 text-[10px] uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors duration-300">
            View All
          </button>
        </div>
        {/*  Card strip from Products.jsx */}
        <WomenCards />
      </section>

      {/* ── 5. Collection 3-Card Section ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-16 py-20 overflow-hidden font-sans bg-white">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black tracking-widest text-black/[0.08] select-none pointer-events-none whitespace-nowrap leading-none z-0 uppercase">
          COLLECTION
        </span>
        <div className="relative z-10 flex items-end justify-between mb-12">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">New Arrivals — 2026</p>
            <h2 className="text-5xl font-bold uppercase tracking-tight text-black leading-none">
              Shop The <br /> Latest Drops
            </h2>
          </div>
          <button className="rounded-full border border-black px-6 py-3 text-xs uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors duration-300">
            View All
          </button>
        </div>
        <div className="relative z-10 w-full grid grid-cols-3 gap-6 items-end">
          <div className="flex flex-col gap-4 mt-24">
            <div className="h-[320px] rounded-2xl overflow-hidden">
              <img src="public/pexels-angelica-reyn-35454765-11805697.jpg" alt="Men's gear" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-medium text-black uppercase tracking-wide">Men's Essentials</p>
              <p className="text-[11px] text-gray-400 leading-relaxed mt-1 max-w-[200px]">
                Performance-driven gear for men—built for summer heat and winter cold.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-[480px] rounded-2xl overflow-hidden">
              <img src="public/pexels-cottonbro-4727484.jpg" alt="Streetwear hoodie" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-black uppercase tracking-wide">Streetwear</p>
              <p className="text-[11px] text-gray-400 leading-relaxed mt-1">Bold fits. Everyday comfort.</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-16">
            <div className="text-right">
              <p className="text-xs font-medium text-black uppercase tracking-wide">Winter Wear</p>
              <p className="text-[11px] text-gray-400 leading-relaxed mt-1 max-w-[200px] ml-auto">
                Stay warm, stay fit. Insulation meets flexibility for the toughest conditions.
              </p>
            </div>
            <div className="h-[280px] rounded-2xl overflow-hidden">
              <img src="public/pexels-viscoseillusion-2896840.jpg" alt="Winter wear" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Full-Width Video ── */}
      <section className="relative w-full h-screen overflow-hidden">
        <video src="public/6764959-uhd_3840_2160_25fps.mp4" autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/50 mb-4">Built for the Streets</p>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight text-white leading-none mb-8">
            Style that moves <br /> with you
          </h2>
        </div>
      </section>
      <Footer />

    </>
  );
}

export default LandingPage;