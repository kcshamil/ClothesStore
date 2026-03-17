import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = ["Shop", "Men", "Women", "Trending", "Seasonal", "Accessories"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500&display=swap');
      `}</style>

      <div className="w-full bg-[#dfe7eb] px-3 sm:px-6 pt-7 pb-3" style={{ fontFamily: "'Barlow', sans-serif" }}>
        <div className="mx-auto max-w-6xl rounded-[30px] bg-[#edf3f5] p-2 sm:p-3">

          {/* ── Nav bar ── */}
          <div className="relative flex items-center justify-between rounded-[22px] sm:rounded-[26px] bg-[#dfe9ed] px-4 sm:px-9 py-4 sm:py-[18px]">

            {/* Logo notch — desktop only */}
            <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[13px] hidden md:flex">
              <div className="relative flex h-[58px] w-[240px] items-center justify-center">
                <div
                  className="absolute inset-0 rounded-b-[18px]"
                  style={{ clipPath: "polygon(11% 0%, 89% 0%, 100% 100%, 0% 100%)", background: "#edf3f5" }}
                />
                <span
                  className="relative z-10 pt-2.5 text-[26px] tracking-[0.22em] text-black"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  ROYALFIT
                </span>
              </div>
            </div>

            {/* Mobile logo */}
            <span
              className="md:hidden text-[22px] tracking-[0.2em] text-black"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              ROYALFIT
            </span>

            {/* Left nav — desktop */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {["Shop", "Men", "Women", "Trending"].map((label) => (
                <a key={label} href="#"
                  className="text-[11px] uppercase tracking-[0.1em] text-[#555] transition-colors hover:text-black">
                  {label}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Extra links — large screens */}
              <nav className="hidden lg:flex items-center gap-6">
                {["Seasonal", "Accessories"].map((label) => (
                  <a key={label} href="#"
                    className="text-[11px] uppercase tracking-[0.1em] text-[#555] transition-colors hover:text-black">
                    {label}
                  </a>
                ))}
              </nav>

              {/* Icon row — desktop */}
              <div className="hidden md:flex items-center gap-4">
                {[Search, Heart, ShoppingBag, User].map((Icon, i) => (
                  <button key={i} className="text-gray-600 hover:text-black transition-colors">
                    <Icon className="h-[18px] w-[18px]" />
                  </button>
                ))}
              </div>

              {/* Mobile icons + hamburger */}
              <div className="flex md:hidden items-center gap-3">
                <button className="text-gray-600 hover:text-black transition-colors">
                  <Search className="h-5 w-5" />
                </button>
                <button className="text-gray-600 hover:text-black transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setMobileOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Mobile slide-in drawer ── */}
      {/* Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Panel */}
      <div
        style={{ fontFamily: "'Barlow', sans-serif" }}
        className={`fixed top-0 right-0 z-50 h-full w-[72%] max-w-[300px] bg-[#edf3f5] flex flex-col
          shadow-2xl transition-transform duration-300 ease-in-out md:hidden
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 pt-7 pb-5 border-b border-[#d4dde2]">
          <span
            className="text-[22px] tracking-[0.2em] text-black"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            ROYALFIT
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dfe9ed] text-gray-600 hover:bg-[#d0dde3] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col px-6 py-5 gap-0 flex-1 overflow-y-auto">
          {navLinks.map((label) => (
            <a
              key={label}
              href="#"
              onClick={() => setMobileOpen(false)}
              className="py-3.5 text-[12px] uppercase tracking-[0.14em] text-[#444]
                border-b border-[#dde6ea] hover:text-black transition-colors font-medium"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-6 pb-8 flex flex-col gap-4">
          <button className="w-full rounded-full bg-black py-3 text-[11px] uppercase
            tracking-[0.14em] text-white font-medium hover:bg-[#222] transition-colors">
            Sign In / Up
          </button>
          <div className="flex justify-center gap-7">
            {[Search, Heart, ShoppingBag, User].map((Icon, i) => (
              <button key={i} className="text-gray-500 hover:text-black transition-colors">
                <Icon className="h-[18px] w-[18px]" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}