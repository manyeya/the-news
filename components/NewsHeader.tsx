"use client"
import { Menu, X } from "lucide-react"
import { SearchDialog } from "./SearchDialog"
import Link from "next/link"
import { useState } from "react"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

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
    <header className="sticky top-0 z-50 bg-background">
      <div className="max-w-screen-xl mx-auto border border-muted">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <button
            className="flex items-center text-gray-600 text-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 mr-2" /> : <Menu className="w-4 h-4 mr-2" />}
          </button>
          <div className="text-gray-500 text-sm hidden sm:block">Friday, February 24, 2017</div>
          <div className="flex items-center gap-2 sm:gap-4">
            <SearchDialog />
            <SignedIn>
              <UserButton afterSwitchSessionUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-2 sm:px-3 py-1  text-sm">
                  Log in
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        {/* Logo */}
        <div className="py-4 sm:py-8 text-center">
          <Link href="/" className="text-4xl sm:text-6xl font-serif font-bold">The News</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block border-t ">
          <nav className="flex justify-center items-center py-3 px-4 gap-4 lg:gap-6 text-sm flex-wrap">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-gray-500">
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="flex flex-col py-2">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="px-4 py-2 hover:bg-gray-50 text-sm">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Bottom border with yellow highlight */}
        <div className="border-t relative">
          <div className="absolute bottom-0 right-0 h-1 w-20 sm:w-32 bg-yellow-300"></div>
        </div>
      </div>
    </header>
  )
}
