"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ConsoleNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)

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
            <Link href="/" className="font-mono text-[#EAEAEA] tracking-tight text-xl font-bold">
              PATCH
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/upload" className="text-sm text-[#C9CDD1] hover:text-[#EAEAEA] transition-colors">
                Upload
              </Link>
              <Link href="/console" className="text-sm text-[#EAEAEA] font-medium border-b-2 border-[#3D7FFF] pb-1">
                Console
              </Link>
              <Link href="/reports" className="text-sm text-[#C9CDD1] hover:text-[#EAEAEA] transition-colors">
                Reports
              </Link>
              <Link href="/settings" className="text-sm text-[#C9CDD1] hover:text-[#EAEAEA] transition-colors">
                Settings
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
              <Link href="/upload">Upload new SKUs</Link>
            </Button>
            <Avatar className="h-8 w-8 border border-[#1F2123]">
              <AvatarFallback className="bg-[#151719] text-[#EAEAEA] text-xs">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  )
}
