import { Navigation } from "@/components/navigation"
import { DocsHeader } from "@/components/docs-header"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsContent } from "@/components/docs-content"
import { Footer } from "@/components/footer"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <Navigation />
      <div className="border-b border-[#1F2123]">
        <DocsHeader />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <DocsSidebar />
          <DocsContent />
        </div>
      </div>
      <Footer />
    </div>
  )
}
