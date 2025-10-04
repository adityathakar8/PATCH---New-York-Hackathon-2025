import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ValueProps } from "@/components/value-props"
import { HowItWorks } from "@/components/how-it-works"
import { ConsolePreview } from "@/components/console-preview"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <Navigation />
      <main>
        <HeroSection />
        <ValueProps />
        <HowItWorks />
        <ConsolePreview />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
