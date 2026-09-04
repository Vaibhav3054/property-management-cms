import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bhopal Properties | Your Trusted Real Estate Dealer",
  description: "Find your dream home in Bhopal. Properties for sale and rent in Kolar Road, MP Nagar, Arera Colony, and more.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen text-gray-900`}>
      {/* Top Header */}
      <div className="bg-blue-900 text-white text-sm py-2 hidden sm:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={14} /> +91 98765 43210</span>
            <span className="flex items-center gap-1"><Mail size={14} /> contact@bhopalproperties.in</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} /> MP Nagar, Bhopal, MP
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-900 flex items-center gap-2">
            Bhopal<span className="text-yellow-600">Properties</span>
          </Link>
          <nav className="hidden md:flex gap-6 font-medium text-gray-700">
            <Link href="/" className="hover:text-blue-700 transition">Home</Link>
            <Link href="/properties?type=sale" className="hover:text-blue-700 transition">Buy</Link>
            <Link href="/properties?type=rent" className="hover:text-blue-700 transition">Rent</Link>
            <Link href="/about" className="hover:text-blue-700 transition">About</Link>
            <Link href="/contact" className="hover:text-blue-700 transition">Contact</Link>
          </nav>
          <Link href="/contact" className="bg-blue-800 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition">
            Enquire Now
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t-4 border-yellow-600 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Bhopal Properties</h3>
            <p className="mb-4 text-gray-400">
              Your trusted local property dealer in Bhopal, Madhya Pradesh. We help you find the best homes and commercial spaces in top localities.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/properties" className="hover:text-yellow-500 transition">All Properties</Link></li>
              <li><Link href="/properties?type=sale" className="hover:text-yellow-500 transition">Properties for Sale</Link></li>
              <li><Link href="/properties?type=rent" className="hover:text-yellow-500 transition">Properties for Rent</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-500 transition">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2"><Phone size={16} className="text-yellow-500"/> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail size={16} className="text-yellow-500"/> info@bhopalproperties.in</li>
              <li className="flex items-center gap-2"><MapPin size={16} className="text-yellow-500"/> Zone 1, MP Nagar, Bhopal</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-8 mt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Bhopal Properties. All rights reserved.
        </div>
      </footer>
      </body>
    </html>
  );
}
