import Header from "../components/Header";

import Footer from "../components/Footer";

const womenProducts = [
  { id: 1, tag: "Summer", name: "Zara Soft Touch Set",  price: "₹ 1299", img: "https://static.zara.net/assets/public/3e29/f859/0c76446a96f2/4716f554c288/04174001706-p/04174001706-p.jpg?ts=1769603285026&w=750" },
  { id: 2, tag: "Summer", name: "Zara Flowy Dress",     price: "₹ 1999", img: "https://static.zara.net/assets/public/5754/d441/d9a04ce69755/a32145ecaa63/02171018090-p/02171018090-p.jpg?ts=1767009831706&w=750" },
  { id: 3, tag: "New",    name: "Mytheresa Knit Top",   price: "₹ 2499", img: "https://static.zara.net/assets/public/61f6/5424/88c749df9855/d24a1a3bacd9/04661035406-p/04661035406-p.jpg?ts=1771259890885&w=750" },
  { id: 4, tag: "New",    name: "Zara Linen Blazer",    price: "₹ 2999", img: "https://static.zara.net/assets/public/7487/cecb/c2834007a168/b14a0cf17529/02298070087-p/02298070087-p.jpg?ts=1771587773758&w=750" },
  { id: 5, tag: "Summer", name: "Zara Wide Leg Pants",  price: "₹ 1499", img: "https://static.zara.net/assets/public/251b/5c7f/e9914910b841/0ef922abc89f/02082623046-p/02082623046-p.jpg?ts=1773760425152&w=750" },
  { id: 6, tag: "New",    name: "ASRV Sport Legging",   price: "₹ 1799", img: "https://static.zara.net/assets/public/a62c/af5a/37dd445cbff5/b74b858016f5/03067857800-e1/03067857800-e1.jpg?ts=1770050996521&w=750" },
  { id: 7, tag: "Summer", name: "Zara Crop Jacket",     price: "₹ 999",  img: "https://static.zara.net/assets/public/1da3/0ef5/3fc7456390ff/1ac1723f6499/02481777800-p/02481777800-p.jpg?ts=1771936996372&w=750" },
  { id: 8, tag: "New",    name: "Zara Ribbed Midi",     price: "₹ 2199", img: "https://static.zara.net/assets/public/f66b/9b33/4ca740a9b951/d649b1372055/02467889251-p/02467889251-p.jpg?ts=1771259882838&w=750" },
];

export default function Women() {
  return (
   <>
    <Header/>
      <div className="min-h-screen bg-[#f6f6f6]">
  
        {/* Banner */}
        <div className="bg-[#f0e8e4] px-16 py-16">
          <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">New Arrivals — 2026</p>
          <h1 className="text-6xl font-black uppercase tracking-tight text-black">Women's Collection</h1>
        </div>
  
        {/* Grid */}
        <div className="px-16 py-12 grid grid-cols-2 md:grid-cols-4 gap-5">
          {womenProducts.map((p) => (
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