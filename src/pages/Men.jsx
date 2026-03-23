import Footer from "../components/Footer";
import Header from "../components/Header";

const menProducts = [
  { id: 1, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 1599", img: "https://static.zara.net/assets/public/5932/4ce3/cce941cb8c40/48622e7c10f9/00761414251-p/00761414251-p.jpg?ts=1768482289831&w=750" },
  { id: 2, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 1999", img: "https://static.zara.net/assets/public/a222/a220/39ed4d5791f9/d5bb5ad87d0d/05584390250-p/05584390250-p.jpg?ts=1756909743959&w=750" },
  { id: 3, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 999",  img: "https://static.zara.net/assets/public/c12c/ab9d/ea194a6bb0ce/acea7c3bcc59/04087450800-p/04087450800-p.jpg?ts=1767951586356&w=750" },
  { id: 4, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 2499", img: "https://static.zara.net/assets/public/b219/e143/e82f4fd59526/e32ac4463c9e/01063431605-p/01063431605-p.jpg?ts=1768985049797&w=750" },
  { id: 5, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 1799", img: "https://static.zara.net/assets/public/ff11/aae6/d84d462d8a97/3fe3f41b1cd1/07484390708-p/07484390708-p.jpg?ts=1755697839160&w=750" },
  { id: 6, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 2199", img: "https://static.zara.net/assets/public/a4cd/ad5c/a64f4b6d8817/3709c50bc6c6/01564200401-p/01564200401-p.jpg?ts=1770109241958&w=750" },
  { id: 7, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 1399", img: "https://static.zara.net/assets/public/b1d7/60c7/e08a4052b263/ecccae316bb4/01887401800-p/01887401800-p.jpg?ts=1766414905535&w=750" },
  { id: 8, tag: "Winter", name: "ASRV x Equinox Lycra", price: "₹ 2999", img: "https://static.zara.net/assets/public/eece/b4da/1e0942cdbd2b/25c0c4464f09/00706391737-p/00706391737-p.jpg?ts=1766996302727&w=750" },
];

export default function Men() {
  return (
    <>
    <Header/>
      <div className="min-h-screen bg-[#f6f6f6]">
  
        {/* Banner */}
        <div className="bg-[#dce8e5] px-16 py-16">
          <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">New Arrivals — 2026</p>
          <h1 className="text-6xl font-black uppercase tracking-tight text-black">Men's Collection</h1>
        </div>
  
        {/* Grid */}
        <div className="px-16 py-12 grid grid-cols-2 md:grid-cols-4 gap-5">
          {menProducts.map((p) => (
            <div key={p.id} className="relative rounded-2xl overflow-hidden group cursor-pointer bg-white">
  
              <div className="h-[320px] overflow-hidden">
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
          ))}
        </div>
  
      </div>
      <Footer/>
    </>
  );
}