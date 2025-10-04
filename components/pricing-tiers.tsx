import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

export function PricingTiers() {
  const tiers = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "For small businesses tracking up to 50 SKUs",
      features: [
        "Up to 50 SKUs monitored",
        "Daily risk updates",
        "Email alerts",
        "Basic margin analysis",
        "7-day data history",
        "Email support",
      ],
      cta: "Start free trial",
      href: "/upload",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      description: "For growing businesses with complex supply chains",
      features: [
        "Up to 500 SKUs monitored",
        "Real-time risk updates",
        "SMS + Email alerts",
        "Advanced margin analysis",
        "90-day data history",
        "Scenario modeling",
        "API access",
        "Priority support",
      ],
      cta: "Start free trial",
      href: "/upload",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with dedicated needs",
      features: [
        "Unlimited SKUs",
        "Real-time risk updates",
        "Multi-channel alerts",
        "Custom margin models",
        "Unlimited data history",
        "Advanced scenario modeling",
        "Full API access",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
      ],
      cta: "Contact sales",
      href: "/contact",
      highlighted: false,
    },
  ]

  return (
    <section className="border-b border-[#1F2123] bg-[#0B0B0B] py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative border rounded-lg p-8 ${
                tier.highlighted
                  ? "border-[#3D7FFF] bg-[#111214] shadow-lg shadow-[#3D7FFF]/10"
                  : "border-[#1F2123] bg-[#111214]"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3D7FFF] text-[#EAEAEA] text-xs font-mono px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#EAEAEA] mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-bold text-[#EAEAEA] font-mono">{tier.price}</span>
                  <span className="text-[#C9CDD1] text-sm font-mono">{tier.period}</span>
                </div>
                <p className="text-sm text-[#C9CDD1] leading-relaxed">{tier.description}</p>
              </div>
              <Button
                asChild
                className={`w-full mb-6 ${
                  tier.highlighted
                    ? "bg-[#3D7FFF] text-[#EAEAEA] hover:bg-[#3D7FFF]/90"
                    : "bg-[#151719] text-[#EAEAEA] border border-[#1F2123] hover:bg-[#1F2123]"
                }`}
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00D26A] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#C9CDD1]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
