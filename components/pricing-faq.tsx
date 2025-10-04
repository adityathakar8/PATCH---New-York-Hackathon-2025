import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function PricingFAQ() {
  const faqs = [
    {
      question: "How does the free trial work?",
      answer:
        "All plans include a 14-day free trial with full access to features. No credit card required. Cancel anytime during the trial period.",
    },
    {
      question: "What counts as a SKU?",
      answer:
        "A SKU is any unique product or ingredient you want to monitor. This includes finished goods, raw materials, and components in your supply chain.",
    },
    {
      question: "Can I change plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, Amex) and ACH transfers for annual plans. Enterprise customers can arrange custom payment terms.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No setup fees for any plan. You only pay the monthly or annual subscription price. Enterprise plans include dedicated onboarding at no extra cost.",
    },
    {
      question: "What happens if I exceed my SKU limit?",
      answer:
        "We'll notify you when you approach your limit. You can upgrade to a higher tier or contact us to discuss custom pricing for your needs.",
    },
  ]

  return (
    <section className="border-b border-[#1F2123] bg-[#0B0B0B] py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#EAEAEA] mb-8 text-center">Pricing FAQ</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-[#1F2123] bg-[#111214] rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-[#EAEAEA] hover:text-[#3D7FFF] hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#C9CDD1] leading-relaxed pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
