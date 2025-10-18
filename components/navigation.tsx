"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-[#1F2123] transition-all duration-200 ${
        isScrolled ? "bg-[#0B0B0B]/95 backdrop-blur-md" : "bg-[#0B0B0B]"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-[#EAEAEA] font-bold text-2xl font-serif tracking-wide text-foreground">
              PATCH
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/pricing"
                className={`text-sm transition-colors pb-1 ${
                  pathname === "/pricing"
                    ? "text-[#EAEAEA] font-medium border-b-2 border-[#3D7FFF]"
                    : "text-[#C9CDD1] hover:text-[#EAEAEA]"
                }`}
              >
                Pricing
              </Link>
              <Link
                href="/docs"
                className={`text-sm transition-colors pb-1 ${
                  pathname === "/docs"
                    ? "text-[#EAEAEA] font-medium border-b-2 border-[#3D7FFF]"
                    : "text-[#C9CDD1] hover:text-[#EAEAEA]"
                }`}
              >
                Docs
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex border-[#1F2123] bg-[#151719] text-[#C9CDD1] hover:bg-[#1F2123] hover:text-[#EAEAEA]"
            >
              <Link href="/upload">Upload SKUs</Link>
            </Button>
            <Button asChild size="sm" className="bg-[#3D7FFF] text-[#EAEAEA] hover:bg-[#3D7FFF]/90">
              <Link href="/upload">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
