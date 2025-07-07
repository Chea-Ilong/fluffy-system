"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Home, Trophy, Users, Settings, Menu, X } from "lucide-react"

const NAVIGATION_LINKS = [
  { href: "/", label: "Overall", icon: Home },
  { href: "/leaderboard/round1", label: "Round 1", icon: Trophy },
  { href: "/leaderboard/round2", label: "Round 2", icon: Trophy },
  { href: "/leaderboard/team", label: "Teams", icon: Users },
] as const

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/CADTIDTLogo.png"
              width={160}
              height={80}
              alt="CADT IDT Logo"
              className="cursor-pointer transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAVIGATION_LINKS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Link>
              )
            })}

            {/* Admin Button */}
            {/* <div className="ml-6 pl-6 border-l border-gray-200">
              <Link
                href="/admin"
                className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors duration-200"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Link>
            </div> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {NAVIGATION_LINKS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {label}
                </Link>
              )
            })}
            <div className="pt-3 mt-3 border-t border-gray-200">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center bg-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors duration-200"
              >
                <Settings className="w-4 h-4 mr-3" />
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
