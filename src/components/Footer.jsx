import React from "react";
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#dfe7eb] px-6 pb-6 pt-12 font-[Barlow,sans-serif]">
      <div className="mx-auto max-w-7xl rounded-[30px] bg-[#edf3f5] px-8 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          
          {/* Logo */}
          <div>
            <h2
              className="text-3xl tracking-[0.2em] text-black"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              ROYALFIT
            </h2>
            <p className="mt-4 max-w-[240px] text-sm leading-6 text-gray-600">
              Premium men’s fashion built for confidence, comfort, and everyday style.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-black">
              Shop
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">New Arrivals</a></li>
              <li><a href="#" className="hover:text-black">Men</a></li>
              <li><a href="#" className="hover:text-black">Trending</a></li>
              <li><a href="#" className="hover:text-black">Accessories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-black">
              Support
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Contact Us</a></li>
              <li><a href="#" className="hover:text-black">Shipping</a></li>
              <li><a href="#" className="hover:text-black">Returns</a></li>
              <li><a href="#" className="hover:text-black">FAQ</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-black">
              Follow Us
            </h3>
            <div className="mt-4 flex items-center gap-4">
              <a className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <FaInstagram />
              </a>
              <a className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <FaTwitter />
              </a>
              <a className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <FaFacebookF />
              </a>
              <a className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-gray-300 pt-5 text-center text-sm text-gray-500">
          © 2026 RoyalFit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}