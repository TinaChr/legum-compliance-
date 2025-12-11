import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Clock, Linkedin, ArrowRight, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Transform Compliance Into A Competitive Advantage
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Enterprise-grade compliance at startup speed. Begin your compliance journey today 
              with a free consultation.
            </p>

            {/* Process Steps */}
            <div className="space-y-4 mb-8">
              {[
                { step: "1", text: "Free consultation within 24-48 hours" },
                { step: "2", text: "Complimentary gap assessment in 5 business days" },
                { step: "3", text: "Custom proposal within 1 week" },
                { step: "4", text: "Kickoff within 2 weeks of acceptance" },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <span className="text-accent font-bold">{item.step}</span>
                  </div>
                  <span className="text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="group" asChild>
              <a href="mailto:compliance@legum.com.ng">
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-2xl p-8 shadow-xl border border-border/50 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-accent">
                  <Shield className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Legum Compliance</h3>
                  <p className="text-muted-foreground text-sm">Your Compliance Partner</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Email */}
                <a
                  href="mailto:compliance@legum.com.ng"
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-accent/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Email</div>
                    <div className="text-foreground font-medium">compliance@legum.com.ng</div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/company/legum-limited"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-accent/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20">
                    <Linkedin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">LinkedIn</div>
                    <div className="text-foreground font-medium">legum-limited</div>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Office</div>
                    <div className="text-foreground font-medium">
                      No. 5 Kwaji Close, Maitama
                      <br />
                      Abuja, Nigeria
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Business Hours</div>
                    <div className="text-foreground font-medium">
                      Monday - Friday
                      <br />
                      9:00 AM - 6:00 PM WAT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
