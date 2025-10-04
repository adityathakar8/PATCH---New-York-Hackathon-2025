import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What data do I need to start?",
    answer: "A simple CSV with SKUs, cost, price, source country, margins.",
  },
  {
    question: "Is my data private?",
    answer: "We store only what you upload, keep it encrypted, and you can export or delete anytime.",
  },
  {
    question: "Do I need live integrations?",
    answer: "No. Start with a file; connect Sheets later.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="border-b border-[#1F2123] bg-[#0B0B0B]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#EAEAEA] text-center mb-12">FAQ</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#111214] border border-[#1F2123] rounded-lg px-6 data-[state=open]:border-[#3D7FFF]/30"
              >
                <AccordionTrigger className="text-left text-[#EAEAEA] hover:text-[#3D7FFF] hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#C9CDD1] pb-4 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
