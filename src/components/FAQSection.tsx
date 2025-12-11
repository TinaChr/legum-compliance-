import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can you help with industry-specific compliance?",
    answer: "Yes! We provide specialized support for telecommunications (NITDA guidelines), financial services (CBN regulations), healthcare (PHI handling), government contractors, and comprehensive Web3/blockchain compliance.",
  },
  {
    question: "How do you handle Web3 regulatory uncertainty?",
    answer: "We provide conservative compliance strategies that protect you under multiple regulatory scenarios, continuous regulatory monitoring, established regulator relationships, and multi-jurisdictional structuring to optimize positioning.",
  },
  {
    question: "Do you support organizations outside Nigeria?",
    answer: "Yes. While our headquarters is in Abuja, Nigeria, we serve African organizations across West, East, and Southern Africa; global Web3 organizations; international companies entering African markets; and organizations requiring compliance across North America, Europe, and Asia-Pacific.",
  },
  {
    question: "What if regulations change after implementation?",
    answer: "Our packages include ongoing support: quarterly compliance health checks, annual recertification support, regulatory monitoring across jurisdictions, and adaptive guidance for new requirements.",
  },
  {
    question: "Are you accredited to issue certifications?",
    answer: "No. We are compliance consultants, not a certification body. We prepare your organization for certification and partner with internationally accredited certification bodies (ISO) or CPA firms (SOC 2) for independent audits. This ensures audit integrity and credibility.",
  },
  {
    question: "How quickly can we get started?",
    answer: "Immediately! Free consultation within 24-48 hours, complimentary gap assessment in 5 business days, custom proposal within 1 week, and kickoff within 2 weeks of acceptance.",
  },
];

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Get answers to common questions about our compliance services.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div
                className={`bg-card rounded-xl border border-border/50 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'shadow-lg border-accent/30' : 'shadow-sm hover:shadow-md'
                }`}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-accent shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
