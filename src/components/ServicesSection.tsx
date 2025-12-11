import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Shield, 
  Globe, 
  Lock, 
  FileCheck, 
  Blocks, 
  Scale, 
  Fingerprint, 
  Server,
  ChevronRight
} from "lucide-react";

const services = {
  traditional: [
    {
      icon: Shield,
      title: "ISO 27001",
      description: "International information security management system certification",
    },
    {
      icon: FileCheck,
      title: "SOC 2 Type I & II",
      description: "US standard for security, availability, and confidentiality",
    },
    {
      icon: Lock,
      title: "GDPR & NDPR",
      description: "EU and Nigerian data protection regulation compliance",
    },
    {
      icon: Server,
      title: "PCI DSS",
      description: "Payment card industry data security standard",
    },
    {
      icon: Fingerprint,
      title: "VAPT",
      description: "Vulnerability assessment & penetration testing",
    },
    {
      icon: FileCheck,
      title: "ISO 22301",
      description: "Business continuity management certification",
    },
  ],
  web3: [
    {
      icon: Scale,
      title: "MiCA Readiness",
      description: "EU Markets in Crypto-Assets regulation compliance",
    },
    {
      icon: Globe,
      title: "VASP Registration",
      description: "Multi-jurisdictional licensing (UAE, Singapore, Hong Kong)",
    },
    {
      icon: Blocks,
      title: "Smart Contract Audits",
      description: "Security audits for DeFi protocols and dApps",
    },
    {
      icon: Shield,
      title: "AML/KYC Programs",
      description: "Comprehensive anti-money laundering frameworks",
    },
    {
      icon: FileCheck,
      title: "Token Compliance",
      description: "Securities law compliance and Howey Test analysis",
    },
    {
      icon: Lock,
      title: "DAO Governance",
      description: "Legal entity structuring and governance frameworks",
    },
  ],
};

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"traditional" | "web3">("traditional");

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
            Comprehensive Service Portfolio
          </h2>
          <p className="text-lg text-muted-foreground">
            Dual expertise in traditional compliance frameworks and cutting-edge Web3 regulatory solutions.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-card rounded-xl p-1.5 shadow-md border border-border/50">
            <button
              onClick={() => setActiveTab("traditional")}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                activeTab === "traditional"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Traditional Compliance
            </button>
            <button
              onClick={() => setActiveTab("web3")}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                activeTab === "web3"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Web3 & Blockchain
            </button>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services[activeTab].map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group"
            >
              <div className="bg-card rounded-xl p-6 h-full border border-border/50 hover:border-accent/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span className="text-accent font-semibold">"Legum makes both Accessible, Affordable, and Achievable"</span>
            <br />
            Multi-jurisdictional coverage: North America, Europe, Asia-Pacific, and Africa.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
