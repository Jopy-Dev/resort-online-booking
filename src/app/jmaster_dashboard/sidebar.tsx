"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, CalendarDays, BedDouble, RefreshCcw, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/actions/auth";

interface SidebarProps {
  userEmail: string;
}

export function Sidebar({ userEmail }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false); // Mobile drawer toggle
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop collapse toggle
  const pathname = usePathname();

  const links = [
    { href: "/jmaster_dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/jmaster_dashboard/bookings", label: "Bookings", icon: CalendarDays },
    { href: "/jmaster_dashboard/rooms", label: "Rooms", icon: BedDouble },
    { href: "/jmaster_dashboard/ical", label: "iCal Settings", icon: RefreshCcw },
    { href: "/jmaster_dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Header & Toggle */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 p-4 text-white shrink-0">
        <div>
          <h2 className="font-heading text-lg tracking-wider">JMASTER ADMIN</h2>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gray-300">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 bg-gray-900 text-white flex flex-col transform transition-all duration-300 ease-in-out md:relative md:translate-x-0 shrink-0",
        isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64",
        isCollapsed ? "md:w-20" : "md:w-64"
      )}>
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center h-[90px] overflow-hidden shrink-0">
          <div className={cn("transition-all duration-300", isCollapsed ? "md:opacity-0 md:w-0" : "opacity-100 w-full")}>
            <h2 className="font-heading text-xl tracking-wider hidden md:block whitespace-nowrap">JMASTER ADMIN</h2>
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest truncate hidden md:block" title={userEmail}>{userEmail}</p>
          </div>
          
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white shrink-0">
            <X size={20} />
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                title={isCollapsed ? link.label : undefined}
                className={cn(
                  "flex items-center py-3 rounded text-sm transition-colors uppercase tracking-wider whitespace-nowrap",
                  isCollapsed ? "md:justify-center px-0" : "px-4",
                  isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <Icon size={20} className={cn("shrink-0", isCollapsed ? "" : "mr-3")} />
                <span className={cn("transition-all duration-300", isCollapsed ? "md:opacity-0 md:w-0 md:overflow-hidden" : "opacity-100")}>
                  {link.label}
                </span>
              </Link>
            );
          })}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className={cn(
              "hidden md:flex w-full items-center py-3 rounded text-sm transition-colors uppercase tracking-wider whitespace-nowrap mt-2",
              isCollapsed ? "justify-center px-0 text-gray-400 hover:bg-gray-800 hover:text-white" : "px-4 text-gray-400 hover:bg-gray-800 hover:text-white"
            )}
          >
            {isCollapsed ? <ChevronRight size={20} className="shrink-0" /> : (
              <>
                <ChevronLeft size={20} className="shrink-0 mr-3" />
                <span className={cn("transition-all duration-300", isCollapsed ? "md:opacity-0 md:w-0 md:overflow-hidden" : "opacity-100")}>
                  Collapse Sidebar
                </span>
              </>
            )}
          </button>
        </nav>

        {/* Footer Actions (Logout) */}
        <div className="p-4 border-t border-gray-800 space-y-2 shrink-0">
          <form action={logout}>
            <button 
              type="submit" 
              title={isCollapsed ? "Secure Logout" : undefined}
              className={cn(
                "w-full flex items-center py-2 text-sm text-red-400 hover:bg-gray-800 rounded transition-colors uppercase tracking-wider whitespace-nowrap",
                isCollapsed ? "md:justify-center px-0" : "px-4"
              )}
            >
              <LogOut size={20} className={cn("shrink-0", isCollapsed ? "" : "mr-3")} />
              <span className={cn("transition-all duration-300", isCollapsed ? "md:opacity-0 md:w-0 md:overflow-hidden" : "opacity-100")}>
                Secure Logout
              </span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
