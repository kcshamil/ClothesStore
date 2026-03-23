import { ShoppingBag, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ✅ ADD / CHANGE PAGES HERE
const navLinks = [
  { label: "Home",       path: "/" },
  { label: "Men",        path: "/men" },
  { label: "Women",      path: "/women" },
  { label: "Contact Us", path: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Read from sessionStorage — same as AuthPage sets it
  const token = sessionStorage.getItem("token");
  const user  = JSON.parse(sessionStorage.getItem("user") || "null");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setMobileOpen(false);
    navigate("/auth");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500&display=swap');
      `}</style>

      {/* ── DESKTOP HEADER ── */}
      <div className="w-full bg-[#dfe7eb] px-6 pt-7 pb-3" style={{ fontFamily: "Barlow, sans-serif" }}>
        <div className="mx-auto max-w-6xl rounded-[30px] bg-[#edf3f5] p-3">
          <div className="relative flex items-center justify-between rounded-[24px] bg-[#dfe9ed] px-9 py-[18px]">

            {/* CENTER LOGO NOTCH */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-[13px] hidden md:block">
              <div className="relative w-[220px] h-[56px] flex items-center justify-center">
                <div className="absolute inset-0 rounded-b-[16px]"
                  style={{ background: "#edf3f5", clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)" }} />
                <Link to="/" className="relative z-10 pt-2 no-underline text-black"
                  style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 26, letterSpacing: "0.2em" }}>
                  ROYALFIT
                </Link>
              </div>
            </div>

            {/* MOBILE LOGO */}
            <Link to="/" className="md:hidden no-underline text-black"
              style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22, letterSpacing: "0.2em" }}>
              ROYALFIT
            </Link>

            {/*  ALL NAV LINKS — LEFT SIDE */}
            <nav className="hidden md:flex gap-8">
              {navLinks.map(({ label, path }) => (
                <Link key={label} to={path}
                  className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-black no-underline transition-colors">
                  {label}
                </Link>
              ))}
            </nav>

            {/* RIGHT — CART + SIGN IN / LOGOUT */}
            <div className="hidden md:flex items-center gap-4">
              <ShoppingBag className="h-[18px] w-[18px] text-gray-500 hover:text-black cursor-pointer" />

              {token ? (
                // ── Logged in ──
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#dfe9ed] rounded-full px-4 py-2">
                    <User className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-[11px] uppercase tracking-widest text-gray-700 font-medium">
                      {user?.username || "User"}
                    </span>
                  </div>
                  <button onClick={handleLogout}
                    className="flex items-center gap-1.5 border border-red-200 text-red-500 text-[11px] uppercase tracking-widest px-4 py-2 rounded-full hover:bg-red-50 transition-colors">
                    <LogOut className="h-3.5 w-3.5" /> Logout
                  </button>
                </div>
              ) : (
                // ── Not logged in ──
                <button onClick={() => navigate("/auth")}
                  className="bg-black text-white text-[11px] uppercase tracking-widest px-5 py-2 rounded-full hover:bg-gray-800 transition-colors">
                  Sign In / Up
                </button>
              )}
            </div>

            {/* MOBILE HAMBURGER */}
            <button onClick={() => setMobileOpen(true)}
              className="md:hidden bg-black text-white rounded-full p-2">
              <Menu className="h-5 w-5" />
            </button>

          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/30" />}

      <div className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-[#edf3f5] flex flex-col shadow-2xl
        transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ fontFamily: "Barlow, sans-serif" }}>

        <div className="flex items-center justify-between px-6 py-5 border-b border-[#d4dde2]">
          <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22, letterSpacing: "0.2em" }}>ROYALFIT</span>
          <button onClick={() => setMobileOpen(false)}><X className="h-5 w-5 text-gray-500" /></button>
        </div>

        <nav className="flex flex-col px-6 py-4 flex-1">
          {navLinks.map(({ label, path }) => (
            <Link key={label} to={path} onClick={() => setMobileOpen(false)}
              className="py-4 text-[12px] uppercase tracking-widest text-gray-500 border-b border-[#dde6ea] hover:text-black no-underline transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-8">
          {token ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#dfe9ed] rounded-full">
                <User className="h-3.5 w-3.5 text-gray-500" />
                <span className="text-[11px] uppercase tracking-widest text-gray-700 font-medium">
                  {user?.username || "User"}
                </span>
              </div>
              <button onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 text-[11px] uppercase tracking-widest py-3 rounded-full hover:bg-red-50 transition-colors">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          ) : (
            <button onClick={() => { navigate("/auth"); setMobileOpen(false); }}
              className="w-full bg-black text-white text-[11px] uppercase tracking-widest py-3 rounded-full hover:bg-gray-800 transition-colors">
              Sign In / Up
            </button>
          )}
        </div>

      </div>
    </>
  );
}