import { useState } from "react";
import { LayoutDashboard, Package, ShoppingCart, Users, Plus, Trash2, Edit2, X, ChevronRight, Search, Filter, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialProducts = [
  { id: 1, name: "ASRV x Equinox Lycra", category: "Men",   price: 1599, tag: "Winter", img: "https://static.zara.net/assets/public/5932/4ce3/cce941cb8c40/48622e7c10f9/00761414251-p/00761414251-p.jpg?ts=1768482289831&w=750" },
  { id: 2, name: "ASRV x Equinox Lycra", category: "Men",   price: 1999, tag: "Winter", img: "https://static.zara.net/assets/public/a222/a220/39ed4d5791f9/d5bb5ad87d0d/05584390250-p/05584390250-p.jpg?ts=1756909743959&w=750" },
  { id: 3, name: "ASRV x Equinox Lycra", category: "Men",   price: 999,  tag: "Winter", img: "https://static.zara.net/assets/public/c12c/ab9d/ea194a6bb0ce/acea7c3bcc59/04087450800-p/04087450800-p.jpg?ts=1767951586356&w=750" },
  { id: 4, name: "ASRV x Equinox Lycra", category: "Men",   price: 2499, tag: "Winter", img: "https://static.zara.net/assets/public/b219/e143/e82f4fd59526/e32ac4463c9e/01063431605-p/01063431605-p.jpg?ts=1768985049797&w=750" },
  { id: 5, name: "Zara Soft Touch Set",  category: "Women", price: 1299, tag: "Summer", img: "https://static.zara.net/assets/public/3e29/f859/0c76446a96f2/4716f554c288/04174001706-p/04174001706-p.jpg?ts=1769603285026&w=750" },
  { id: 6, name: "Zara Flowy Dress",     category: "Women", price: 1999, tag: "Summer", img: "https://static.zara.net/assets/public/5754/d441/d9a04ce69755/a32145ecaa63/02171018090-p/02171018090-p.jpg?ts=1767009831706&w=750" },
  { id: 7, name: "Mytheresa Knit Top",   category: "Women", price: 2499, tag: "New",    img: "https://static.zara.net/assets/public/61f6/5424/88c749df9855/d24a1a3bacd9/04661035406-p/04661035406-p.jpg?ts=1771259890885&w=750" },
  { id: 8, name: "Zara Linen Blazer",    category: "Women", price: 2999, tag: "New",    img: "https://static.zara.net/assets/public/7487/cecb/c2834007a168/b14a0cf17529/02298070087-p/02298070087-p.jpg?ts=1771587773758&w=750" },
];

const initialUsers = [
  { id: 1, name: "Arjun Sharma",  email: "arjun@gmail.com",  role: "Customer", joined: "Jan 2026", status: "Active" },
  { id: 2, name: "Priya Nair",    email: "priya@gmail.com",  role: "Customer", joined: "Feb 2026", status: "Active" },
  { id: 3, name: "Rahul Mehta",   email: "rahul@gmail.com",  role: "Customer", joined: "Mar 2026", status: "Inactive" },
  { id: 4, name: "Sneha Pillai",  email: "sneha@gmail.com",  role: "Customer", joined: "Mar 2026", status: "Active" },
  { id: 5, name: "Kiran Das",     email: "kiran@gmail.com",  role: "Customer", joined: "Mar 2026", status: "Active" },
];

// Only purchased orders — cart → payment completed
const initialOrders = [
  { id: "#ORD001", customer: "Arjun Sharma",  product: "ASRV x Equinox Lycra", qty: 1, amount: 1599, date: "18 Mar 2026", payment: "Paid" },
  { id: "#ORD002", customer: "Priya Nair",    product: "Zara Flowy Dress",      qty: 2, amount: 3998, date: "17 Mar 2026", payment: "Paid" },
  { id: "#ORD003", customer: "Rahul Mehta",   product: "Zara Linen Blazer",     qty: 1, amount: 2999, date: "16 Mar 2026", payment: "Paid" },
  { id: "#ORD004", customer: "Sneha Pillai",  product: "Mytheresa Knit Top",    qty: 1, amount: 2499, date: "15 Mar 2026", payment: "Paid" },
  { id: "#ORD005", customer: "Kiran Das",     product: "ASRV x Equinox Lycra",  qty: 2, amount: 3998, date: "14 Mar 2026", payment: "Paid" },
  { id: "#ORD006", customer: "Arjun Sharma",  product: "Zara Soft Touch Set",   qty: 1, amount: 1299, date: "13 Mar 2026", payment: "Paid" },
];

const emptyForm = { name: "", category: "Men", price: "", tag: "New", img: "" };

export default function AdminDashboard() {
  const [tab, setTab]                     = useState("dashboard");
  const [products, setProducts]           = useState(initialProducts);
  const [users]                           = useState(initialUsers);
  const [orders]                          = useState(initialOrders);
  const [showModal, setShowModal]         = useState(false);
  const [editProduct, setEditProduct]     = useState(null);
  const [form, setForm]                   = useState(emptyForm);
  const [formErrors, setFormErrors]       = useState({});
  const [productSearch, setProductSearch] = useState("");
  const [productFilter, setProductFilter] = useState("All");
  const [userSearch, setUserSearch]       = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/auth");
  };

  const openAdd  = () => { setEditProduct(null); setForm(emptyForm); setFormErrors({}); setShowModal(true); };
  const openEdit = (p) => { setEditProduct(p); setForm({ name: p.name, category: p.category, price: p.price, tag: p.tag, img: p.img }); setFormErrors({}); setShowModal(true); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.price || isNaN(form.price) || +form.price <= 0) e.price = "Enter valid price";
    return e;
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    if (editProduct) {
      setProducts(products.map(p => p.id === editProduct.id ? { ...p, ...form, price: +form.price } : p));
    } else {
      setProducts([...products, { id: Date.now(), ...form, price: +form.price }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => { if (window.confirm("Delete this product?")) setProducts(products.filter(p => p.id !== id)); };

  const filteredProducts = products
    .filter(p => productFilter === "All" || p.category === productFilter)
    .filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()));

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const navItems = [
    { key: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { key: "products",  label: "Products",  Icon: Package },
    { key: "orders",    label: "Orders",    Icon: ShoppingCart },
    { key: "users",     label: "Users",     Icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f6] font-sans flex">

      {/* SIDEBAR */}
      <aside className="w-60 min-h-screen bg-[#edf3f5] border-r border-gray-200 flex flex-col fixed top-0 left-0 h-full z-10">
        <div className="px-6 py-7 border-b border-gray-200">
          <h1 className="text-[26px] tracking-[0.2em] text-black leading-none"
            style={{ fontFamily: "'Bebas Neue', cursive" }}>ROYALFIT</h1>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex flex-col px-3 py-4 gap-1 flex-1">
          {navItems.map(({ key, label, Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[12px] uppercase tracking-widest font-medium transition-all text-left
                ${tab === key ? "bg-black text-white" : "text-gray-500 hover:bg-gray-100 hover:text-black"}`}>
              <Icon className="h-4 w-4" />{label}
              {tab === key && <ChevronRight className="h-3 w-3 ml-auto" />}
            </button>
          ))}
        </nav>
        <div className="px-6 py-5 border-t border-gray-200">
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Logged in as</p>
          <p className="text-sm font-semibold text-black mt-0.5">Admin</p>
          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 text-[11px] uppercase tracking-widest py-2.5 rounded-full hover:bg-red-50 transition-colors">
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-60 p-8">

        {/* ── DASHBOARD ── */}
        {tab === "dashboard" && (
          <div>
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Overview</p>
              <h2 className="text-3xl font-black uppercase tracking-tight text-black">Dashboard</h2>
            </div>

            {/* 3 KPI cards only */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Products", value: products.length, sub: `${products.filter(p => p.category === "Men").length} Men · ${products.filter(p => p.category === "Women").length} Women` },
                { label: "Total Orders",   value: orders.length,   sub: "Completed purchases" },
                { label: "Total Users",    value: users.length,    sub: `${users.filter(u => u.status === "Active").length} active` },
              ].map(({ label, value, sub }) => (
                <div key={label} className="bg-white rounded-2xl px-6 py-5">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                  <p className="text-3xl font-black text-black">{value}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{sub}</p>
                </div>
              ))}
            </div>

            {/* Recent Purchases table */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-tight text-black">Recent Purchases</h3>
                <button onClick={() => setTab("orders")}
                  className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                  View all
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    {["Order ID", "Customer", "Product", "Qty", "Amount", "Date"].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-[10px] uppercase tracking-widest text-gray-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(o => (
                    <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 text-[12px] font-semibold text-black">{o.id}</td>
                      <td className="px-6 py-3 text-[12px] text-gray-600">{o.customer}</td>
                      <td className="px-6 py-3 text-[12px] text-gray-500 max-w-[160px] truncate">{o.product}</td>
                      <td className="px-6 py-3 text-[12px] text-gray-500">{o.qty}</td>
                      <td className="px-6 py-3 text-[12px] font-medium text-black">₹ {o.amount.toLocaleString()}</td>
                      <td className="px-6 py-3 text-[12px] text-gray-400">{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── PRODUCTS ── */}
        {tab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Manage</p>
                <h2 className="text-3xl font-black uppercase tracking-tight text-black">Products</h2>
              </div>
              <button onClick={openAdd}
                className="flex items-center gap-2 bg-black text-white text-[11px] uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
                <Plus className="h-4 w-4" /> Add Product
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[{ label: "Total", value: products.length }, { label: "Men's", value: products.filter(p => p.category === "Men").length }, { label: "Women's", value: products.filter(p => p.category === "Women").length }].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-2xl px-6 py-5">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                  <p className="text-3xl font-black text-black">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mb-6">
              <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-2.5 border border-gray-100">
                <Search className="h-4 w-4 text-gray-300 flex-shrink-0" />
                <input value={productSearch} onChange={e => setProductSearch(e.target.value)}
                  placeholder="Search products..." className="flex-1 bg-transparent text-sm outline-none placeholder-gray-300" />
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 border border-gray-100">
                <Filter className="h-4 w-4 text-gray-300" />
                <select value={productFilter} onChange={e => setProductFilter(e.target.value)}
                  className="bg-transparent text-sm outline-none text-gray-600">
                  <option>All</option><option>Men</option><option>Women</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl overflow-hidden">
                  <div className="h-[220px] overflow-hidden relative">
                    <img src={p.img || "https://via.placeholder.com/300x220?text=No+Image"} alt={p.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-white/80 text-[10px] px-3 py-1 rounded-full">{p.tag}</span>
                    <span className={`absolute top-3 right-3 text-[10px] px-3 py-1 rounded-full font-medium ${p.category === "Men" ? "bg-[#dce8e5] text-teal-800" : "bg-[#f0e8e4] text-rose-800"}`}>{p.category}</span>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xs font-semibold text-black truncate">{p.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">₹ {p.price.toLocaleString()}</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1 border border-gray-200 rounded-full py-1.5 text-[10px] uppercase text-gray-500 hover:border-black hover:text-black transition-colors">
                        <Edit2 className="h-3 w-3" /> Edit
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="flex-1 flex items-center justify-center gap-1 border border-gray-200 rounded-full py-1.5 text-[10px] uppercase text-red-400 hover:border-red-400 transition-colors">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-4 text-center py-16 text-gray-400 text-sm">No products found</div>
              )}
            </div>
          </div>
        )}

        {/* ── ORDERS (purchased only, no delivery) ── */}
        {tab === "orders" && (
          <div>
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Manage</p>
              <h2 className="text-3xl font-black uppercase tracking-tight text-black">Orders</h2>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Orders",    value: orders.length },
                { label: "Total Items Sold",value: orders.reduce((s, o) => s + o.qty, 0) },
                { label: "Total Collected", value: `₹ ${orders.reduce((s, o) => s + o.amount, 0).toLocaleString()}` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-2xl px-6 py-5">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                  <p className="text-2xl font-black text-black">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Order ID", "Customer", "Product", "Qty", "Amount", "Date", "Payment"].map(h => (
                      <th key={h} className="px-6 py-4 text-left text-[10px] uppercase tracking-widest text-gray-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-[12px] font-semibold text-black">{o.id}</td>
                      <td className="px-6 py-4 text-[12px] text-gray-700">{o.customer}</td>
                      <td className="px-6 py-4 text-[12px] text-gray-500 max-w-[160px] truncate">{o.product}</td>
                      <td className="px-6 py-4 text-[12px] text-gray-500">{o.qty}</td>
                      <td className="px-6 py-4 text-[12px] font-medium text-black">₹ {o.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-[12px] text-gray-400">{o.date}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] uppercase tracking-wide px-3 py-1 rounded-full font-medium bg-green-50 text-green-600">
                          {o.payment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── USERS ── */}
        {tab === "users" && (
          <div>
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Manage</p>
              <h2 className="text-3xl font-black uppercase tracking-tight text-black">All Users</h2>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[{ label: "Total", value: users.length }, { label: "Active", value: users.filter(u => u.status === "Active").length }, { label: "Inactive", value: users.filter(u => u.status === "Inactive").length }].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-2xl px-6 py-5">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                  <p className="text-3xl font-black text-black">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 border border-gray-100 mb-6 max-w-sm">
              <Search className="h-4 w-4 text-gray-300 flex-shrink-0" />
              <input value={userSearch} onChange={e => setUserSearch(e.target.value)}
                placeholder="Search users..." className="flex-1 bg-transparent text-sm outline-none placeholder-gray-300" />
            </div>

            <div className="bg-white rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["#", "Name", "Email", "Role", "Joined", "Status"].map(h => (
                      <th key={h} className="px-6 py-4 text-left text-[10px] uppercase tracking-widest text-gray-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => (
                    <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-[12px] text-gray-400">{i + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#dce8e5] flex items-center justify-center text-[11px] font-bold text-teal-700">{u.name.charAt(0)}</div>
                          <span className="text-[13px] font-medium text-black">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[12px] text-gray-500">{u.email}</td>
                      <td className="px-6 py-4"><span className="text-[10px] uppercase tracking-wide bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{u.role}</span></td>
                      <td className="px-6 py-4 text-[12px] text-gray-400">{u.joined}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] uppercase tracking-wide px-3 py-1 rounded-full font-medium ${u.status === "Active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-400"}`}>{u.status}</span>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-400">No users found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-[24px] w-full max-w-md px-8 py-8">
            <div className="flex items-center justify-between mb-7">
              <h3 className="text-xl font-black uppercase tracking-tight text-black">{editProduct ? "Edit Product" : "Add Product"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-black"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Product Name</label>
                <div className={`flex border-b pb-1 ${formErrors.name ? "border-red-400" : "border-gray-200 focus-within:border-black"}`}>
                  <input type="text" value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setFormErrors({ ...formErrors, name: "" }); }}
                    placeholder="e.g. ASRV x Equinox" className="flex-1 bg-transparent text-sm outline-none py-1.5 placeholder-gray-300" />
                </div>
                {formErrors.name && <p className="text-[10px] text-red-400 mt-1">{formErrors.name}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-200 outline-none py-1.5 text-sm text-black">
                    <option>Men</option><option>Women</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Tag</label>
                  <select value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-200 outline-none py-1.5 text-sm text-black">
                    <option>New</option><option>Winter</option><option>Summer</option><option>Trending</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Price (₹)</label>
                <div className={`flex border-b pb-1 ${formErrors.price ? "border-red-400" : "border-gray-200 focus-within:border-black"}`}>
                  <input type="number" value={form.price} onChange={e => { setForm({ ...form, price: e.target.value }); setFormErrors({ ...formErrors, price: "" }); }}
                    placeholder="e.g. 1999" className="flex-1 bg-transparent text-sm outline-none py-1.5 placeholder-gray-300" />
                </div>
                {formErrors.price && <p className="text-[10px] text-red-400 mt-1">{formErrors.price}</p>}
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Image URL</label>
                <div className="flex border-b border-gray-200 focus-within:border-black pb-1">
                  <input type="text" value={form.img} onChange={e => setForm({ ...form, img: e.target.value })}
                    placeholder="https://..." className="flex-1 bg-transparent text-sm outline-none py-1.5 placeholder-gray-300" />
                </div>
              </div>
              {form.img && <div className="h-32 rounded-xl overflow-hidden bg-gray-50"><img src={form.img} alt="preview" className="w-full h-full object-cover" /></div>}
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-full py-3 text-[11px] uppercase tracking-widest text-gray-500 hover:border-black hover:text-black transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 bg-black text-white rounded-full py-3 text-[11px] uppercase tracking-widest hover:bg-gray-800 transition-colors">{editProduct ? "Save Changes" : "Add Product"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}