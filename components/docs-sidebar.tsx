"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

export function DocsSidebar() {
  const [openSections, setOpenSections] = useState<string[]>(["getting-started"])

  const toggleSection = (section: string) => {
    setOpenSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "#introduction" },
        { title: "Quick Start", href: "#quick-start" },
        { title: "Upload Your Data", href: "#upload-data" },
        { title: "Understanding Risks", href: "#understanding-risks" },
      ],
    },
    {
      id: "features",
      title: "Features",
      items: [
        { title: "Risk Monitoring", href: "#risk-monitoring" },
        { title: "Margin Analysis", href: "#margin-analysis" },
        { title: "Scenario Modeling", href: "#scenario-modeling" },
        { title: "Alerts & Notifications", href: "#alerts" },
      ],
    },
    {
      id: "api",
      title: "API Reference",
      items: [
        { title: "Authentication", href: "#authentication" },
        { title: "Endpoints", href: "#endpoints" },
        { title: "Rate Limits", href: "#rate-limits" },
        { title: "Webhooks", href: "#webhooks" },
      ],
    },
    {
      id: "integrations",
      title: "Integrations",
      items: [
        { title: "Google Sheets", href: "#google-sheets" },
        { title: "Slack", href: "#slack" },
        { title: "ERP Systems", href: "#erp-systems" },
      ],
    },
  ]

  return (
    <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto">
      <nav className="space-y-1">
        {sections.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-[#EAEAEA] hover:bg-[#111214] rounded transition-colors"
            >
              {section.title}
              <ChevronRight
                className={`w-4 h-4 transition-transform ${openSections.includes(section.id) ? "rotate-90" : ""}`}
              />
            </button>
            {openSections.includes(section.id) && (
              <div className="ml-4 mt-1 space-y-1">
                {section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 text-sm text-[#C9CDD1] hover:text-[#EAEAEA] hover:bg-[#111214] rounded transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
