import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const packages = [
  {
    name: "Starter",
    subtitle: "Foundation Building",
    ideal: "Startups, small NGOs (2-30 employees)",
    timeline: "6-10 weeks",
    features: [
      "NDPR/GDPR gap analysis",
      "Compliance foundation assessment",
      "8+ core policies",
      "Risk assessment & data mapping",
      "Security awareness training",
      "Compliance roadmap",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    subtitle: "Scale Preparation",
    ideal: "SMEs, scale-ups (30-100 employees)",
    timeline: "2-3 months",
    features: [
      "Full NDPR & GDPR implementation",
      "25+ comprehensive policies",
      "Data Protection Impact Assessments",
      "Staff training programs",
      "Internal audit & gap remediation",
      "Certification readiness assessment",
    ],
    highlight: true,
  },
  {
    name: "Scale",
    subtitle: "Enterprise Readiness",
    ideal: "Established companies (100+ employees)",
    timeline: "4-8 months",
    features: [
      "Multi-framework compliance",
      "Full certification preparation",
      "30+ policies and procedures",
      "Quarterly health checks",
      "Business continuity planning",
      "Annual recertification support",
    ],
    highlight: false,
  },
];

export const PackagesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="packages" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Service Packages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Tailored to Your Growth Stage
          </h2>
          <p className="text-lg text-muted-foreground">
            From startups to enterprises—choose the package that matches your compliance journey.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative ${pkg.highlight ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full shadow-glow">
                  Most Popular
                </div>
              )}
              <div className={`bg-card rounded-2xl p-8 h-full border-2 transition-all duration-300 ${
                pkg.highlight 
                  ? 'border-accent shadow-xl shadow-accent/10' 
                  : 'border-border/50 hover:border-accent/30 shadow-lg'
              }`}>
                {/* Package Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground">{pkg.name}</h3>
                  <p className="text-accent font-semibold">{pkg.subtitle}</p>
                </div>

                {/* Ideal For */}
                <div className="mb-6 pb-6 border-b border-border/50">
                  <div className="text-sm text-muted-foreground mb-2">Ideal for:</div>
                  <div className="text-foreground font-medium">{pkg.ideal}</div>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full">
                    <span className="text-sm font-semibold text-accent">{pkg.timeline}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  variant={pkg.highlight ? "hero" : "outline"} 
                  className="w-full group"
                  asChild
                >
                  <a href="#contact">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-card px-6 py-4 rounded-xl border border-border/50 shadow-md">
            <span className="text-foreground font-semibold">Need Enterprise or Custom Solutions?</span>
            <Button variant="ghost" className="text-accent" asChild>
              <a href="#contact">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
