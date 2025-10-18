import { MiniTicker } from "@/components/mini-ticker"

export function UploadHeader() {
  return (
    <section className="border-b border-[#1F2123] bg-[#111214]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#EAEAEA] mb-4 text-balance">
            Upload your SKUs & Website Link
          </h1>
          <p className="text-lg text-[#C9CDD1] text-balance">
            We'll map your products to their ingredients, scan global macroeconomic risks, and forecast the impact on
            your margins.
          </p>
        </div>
      </div>
      <MiniTicker />
    </section>
  )
}
