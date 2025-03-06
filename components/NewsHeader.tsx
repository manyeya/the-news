"use client"
import { Menu, X } from "lucide-react"
import { SearchDialog } from "./SearchDialog"
import Link from "next/link"
import { useState } from "react"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

export default function NewsHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll();

  const paddingTop = useSpring(
    useTransform(scrollY, [0, 100], ["2rem", "0.75rem"]),

  );
  const paddingBottom = useSpring(
    useTransform(scrollY, [0, 100], ["2rem", "0.75rem"]),

  );
  const fontSize = useSpring(
    useTransform(scrollY, [0, 100], ["4.5rem", "2rem"]),

  );

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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              className="flex items-center text-gray-700 hover:text-black"
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
          
          <div className="hidden sm:block text-gray-700 font-serif">
            {new Date().toLocaleDateString("en-US", { 
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </div>
          
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton afterSwitchSessionUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium hover:text-black">
                  Log in
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        {/* Logo */}
        <motion.div 
          className="py-4 sm:py-8 text-center border-b border-gray-200"
          style={{
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
          }}
        >
          <Link href="/" className="inline-block">
            <motion.h1 
              className="font-serif font-bold tracking-tight"
              style={{
                fontSize: fontSize,
              }}
            >
              The News
            </motion.h1>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:block bg-[#121212] text-white">
          <nav className="flex justify-center items-center py-3 px-4">
            <div className="flex gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="hover:text-gray-300 transition-colors"
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
