"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-heading text-2xl font-bold tracking-wider text-gray-900">
              DEALS HOTEL
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/rooms" className="text-gray-600 hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">
              Rooms
            </Link>
            <Link href="/gallery" className="text-gray-600 hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">
              Gallery
            </Link>
            <Link href="/social" className="text-gray-600 hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">
              Social
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">
              About Us
            </Link>
            
            <Button className="bg-primary text-white hover:bg-primary/90 rounded-none px-8 py-6 tracking-widest uppercase font-semibold">
              Book Now
            </Button>
          </div>
          
          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" className="text-gray-900" onClick={toggleMobileMenu} aria-label="Toggle menu">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-xl absolute w-full left-0 top-20">
          <div className="px-4 py-8 space-y-6 flex flex-col">
            <Link href="/rooms" onClick={toggleMobileMenu} className="text-gray-900 hover:text-primary transition-colors text-lg uppercase tracking-widest font-medium text-center">
              Rooms
            </Link>
            <Link href="/gallery" onClick={toggleMobileMenu} className="text-gray-900 hover:text-primary transition-colors text-lg uppercase tracking-widest font-medium text-center">
              Gallery
            </Link>
            <Link href="/social" onClick={toggleMobileMenu} className="text-gray-900 hover:text-primary transition-colors text-lg uppercase tracking-widest font-medium text-center">
              Social
            </Link>
            <Link href="/about" onClick={toggleMobileMenu} className="text-gray-900 hover:text-primary transition-colors text-lg uppercase tracking-widest font-medium text-center">
              About Us
            </Link>
            <div className="pt-6 w-full flex justify-center">
              <Button className="w-full max-w-sm bg-primary text-white hover:bg-primary/90 rounded-none px-8 py-6 tracking-widest uppercase font-semibold">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
