import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#0B0B0B] border-t border-[#1F2123]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm">
            <Link href="#docs" className="text-[#C9CDD1] hover:text-[#EAEAEA] transition-colors">
              Docs
            </Link>
            <Link href="#privacy" className="text-[#C9CDD1] hover:text-[#EAEAEA] transition-colors">
              Privacy
            </Link>
            <Link href="#terms" className="text-[#C9CDD1] hover:text-[#EAEAEA] transition-colors">
              Terms
            </Link>
            <Link href="#contact" className="text-[#C9CDD1] hover:text-[#EAEAEA] transition-colors">
              Contact
            </Link>
          </div>
          <div className="text-sm text-[#C9CDD1] text-center md:text-right">
            <p className="font-mono">© PATCH</p>
            <p className="text-xs mt-1">A simplified Bloomberg-style console for product-based SMBs.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
