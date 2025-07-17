"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mobile-container">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold sm:text-2xl mobile-heading hover:text-primary transition-colors">
            Riyad Shauk
          </Link>
          <p className="hidden sm:block text-sm text-muted-foreground ml-4">Tutoring & Software Consulting</p>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 rounded-md hover:bg-muted transition-colors touch-target"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-foreground/80">Home</Link>
          <Link href="/tutoring" className="transition-colors hover:text-foreground/80">Tutoring</Link>
          <Link href="/consulting" className="transition-colors hover:text-foreground/80">Consulting</Link>
          <Link href="/#projects" className="transition-colors hover:text-foreground/80">Projects</Link>
          <Link href="/#testimonials" className="transition-colors hover:text-foreground/80">Testimonials</Link>
          <Link href="/#reviews" className="transition-colors hover:text-foreground/80">Reviews</Link>
          <Link href="/messaging" className="transition-colors hover:text-foreground/80">Message Me!</Link>
          <Button asChild>
            <Link href="/#contact">Contact</Link>
          </Button>
          <a 
            href="https://github.com/riyadshauk/riyadshauk.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-colors hover:text-foreground/80 p-2 rounded-md hover:bg-muted"
            aria-label="View source code on GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t bg-background/95 backdrop-blur">
          <div className="container px-4 py-4 space-y-4 mobile-container">
            <Link href="/" className="block py-3 text-base font-medium transition-colors hover:text-foreground/80 mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/tutoring" className="block py-3 text-base font-medium transition-colors hover:text-foreground/80 mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Tutoring</Link>
            <Link href="/consulting" className="block py-3 text-base font-medium transition-colors hover:text-foreground/80 mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Consulting</Link>
            <Link href="/#projects" className="block py-3 text-base font-medium transition-colors hover:text-foreground/80 mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
            <Link href="/#testimonials" className="block py-3 text-base font-medium transition-colors hover:text-foreground/80 mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Testimonials</Link>
            <Link href="/#reviews" className="block py-3 text-base font-medium transition-colors hover:text-foreground/80 mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Reviews</Link>
            <Link href="/messaging" className="block py-3 text-base font-medium transition-colors hover:text-foreground/80 mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Messaging</Link>
            <Button asChild className="w-full mobile-button">
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </Button>
            <a 
              href="https://github.com/riyadshauk/riyadshauk.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block py-3 text-base font-medium transition-colors hover:text-foreground/80 mobile-nav-item flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Source Code
            </a>
          </div>
        </div>
      )}
    </nav>
  );
} 