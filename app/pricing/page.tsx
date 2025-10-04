import { Navigation } from "@/components/navigation"
import { PricingHeader } from "@/components/pricing-header"
import { PricingTiers } from "@/components/pricing-tiers"
import { PricingFAQ } from "@/components/pricing-faq"
import { Footer } from "@/components/footer"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <Navigation />
      <main>
        <PricingHeader />
        <PricingTiers />
        <PricingFAQ />
      </main>
      <Footer />
    </div>
  )
}
