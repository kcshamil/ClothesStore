import { useEffect, useRef ,useState} from "react";
import gsap from "gsap";



function LandingPage() {
  const textRef = useRef([]);

  useEffect(() => {
    const chars = textRef.current;
    if (!chars.length) return;

    gsap.fromTo(
      chars,
      { rotationX: -90, opacity: 0 },
      {
        rotationX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      }
    );
  }, []);

  const text = "Wear your confidence".split("");
  
    const products = [
    { id: 1, tag: "Winter", name: "ASRV x Equinox Lycra", price: "USD 116.00", img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ_Dr3A-pB4Tcp_AQS1bfb0TV7sMuYxRzpYbnArVHD4Tjy2IZmHl8WLYABKqwAZDkXocHmZFQraJIHhYzFuFJmgQ8tTPNJiXrBtxPaVw2qLIouBL6Eyc48L" },
    { id: 2, tag: "Winter", name: "ASRV x Equinox Lycra", price: "USD 116.00", img: "https://static.zara.net/assets/public/a222/a220/39ed4d5791f9/d5bb5ad87d0d/05584390250-p/05584390250-p.jpg?ts=1756909743959&w=750" },
    { id: 3, tag: "Winter", name: "ASRV x Equinox Lycra", price: "USD 116.00", img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTV8bQfdTDoeIzPCWrv9lPbqw_fQ9XVqSWMcXONkfRGQiVXPNf5RTmN1hbZIoGe43knM3jJnFQMYPTaJT9Tgy6120S6cRaoGSi9s-FCXa0" },
    { id: 4, tag: "Winter", name: "ASRV x Equinox Lycra", price: "USD 116.00", img: "https://static.zara.net/assets/public/b219/e143/e82f4fd59526/e32ac4463c9e/01063431605-p/01063431605-p.jpg?ts=1768985049797&w=750" },
    { id: 5, tag: "Winter", name: "ASRV x Equinox Lycra", price: "USD 116.00", img: "https://static.zara.net/assets/public/ff11/aae6/d84d462d8a97/3fe3f41b1cd1/07484390708-p/07484390708-p.jpg?ts=1755697839160&w=750" },
    { id: 6, tag: "Winter", name: "ASRV x Equinox Lycra", price: "USD 116.00", img: "https://www.mytheresa.com/media/1094/1238/100/db/P00925530.jpg" },
    { id: 7, tag: "Winter", name: "ASRV x Equinox Lycra", price: "USD 116.00", img: "https://static.zara.net/assets/public/b1d7/60c7/e08a4052b263/ecccae316bb4/01887401800-p/01887401800-p.jpg?ts=1766414905535&w=7508" },
    { id: 8, tag: "Winter", name: "ASRV x Equinox Lycra", price: "USD 116.00", img: "https://static.zara.net/assets/public/eece/b4da/1e0942cdbd2b/25c0c4464f09/00706391737-p/00706391737-p.jpg?ts=1766996302727&w=750" },
  ];


  return (
    <>
      <section className="w-full min-h-screen bg-[#f6f6f6]">

        {/* Hero grid */}
        <div className="grid min-h-[calc(100vh-120px)] grid-cols-1 md:grid-cols-3">

          {/* Left — animated text */}
          <div className="flex items-center justify-center overflow-hidden px-6">
            <h1 className="flex flex-wrap justify-center text-[70px] font-bold uppercase leading-none tracking-[-0.08em] md:text-[110px]">
              {text.map((char, index) => (
                <span
                  key={index}
                  ref={(el) => (textRef.current[index] = el)}
                  className="inline-block m-2"
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>

          {/* Centre — main image */}
          <div className="flex items-end justify-center overflow-hidden">
            <img
              src="https://zappfashion.in/wp-content/uploads/2025/06/Screenshot-2025-05-08-162722.png"
              alt="mainImage"
              className="h-[500px] w-auto object-contain md:h-[650px]"
            />
          </div>

          {/* Right — copy + CTA */}
          <div className="flex items-center justify-center px-6">
            <div className="max-w-[260px] text-center md:text-left">
              <h2 className="text-2xl font-semibold uppercase tracking-wide text-black">
                New Drop
              </h2>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Premium men's streetwear collection with bold style, comfort, and modern fit.
              </p>
              <button className="mt-6 rounded-full bg-black px-6 py-3 text-sm uppercase tracking-wide text-white">
                Shop Now
              </button>
            </div>
          </div>

        </div>

        {/* Collection Cards Section */}
        <section className="relative min-h-screen flex flex-col justify-center px-16 py-20 overflow-hidden font-sans">

          {/* Watermark */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black tracking-widest text-black/[0.08] select-none pointer-events-none whitespace-nowrap leading-none z-0 uppercase">
            COLLECTION
          </span>

          {/* Section Header */}
          <div className="relative z-10 flex items-end justify-between mb-12">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">
                New Arrivals — 2026
              </p>
              <h2 className="text-5xl font-bold uppercase tracking-tight text-black leading-none">
                Shop The <br /> Latest Drops
              </h2>
            </div>
            <button className="rounded-full border border-black px-6 py-3 text-xs uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors duration-300">
              View All
            </button>
          </div>

          {/* Cards */}
          <div className="relative z-10 w-full grid grid-cols-3 gap-6 items-end">

            {/* Card 1 — Left */}
            <div className="flex flex-col gap-4 mt-24">
              <div className="h-[320px] rounded-2xl overflow-hidden">
                <img
                  src="public\pexels-angelica-reyn-35454765-11805697.jpg"
                  alt="Men's gear"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-black uppercase tracking-wide">
                  Men's Essentials
                </p>
                <p className="text-[11px] text-gray-400 leading-relaxed mt-1 max-w-[200px]">
                  Performance-driven gear for men—built for summer heat and winter cold.
                </p>
              </div>
            </div>

            {/* Card 2 — Centre */}
            <div className="flex flex-col gap-4">
              <div className="h-[480px] rounded-2xl overflow-hidden">
                <img
                  src="public\pexels-cottonbro-4727484.jpg"
                  alt="Streetwear hoodie"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-black uppercase tracking-wide">
                  Streetwear
                </p>
                <p className="text-[11px] text-gray-400 leading-relaxed mt-1">
                  Bold fits. Everyday comfort.
                </p>
              </div>
            </div>

            {/* Card 3 — Right */}
            <div className="flex flex-col gap-4 mt-16">
              <div className="text-right">
                <p className="text-xs font-medium text-black uppercase tracking-wide">
                  Winter Wear
                </p>
                <p className="text-[11px] text-gray-400 leading-relaxed mt-1 max-w-[200px] ml-auto">
                  Stay warm, stay fit. Insulation meets flexibility for the toughest conditions.
                </p>
              </div>
              <div className="h-[280px] rounded-2xl overflow-hidden">
                <img
                  src="public\pexels-viscoseillusion-2896840.jpg"
                  alt="Winter wear"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </section>

      

      {/* ── Full-Width Video Section ── */}
      <section className="relative w-full h-screen overflow-hidden">

        {/* Video — replace src with your video file */}
        <video
          src="public\6764959-uhd_3840_2160_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content over video */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/50 mb-4">
            Built for the Streets
          </p>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight text-white leading-none mb-8">
            Style that moves <br />  with you
          </h2>
          
        </div>

      </section>

      <section className="w-full bg-[#dce8e5] px-10 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p.id} className="relative rounded-2xl overflow-hidden group cursor-pointer">
 
            {/* Image */}
            <div className="h-[350px] w-full overflow-hidden">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
 
            {/* Top badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="bg-white/80 backdrop-blur-sm text-[10px] font-medium uppercase tracking-wide text-gray-700 px-3 py-1 rounded-full">
                {p.tag}
              </span>
              <button className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
 
            {/* Bottom info bar */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-white/85 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-black tracking-wide">{p.name}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{p.price}</p>
                </div>
                <button className="w-7 h-7 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
 
          </div>
        ))}
      </div>
    </section>
      </section>
    </>
  );
}

export default LandingPage;