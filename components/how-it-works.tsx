import Link from "next/link"
import { Upload, Search, Zap } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description: "Drop in your business doc and SKU sheet.",
  },
  {
    icon: Search,
    title: "We Research",
    description: "AI maps ingredients and scans global risks.",
  },
  {
    icon: Zap,
    title: "You Act",
    description: "Dashboard ranks risky SKUs and suggests next steps.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-[#1F2123] bg-[#0B0B0B]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#EAEAEA] text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#111214] border border-[#1F2123] flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-[#3D7FFF]" />
                </div>
                <h3 className="text-xl font-semibold text-[#EAEAEA] mb-2">{step.title}</h3>
                <p className="text-sm text-[#C9CDD1] leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[1px] bg-[#1F2123]" />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/upload" className="text-sm text-[#3D7FFF] hover:underline">
            See the Upload format →
          </Link>
        </div>
      </div>
    </section>
  )
}
