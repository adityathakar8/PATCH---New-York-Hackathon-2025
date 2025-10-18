import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ticker } from "@/components/ticker"

export function HeroSection() {
  return (
    <section className="relative border-b border-[#1F2123]">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#EAEAEA 1px, transparent 1px), linear-gradient(90deg, #EAEAEA 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#EAEAEA] leading-tight mb-6 text-balance">
            We save your Product based Business from going extinct..
          </h1>
          <p className="text-lg sm:text-xl text-[#C9CDD1] leading-relaxed mb-10 max-w-3xl mx-auto text-pretty">
            Our Autonomous AI maps ingredients, scans global risks, and forecasts, what it means for your margin and
            cashflow — before it's too late to adapt.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-[#3D7FFF] text-[#EAEAEA] hover:bg-[#3D7FFF]/90 w-full sm:w-auto">
              <Link href="/console">Launch Console</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#1F2123] bg-[#151719] text-[#C9CDD1] hover:bg-[#1F2123] hover:text-[#EAEAEA] w-full sm:w-auto"
            >
              <Link href="/upload">Upload SKUs</Link>
            </Button>
          </div>
        </div>
      </div>
      <Ticker />
    </section>
  )
}
