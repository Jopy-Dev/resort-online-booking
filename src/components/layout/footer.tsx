import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-white pt-24 pb-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 border-b border-gray-900 pb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-heading text-2xl font-bold tracking-wider mb-6">DEALS HOTEL</h3>
            <p className="text-gray-400 text-sm leading-loose">
              Experience the pinnacle of alpine luxury. Where untamed wilderness meets unparalleled sophistication.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-semibold">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/rooms" className="text-gray-300 hover:text-white transition-colors text-sm">Rooms</Link></li>
              <li><Link href="/gallery" className="text-gray-300 hover:text-white transition-colors text-sm">Gallery</Link></li>
              <li><Link href="/social" className="text-gray-300 hover:text-white transition-colors text-sm">Social Feed</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-semibold">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-3 mt-1 text-primary shrink-0" />
                <span>123 Alpine Ridge,<br/>St. Moritz, Switzerland</span>
              </li>
              <li className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-primary shrink-0" />
                <span>+41 81 123 4567</span>
              </li>
              <li className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-primary shrink-0" />
                <span>reservations@dealshotel.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} Deals Hotel & Resorts. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-xs text-gray-600">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
