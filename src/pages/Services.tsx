import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Globe, 
  Lock, 
  FileCheck, 
  Blocks, 
  Scale, 
  Fingerprint, 
  Server,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const services = {
  traditional: [
    {
      id: "iso-27001",
      icon: Shield,
      title: "ISO 27001",
      description: "International information security management system certification",
      details: [
        "Gap analysis and readiness assessment",
        "Policy and procedure development",
        "Risk assessment methodology",
        "Internal audit preparation",
        "Certification body liaison"
      ]
    },
    {
      id: "soc-2",
      icon: FileCheck,
      title: "SOC 2 Type I & II",
      description: "US standard for security, availability, and confidentiality",
      details: [
        "Trust Services Criteria mapping",
        "Control design and implementation",
        "Evidence collection automation",
        "Auditor coordination",
        "Continuous monitoring setup"
      ]
    },
    {
      id: "gdpr-ndpr",
      icon: Lock,
      title: "GDPR & NDPR",
      description: "EU and Nigerian data protection regulation compliance",
      details: [
        "Data mapping and inventory",
        "Privacy impact assessments",
        "Consent management frameworks",
        "Data subject rights processes",
        "Cross-border transfer mechanisms"
      ]
    },
    {
      id: "pci-dss",
      icon: Server,
      title: "PCI DSS",
      description: "Payment card industry data security standard",
      details: [
        "Scope reduction strategies",
        "Network segmentation review",
        "Cardholder data environment assessment",
        "Penetration testing coordination",
        "SAQ/ROC preparation"
      ]
    },
    {
      id: "vapt",
      icon: Fingerprint,
      title: "VAPT",
      description: "Vulnerability assessment & penetration testing",
      details: [
        "External and internal network testing",
        "Web application security testing",
        "Mobile application assessments",
        "Social engineering simulations",
        "Remediation guidance and retesting"
      ]
    },
    {
      id: "iso-22301",
      icon: FileCheck,
      title: "ISO 22301",
      description: "Business continuity management certification",
      details: [
        "Business impact analysis",
        "Recovery strategy development",
        "Crisis management planning",
        "Exercise and testing programs",
        "Continuous improvement processes"
      ]
    },
  ],
  web3: [
    {
      id: "mica-readiness",
      icon: Scale,
      title: "MiCA Readiness",
      description: "EU Markets in Crypto-Assets regulation compliance",
      details: [
        "Classification of crypto-assets",
        "Whitepaper requirements",
        "Governance arrangements",
        "Capital requirements assessment",
        "Marketing compliance"
      ]
    },
    {
      id: "vasp-registration",
      icon: Globe,
      title: "VASP Registration",
      description: "Multi-jurisdictional licensing (UAE, Singapore, Hong Kong)",
      details: [
        "Jurisdiction selection strategy",
        "Application documentation",
        "AML program development",
        "Regulatory liaison",
        "Ongoing compliance maintenance"
      ]
    },
    {
      id: "smart-contract-audits",
      icon: Blocks,
      title: "Smart Contract Audits",
      description: "Security audits for DeFi protocols and dApps",
      details: [
        "Static and dynamic analysis",
        "Logic and access control review",
        "Gas optimization recommendations",
        "Formal verification coordination",
        "Post-deployment monitoring"
      ]
    },
    {
      id: "aml-kyc",
      icon: Shield,
      title: "AML/KYC Programs",
      description: "Comprehensive anti-money laundering frameworks",
      details: [
        "Risk-based approach design",
        "Customer due diligence procedures",
        "Transaction monitoring systems",
        "Suspicious activity reporting",
        "Training and awareness programs"
      ]
    },
    {
      id: "token-compliance",
      icon: FileCheck,
      title: "Token Compliance",
      description: "Securities law compliance and Howey Test analysis",
      details: [
        "Token classification analysis",
        "Securities law assessment",
        "Exemption strategy development",
        "Offering documentation",
        "Secondary market considerations"
      ]
    },
    {
      id: "dao-governance",
      icon: Lock,
      title: "DAO Governance",
      description: "Legal entity structuring and governance frameworks",
      details: [
        "Legal wrapper selection",
        "Governance token design",
        "Voting mechanism implementation",
        "Treasury management frameworks",
        "Regulatory compliance strategy"
      ]
    },
  ],
};

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Comprehensive compliance solutions for both traditional enterprises and Web3 innovators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Traditional Compliance Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Enterprise Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Traditional Compliance
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.traditional.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border/50 hover:border-accent/30 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <service.icon className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Web3 & Blockchain Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Web3 Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Web3 & Blockchain
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.web3.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border/50 hover:border-accent/30 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <service.icon className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
