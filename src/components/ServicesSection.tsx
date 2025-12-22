import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Globe, 
  CreditCard, 
  Building2, 
  Scale, 
  Landmark,
  ChevronRight
} from "lucide-react";

const services = [
  {
    id: "vasp-registration",
    icon: Globe,
    title: "VASP Registration",
    description: "Multi-jurisdictional licensing (UAE, Singapore, Hong Kong, and more)",
  },
  {
    id: "emi-payment",
    icon: CreditCard,
    title: "EMI & Payment Institution",
    description: "Electronic Money Institution and Payment Institution licensing in EU/UK",
  },
  {
    id: "msb-registration",
    icon: Landmark,
    title: "MSB Registration",
    description: "Money Services Business registration in US (FinCEN) and Canada (FINTRAC)",
  },
  {
    id: "legal-entity",
    icon: Building2,
    title: "Legal Entity Structuring",
    description: "Foundations, DAO wrappers, and SPV structures across jurisdictions",
  },
  {
    id: "mica-readiness",
    icon: Scale,
    title: "MiCA Readiness",
    description: "EU Markets in Crypto-Assets regulation compliance and authorization",
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Licenses & Registrations
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive licensing and registration services across 15+ jurisdictions worldwide.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group"
            >
              <Link to="/services">
                <div className="bg-card rounded-xl p-6 h-full border border-border/50 hover:border-accent/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
          >
            View All Services
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
