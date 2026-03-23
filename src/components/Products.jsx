import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const men = [
  { id: 1, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 1599", img: "https://static.zara.net/assets/public/5932/4ce3/cce941cb8c40/48622e7c10f9/00761414251-p/00761414251-p.jpg?ts=1768482289831&w=750" },
  { id: 2, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 1999", img: "https://static.zara.net/assets/public/a222/a220/39ed4d5791f9/d5bb5ad87d0d/05584390250-p/05584390250-p.jpg?ts=1756909743959&w=750" },
  { id: 3, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 999",  img: "https://static.zara.net/assets/public/c12c/ab9d/ea194a6bb0ce/acea7c3bcc59/04087450800-p/04087450800-p.jpg?ts=1767951586356&w=750" },
  { id: 4, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 2499", img: "https://static.zara.net/assets/public/b219/e143/e82f4fd59526/e32ac4463c9e/01063431605-p/01063431605-p.jpg?ts=1768985049797&w=750" },
  { id: 5, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 1799", img: "https://static.zara.net/assets/public/ff11/aae6/d84d462d8a97/3fe3f41b1cd1/07484390708-p/07484390708-p.jpg?ts=1755697839160&w=750" },
  { id: 6, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 2199", img: "https://static.zara.net/assets/public/a4cd/ad5c/a64f4b6d8817/3709c50bc6c6/01564200401-p/01564200401-p.jpg?ts=1770109241958&w=750" },
  { id: 7, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 1399", img: "https://static.zara.net/assets/public/b1d7/60c7/e08a4052b263/ecccae316bb4/01887401800-p/01887401800-p.jpg?ts=1766414905535&w=750" },
  { id: 8, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 2999", img: "https://static.zara.net/assets/public/eece/b4da/1e0942cdbd2b/25c0c4464f09/00706391737-p/00706391737-p.jpg?ts=1766996302727&w=750" },
];

const women = [
  { id: 1, tag: "Summer", name: "Zara Soft Touch Set",  price: "₹ 1299", img: "https://static.zara.net/assets/public/3e29/f859/0c76446a96f2/4716f554c288/04174001706-p/04174001706-p.jpg?ts=1769603285026&w=750" },
  { id: 2, tag: "Summer", name: "Zara Flowy Dress",     price: "₹ 1999", img: "https://static.zara.net/assets/public/5754/d441/d9a04ce69755/a32145ecaa63/02171018090-p/02171018090-p.jpg?ts=1767009831706&w=750" },
  { id: 3, tag: "New",    name: "Mytheresa Knit Top",   price: "₹ 2499", img: "https://static.zara.net/assets/public/61f6/5424/88c749df9855/d24a1a3bacd9/04661035406-p/04661035406-p.jpg?ts=1771259890885&w=750" },
  { id: 4, tag: "New",    name: "Zara Linen Blazer",    price: "₹ 2999", img: "https://static.zara.net/assets/public/7487/cecb/c2834007a168/b14a0cf17529/02298070087-p/02298070087-p.jpg?ts=1771587773758&w=750" },
  { id: 5, tag: "Summer", name: "Zara Wide Leg Pants",  price: "₹ 1499", img: "https://static.zara.net/assets/public/251b/5c7f/e9914910b841/0ef922abc89f/02082623046-p/02082623046-p.jpg?ts=1773760425152&w=750" },
  { id: 6, tag: "New",    name: "ASRV Sport Legging",   price: "₹ 1799", img: "https://static.zara.net/assets/public/a62c/af5a/37dd445cbff5/b74b858016f5/03067857800-e1/03067857800-e1.jpg?ts=1770050996521&w=750" },
  { id: 7, tag: "Summer", name: "Zara Crop Jacket",     price: "₹ 999",  img: "https://static.zara.net/assets/public/1da3/0ef5/3fc7456390ff/1ac1723f6499/02481777800-p/02481777800-p.jpg?ts=1771936996372&w=750" },
  { id: 8, tag: "New",    name: "Zara Ribbed Midi",     price: "₹ 2199", img: "https://static.zara.net/assets/public/f66b/9b33/4ca740a9b951/d649b1372055/02467889251-p/02467889251-p.jpg?ts=1771259882838&w=750" },
];

// ✅ Only the scrolling card strip — no heading, no title
function CardStrip({ products, bg }) {
  const galleryRef = useRef(null);
  const stripRef   = useRef(null);

  useEffect(() => {
    if (!stripRef.current || !galleryRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      const totalScroll = stripRef.current.scrollWidth - window.innerWidth;

      gsap.to(stripRef.current, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={galleryRef} className={`w-full h-screen flex items-center ${bg}`}>
      <div ref={stripRef} className="flex gap-4 w-max px-10 flex-shrink-0">
        {products.map((p) => (
          <div key={p.id} className="w-[260px] flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer">

              <div className="h-[350px] w-full overflow-hidden">
                <img src={p.img} alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>

              <div className="absolute top-3 left-3">
                <span className="bg-white/80 text-[10px] px-3 py-1 rounded-full">{p.tag}</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-white/90 rounded-xl px-4 py-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-semibold">{p.name}</p>
                    <p className="text-[10px] text-gray-500">{p.price}</p>
                  </div>
                  <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center text-white text-xs">→</div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export both strips so LandingPage can use them
export function MenCards() {
  return <CardStrip products={men} bg="bg-[#dce8e5]" />;
}

export function WomenCards() {
  return <CardStrip products={women} bg="bg-[#f0e8e4]" />;
}