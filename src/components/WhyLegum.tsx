import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Award, 
  Target, 
  Users, 
  Wallet, 
  MapPin, 
  HeartHandshake 
} from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Proven Track Record",
    points: [
      "85%+ first-time certification success rate",
      "40+ certifications delivered",
      "100% client retention for ongoing support",
      "8+ years implementing security systems",
    ],
  },
  {
    icon: Target,
    title: "Business-Focused Approach",
    points: [
      "Actionable solutions enabling growth",
      "Proven templates and automation",
      "Thorough audit preparation",
      "We stand behind our work",
    ],
  },
  {
    icon: Users,
    title: "Hybrid Legal + Technical",
    points: [
      "ISO 27001 Lead Auditors",
      "CISSP & OSCP certified engineers",
      "CIPP/E & NDPR certified lawyers",
      "Full-spectrum expertise",
    ],
  },
  {
    icon: Wallet,
    title: "Cost Efficiency",
    points: [
      "40-60% lower than international firms",
      "Same standards and quality",
      "Transparent pricing, no hidden fees",
      "Fixed-price engagements",
    ],
  },
  {
    icon: MapPin,
    title: "Local Expertise, Global Standards",
    points: [
      "Deep African regulatory knowledge",
      "NITDA, CBN, NDPR experience",
      "Same time zone, in-person meetings",
      "Global regulator relationships",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Partnership Beyond Certification",
    points: [
      "Ongoing support in all packages",
      "Quarterly compliance health checks",
      "Annual recertification support",
      "Knowledge transfer to your team",
    ],
  },
];

export const WhyLegum = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-legum" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Why Businesses Choose Legum
          </h2>
          <p className="text-lg text-muted-foreground">
            Enterprise-grade compliance at startup speed. 1-6 months to certification 
            versus 12-18 months industry standard.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-8 h-full border border-border/50 hover:border-accent/30 shadow-md hover:shadow-xl transition-all duration-300">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:shadow-glow transition-all duration-300">
                    <reason.icon className="h-6 w-6 text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{reason.title}</h3>
                </div>

                {/* Points */}
                <ul className="space-y-3">
                  {reason.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
