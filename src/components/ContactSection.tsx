import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Transform Compliance Into A Competitive Advantage
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Enterprise-grade compliance at startup speed. Begin your compliance journey today 
              with a free consultation.
            </p>

            {/* Process Steps */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left max-w-2xl mx-auto">
              {[
                { step: "1", text: "Free consultation within 24-48 hours" },
                { step: "2", text: "Complimentary gap assessment in 5 business days" },
                { step: "3", text: "Custom proposal within 1 week" },
                { step: "4", text: "Kickoff within 2 weeks of acceptance" },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <span className="text-accent font-bold">{item.step}</span>
                  </div>
                  <span className="text-foreground text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button variant="hero" size="lg" className="group" asChild>
                <a href="https://calendly.com/chioma-legum/30min" target="_blank" rel="noopener noreferrer">
                  Start Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
