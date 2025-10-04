import { Navigation } from "@/components/navigation"
import { UploadHeader } from "@/components/upload-header"
import { UploadInterface } from "@/components/upload-interface"
import { PrivacyNote } from "@/components/privacy-note"
import { Footer } from "@/components/footer"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <Navigation />
      <UploadHeader />
      <UploadInterface />
      <PrivacyNote />
      <Footer />
    </div>
  )
}
