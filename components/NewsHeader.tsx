"use client"
import { Menu, X } from "lucide-react"
import { SearchDialog } from "./SearchDialog"
import Link from "next/link"
import { useState } from "react"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { ModeToggle } from "./theme/Toggle"

export default function NewsHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: "Business", href: "/category/business" },
    { name: "Entertainment", href: "/category/entertainment" },
    { name: "General", href: "/category/general" },
    { name: "Health", href: "/category/health" },
    { name: "Science", href: "/category/science" },
    { name: "Sports", href: "/category/sports" },
    { name: "Technology", href: "/category/technology" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background border-b mx-auto max-w-screen-xl transition-all duration-300">
      <div className="max-w-screen-xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-4">
            <button
              className="flex items-center md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <SearchDialog />
          </div>
          
          <div className="hidden sm:block font-serif">
            {new Date().toLocaleDateString("en-US", { 
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </div>
          
          <div className="flex items-center gap-4">
            <SignedIn>
              <Link href="/liked" className="hover:text-brand-blue transition-colors">
                <button className="text-base font-medium">
                  Liked
                </button>
              </Link>
              <UserButton afterSwitchSessionUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-base font-medium hover:text-brand-blue transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <ModeToggle />
          </div>
        </div>

        {/* Logo */}
        <div className="text-center border-b py-4">
          <Link href="/" className="inline-block">
            <h1 className="font-serif font-bold tracking-tight text-3xl">
              The News
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <nav className="flex justify-center items-center py-3 px-4">
            <div className="flex gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="hover:text-brand-blue transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <nav className="py-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="block px-4 py-3 text-sm font-medium hover:bg-gray-50"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
