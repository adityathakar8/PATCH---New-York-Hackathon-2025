import { Radar, FileCheck, TrendingUp, MessageSquare } from "lucide-react"

const props = [
  {
    icon: Radar,
    title: "Ingredient-level Radar",
    description: "Tie world events directly to the ingredients inside your products.",
  },
  {
    icon: FileCheck,
    title: "Evidence-Backed Signals",
    description: "Every alert includes sources you can verify.",
  },
  {
    icon: TrendingUp,
    title: "Margin & Cashflow Forecasts",
    description: "See COGS shocks and margin deltas before they land.",
  },
  {
    icon: MessageSquare,
    title: "Ask the Analyst",
    description: "A built-in copilot for alternatives, what-ifs, and timing.",
  },
]

export function ValueProps() {
  return (
    <section className="border-b border-[#1F2123] bg-[#0B0B0B]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map((prop, index) => (
            <div
              key={index}
              className="bg-[#111214] border border-[#1F2123] rounded-lg p-6 hover:border-[#3D7FFF]/30 transition-colors"
            >
              <prop.icon className="w-8 h-8 text-[#3D7FFF] mb-4" />
              <h3 className="text-lg font-semibold text-[#EAEAEA] mb-2">{prop.title}</h3>
              <p className="text-sm text-[#C9CDD1] leading-relaxed">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
