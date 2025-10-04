import { Code } from "lucide-react"

export function DocsContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <div className="space-y-12">
        {/* Introduction */}
        <section id="introduction" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#EAEAEA] mb-4">Introduction</h2>
          <p className="text-[#C9CDD1] leading-relaxed mb-4">
            PATCH is a risk monitoring platform designed for product-based SMBs. We help you track ingredient-level
            risks, price shocks, and margin impacts in real-time, so you can make informed decisions about your supply
            chain.
          </p>
          <p className="text-[#C9CDD1] leading-relaxed">
            This documentation will guide you through setting up your account, uploading your SKU data, and using the
            console to monitor risks and analyze scenarios.
          </p>
        </section>

        {/* Quick Start */}
        <section id="quick-start" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#EAEAEA] mb-4">Quick Start</h2>
          <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-6 mb-4">
            <h3 className="text-xl font-bold text-[#EAEAEA] mb-3">Step 1: Create an account</h3>
            <p className="text-[#C9CDD1] leading-relaxed mb-4">
              Sign up for a free trial at{" "}
              <a href="/upload" className="text-[#3D7FFF] hover:underline">
                patch.app/upload
              </a>
              . No credit card required.
            </p>
          </div>
          <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-6 mb-4">
            <h3 className="text-xl font-bold text-[#EAEAEA] mb-3">Step 2: Upload your SKU data</h3>
            <p className="text-[#C9CDD1] leading-relaxed mb-4">
              Prepare a CSV or Excel file with your SKU information including product names, ingredients, costs, and
              margins. Upload it through the console.
            </p>
          </div>
          <div className="bg-[#111214] border border-[#1F2123] rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#EAEAEA] mb-3">Step 3: Start monitoring</h3>
            <p className="text-[#C9CDD1] leading-relaxed">
              Once your data is uploaded, PATCH will begin monitoring ingredient prices, supply chain risks, and margin
              impacts. You'll receive alerts when significant changes occur.
            </p>
          </div>
        </section>

        {/* Upload Data */}
        <section id="upload-data" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#EAEAEA] mb-4">Upload Your Data</h2>
          <p className="text-[#C9CDD1] leading-relaxed mb-4">
            PATCH accepts CSV and Excel files with the following required columns:
          </p>
          <div className="bg-[#0B0B0B] border border-[#1F2123] rounded-lg p-4 mb-4 font-mono text-sm">
            <div className="text-[#00D26A]">Required columns:</div>
            <ul className="text-[#C9CDD1] mt-2 space-y-1">
              <li>• SKU_ID (unique identifier)</li>
              <li>• Product_Name</li>
              <li>• Ingredients (comma-separated)</li>
              <li>• COGS (cost of goods sold)</li>
              <li>• Selling_Price</li>
            </ul>
          </div>
          <p className="text-[#C9CDD1] leading-relaxed">
            Optional columns include supplier information, lead times, and historical pricing data.
          </p>
        </section>

        {/* Understanding Risks */}
        <section id="understanding-risks" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#EAEAEA] mb-4">Understanding Risks</h2>
          <p className="text-[#C9CDD1] leading-relaxed mb-4">PATCH monitors three types of risks:</p>
          <div className="space-y-4">
            <div className="bg-[#111214] border-l-4 border-[#FF4757] p-4">
              <h3 className="text-lg font-bold text-[#EAEAEA] mb-2">High Risk</h3>
              <p className="text-[#C9CDD1] text-sm">
                Significant price increases ({">"} 15%) or supply disruptions that could impact margins by more than 5%.
              </p>
            </div>
            <div className="bg-[#111214] border-l-4 border-[#FFA502] p-4">
              <h3 className="text-lg font-bold text-[#EAEAEA] mb-2">Medium Risk</h3>
              <p className="text-[#C9CDD1] text-sm">
                Moderate price changes (5-15%) or potential supply issues that warrant monitoring.
              </p>
            </div>
            <div className="bg-[#111214] border-l-4 border-[#00D26A] p-4">
              <h3 className="text-lg font-bold text-[#EAEAEA] mb-2">Low Risk</h3>
              <p className="text-[#C9CDD1] text-sm">
                Stable pricing and supply conditions with minimal impact on margins.
              </p>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section id="authentication" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#EAEAEA] mb-4">API Authentication</h2>
          <p className="text-[#C9CDD1] leading-relaxed mb-4">
            All API requests require authentication using an API key. You can generate API keys from the Settings page.
          </p>
          <div className="bg-[#0B0B0B] border border-[#1F2123] rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-4 h-4 text-[#3D7FFF]" />
              <span className="text-xs font-mono text-[#C9CDD1]">Example Request</span>
            </div>
            <pre className="text-sm font-mono text-[#EAEAEA] overflow-x-auto">
              {`curl -X GET https://api.patch.app/v1/risks \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
            </pre>
          </div>
        </section>
      </div>
    </article>
  )
}
