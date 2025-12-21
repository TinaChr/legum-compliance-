import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, FileText, ClipboardCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServicesSidebar } from "@/components/ServicesSidebar";
import { ServicesMobileNav } from "@/components/ServicesMobileNav";
import { Button } from "@/components/ui/button";
import { serviceToDocumentMapping } from "@/data/serviceDocumentMapping";

// Import service images
import ismsImage from "@/assets/services/isms.jpg";
import dataProtectionImage from "@/assets/services/data-protection.jpg";
import industrySpecificImage from "@/assets/services/industry-specific.jpg";
import cybersecurityImage from "@/assets/services/cybersecurity.jpg";
import web3RegulatoryImage from "@/assets/services/web3-regulatory.jpg";
import amlKycImage from "@/assets/services/aml-kyc.jpg";
import tokenGovernanceImage from "@/assets/services/token-governance.jpg";
import corporateGovernanceImage from "@/assets/services/corporate-governance.jpg";
import esgImage from "@/assets/services/esg.jpg";
import trainingAdvisoryImage from "@/assets/services/training-advisory.jpg";

const serviceCategories = [
  {
    id: "isms",
    title: "Information Security Management Systems",
    image: ismsImage,
    services: [
      {
        id: "iso-27001",
        title: "ISO 27001 (International Standard)",
        details: [
          "ISMS scope definition and comprehensive risk assessment",
          "25+ security policies and Statement of Applicability",
          "Internal audit programs and management review processes",
          "Certification audit coordination with accredited bodies",
          "Control environment design (preventive, detective, corrective)"
        ]
      },
      {
        id: "soc-2",
        title: "SOC 2 Type I & II (US Standard)",
        details: [
          "Gap analysis against SOC2 Trust Service Criteria",
          "Information Security Management System (ISMS) development",
          "Risk assessment frameworks and vendor management programs",
          "Evidence collection and readiness for CPA firm audits",
          "Due diligence and ongoing monitoring programs"
        ]
      },
      {
        id: "nist",
        title: "NIST Cybersecurity Framework",
        details: [
          "Maturity assessments and gap analysis",
          "Prioritized roadmaps with control mapping to NIST functions",
          "Pragmatic implementation of high-impact controls",
          "Ideal for government contractors and regulated industries"
        ]
      },
      {
        id: "iso-22301",
        title: "ISO 22301 (Business Continuity)",
        details: [
          "Business Impact Analysis (BIA) and recovery strategies",
          "Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO)",
          "Tabletop exercises and disaster recovery drills",
          "Critical for infrastructure, financial services, telecommunications, healthcare"
        ]
      }
    ]
  },
  {
    id: "data-protection",
    title: "Data Protection & Privacy Compliance",
    image: dataProtectionImage,
    services: [
      {
        id: "gdpr",
        title: "GDPR (EU General Data Protection Regulation)",
        description: "Comprehensive data protection law for organizations processing EU residents' personal data.",
        details: [
          "Complete GDPR audits and compliance assessments",
          "Data Protection Impact Assessments (DPIAs)",
          "Privacy policies and data processing agreements",
          "Cross-border transfer mechanisms (SCCs, BCRs)",
          "Data mapping of personal information flows (on-chain, off-chain, third-party)",
          "Legal basis assessment for processing activities",
          "Rights management systems (access, erasure, portability)",
          "72-hour breach notification protocols"
        ]
      },
      {
        id: "ndpr",
        title: "NDPR (Nigeria Data Protection Regulation)",
        description: "Nigeria's principal data protection law administered by NITDA.",
        details: [
          "NDPR audits aligned with NITDA requirements",
          "Data Protection Compliance Organization (DPCO) designation",
          "Nigerian context privacy policies and procedures",
          "Annual audit preparation and NITDA reporting",
          "Breach notification protocols (72-hour requirement)",
          "Direct experience with NITDA audits and practical Nigerian operations"
        ]
      },
      {
        id: "ccpa",
        title: "CCPA (California Consumer Privacy Act) Compliance",
        description: "Adhering to California's landmark consumer privacy legislation.",
        details: [
          "Assessments against CCPA/CPRA requirements",
          "Data subject access request (DSAR) processes",
          '"Do Not Sell My Personal Information" implementation'
        ]
      },
      {
        id: "pipeda",
        title: "PIPEDA (Canada) Compliance",
        description: "Meeting Canada's Federal private sector privacy law standards.",
        details: [
          "Gap analysis against PIPEDA principles",
          "Consent management and data handling policies",
          "Breach notification protocols for Canadian data"
        ]
      },
      {
        id: "popia",
        title: "POPIA (South Africa) Compliance",
        description: "Navigating South Africa's Protection of Personal Information Act.",
        details: [
          "POPIA readiness assessments",
          "Information officer designation support",
          "Cross-border transfer rules and exemptions"
        ]
      },
      {
        id: "multi-jurisdictional",
        title: "Other Multi-Jurisdictional Privacy Frameworks",
        description: "Expertise in a broad spectrum of global data privacy regulations.",
        details: [
          "LGPD (Brazil)",
          "PDPA (Singapore and other jurisdictions)",
          "Emerging frameworks across Africa and Asia-Pacific",
          "Data residency requirements for serving international customers"
        ]
      },
      {
        id: "blockchain-privacy",
        title: "Blockchain-Specific Privacy",
        details: [
          "On-chain data minimization strategies limiting personal data exposure",
          "Blockchain privacy design using zero-knowledge proofs and confidential transactions",
          "Pseudonymization techniques for blockchain records",
          'GDPR "right to erasure" solutions for immutable blockchain records',
          "Privacy-preserving smart contract design"
        ]
      }
    ]
  },
  {
    id: "industry-specific",
    title: "Industry-Specific Compliance",
    image: industrySpecificImage,
    services: [
      {
        id: "pci-dss",
        title: "PCI DSS (Payment Card Industry Data Security Standard)",
        details: [
          "Scoping analysis based on transaction volume and data handling",
          "Network segmentation and encryption implementation",
          "Vulnerability scanning and penetration testing",
          "Quarterly compliance validation and reporting",
          "WAF deployment and logging infrastructure"
        ]
      },
      {
        id: "hitrust",
        title: "HITRUST CSF (Common Security Framework)",
        details: [
          "Essential for healthcare providers, health-tech platforms, health insurers",
          "Vendors handling Protected Health Information (PHI) targeting US market",
          "Readiness assessments and control implementation",
          "Evidence collection for HITRUST-validated assessors",
          "Certified status coordination"
        ]
      },
      {
        id: "financial-ng",
        title: "Financial Services Compliance (NG)",
        details: [
          "Central Bank of Nigeria (CBN) regulations",
          "Payment processor security requirements",
          "Investment platform compliance",
          "Banking and fintech security standards"
        ]
      },
      {
        id: "telecom-ng",
        title: "Telecommunications Compliance (NG)",
        details: [
          "NITDA guidelines for telecommunications operators",
          "Infrastructure security and resilience",
          "Service availability and incident response"
        ]
      }
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Technical Compliance",
    image: cybersecurityImage,
    services: [
      {
        id: "vapt",
        title: "Vulnerability Assessment & Penetration Testing (VAPT)",
        details: [
          "OSCP-certified penetration testers",
          "Using industry-standard tools",
          "External network, web application, internal network, and API security testing",
          "Remediation validation and retesting to ensure persistent security"
        ]
      },
      {
        id: "smart-contract-security",
        title: "Smart Contract Security",
        details: [
          "Multi-firm audit coordination for critical protocols",
          "Vulnerability classification and prioritization for effective remediation",
          "Formal verification of contract correctness and economic security review",
          "Specialized blockchain-specific security testing"
        ]
      },
      {
        id: "security-operations",
        title: "Security Operations & Monitoring",
        details: [
          "Security Incident and Event Management (SIEM) implementation",
          "Advanced threat detection and rapid response procedures",
          "Expert security operations center (SOC) design",
          "Comprehensive incident response planning and tabletop exercises"
        ]
      }
    ]
  },
  {
    id: "web3-regulatory",
    title: "Web3 Regulatory & Licensing Compliance",
    image: web3RegulatoryImage,
    services: [
      {
        id: "mica-readiness",
        title: "MiCA Readiness (EU Markets in Crypto-Assets Regulation)",
        details: [
          "Comprehensive gap analysis against MiCA requirements",
          "White paper preparation meeting MiCA disclosure standards",
          "Authorization preparation for significant tokens",
          "Ongoing compliance monitoring and regulatory updates"
        ]
      },
      {
        id: "vasp-registration",
        title: "VASP Registration (Virtual Asset Service Provider)",
        description: "Registration services for FATF-aligned jurisdictions:",
        details: [
          "UAE (VARA, FSRA Dubai, ADGM)",
          "Singapore (MAS licensing)",
          "Hong Kong (VASP licensing)",
          "South Korea (Virtual Asset Business registration)",
          "Other emerging crypto hubs"
        ]
      },
      {
        id: "msb-registration",
        title: "MSB Registration (Money Services Business)",
        details: [
          "FinCEN registration in the United States",
          "State-by-state money transmitter licenses",
          "FINTRAC registration in Canada",
          "Compliance program development for MSB operations"
        ]
      },
      {
        id: "emi-licensing",
        title: "EMI & Payment Institution Licensing (EU)",
        details: [
          "Electronic Money Institution licensing",
          "Payment Institution authorization",
          "Essential for stablecoin issuers and payment services"
        ]
      },
      {
        id: "legal-entity",
        title: "Legal Entity Structuring",
        details: [
          "DAO legal wrappers (foundations, associations, cooperatives)",
          "Foundation setups (Switzerland, Cayman, BVI, Panama)",
          "Special Purpose Vehicle (SPV) structures",
          "Multi-jurisdictional architecture for global operations"
        ]
      }
    ]
  },
  {
    id: "aml-kyc",
    title: "AML/KYC & Financial Crime Prevention",
    image: amlKycImage,
    services: [
      {
        id: "aml-program",
        title: "AML/CTF Program Design & Implementation",
        details: [
          "Comprehensive AML/CTF policy manuals tailored to business models",
          "Risk-based approach documentation meeting FATF standards",
          "Transaction monitoring rule design for crypto-specific typologies",
          "Governance structure and Three Lines of Defense model",
          "Independent audit and testing programs to ensure compliance"
        ]
      },
      {
        id: "kyc-cdd",
        title: "KYC/CDD Infrastructure",
        details: [
          "Identity verification vendors election and seamless integration",
          "Beneficial ownership identification (UBO detection) for transparency",
          "PEP (Politically Exposed Persons) screening workflows",
          "Robust sanctions and adverse media screening processes",
          "Enhanced due diligence (EDD) for high-risk customers",
          "Ongoing customer due diligence and periodic reviews"
        ]
      },
      {
        id: "transaction-monitoring",
        title: "Transaction Monitoring & Reporting",
        details: [
          "Blockchain analytics tool integration (e.g., Chainalysis, Elliptic, TRM Labs)",
          "Suspicious activity detection scenarios for crypto mixing, layering, and structuring",
          "SAR/STR (Suspicious Activity Report/Suspicious Transaction Report) filing procedures",
          "Real-time monitoring and alert management systems"
        ]
      },
      {
        id: "sanctions-compliance",
        title: "Sanctions Compliance",
        details: [
          "UN, EU, and multi-jurisdictional sanctions list monitoring",
          "Wallet address screening against sanctioned entities (e.g., Tornado Cash, North Korea)",
          "Geographic IP blocking controls and VPN detection",
          "Typology development for emerging financial crime threats",
          "Real-time sanctions list updates and retroactive screening"
        ]
      }
    ]
  },
  {
    id: "token-governance",
    title: "Token Issuance & Governance Compliance",
    image: tokenGovernanceImage,
    services: [
      {
        id: "whitepaper-review",
        title: "Whitepaper Legal Review",
        details: [
          "Comprehensive risk disclosure standards for volatility, regulatory uncertainty, technology risks",
          "Forward-looking statement disclaimers and safe harbor language",
          "Misrepresentation prevention and accuracy verification",
          "Regulatory compliance representation review",
          "Jurisdictional disclaimers and offering restrictions"
        ]
      },
      {
        id: "tokenomics-compliance",
        title: "Tokenomics Compliance Review",
        details: [
          "Distribution mechanism analysis for fairness, transparency, and regulatory implications",
          "Vesting and lock-up compliance with securities law requirements",
          "Token utility analysis and secondary market considerations",
          "Supply mechanics and inflationary/deflationary model review",
          "Airdrop and incentive program structuring"
        ]
      },
      {
        id: "securities-law",
        title: "Securities Law Compliance",
        details: [
          "Howey Test application and investment contract analysis, focusing on U.S. (SEC) and EU regulations",
          "Exemption strategies: Regulation D (506(b), 506(c)), Regulation S, Regulation Crowdfunding (Reg CF), Regulation A+",
          "Multi-jurisdictional securities law navigation for global offerings"
        ]
      },
      {
        id: "dao-governance",
        title: "DAO Governance Structuring",
        details: [
          "Legal entity integration to create liability shields for DAO participants",
          "Foundation establishment (Swiss, Cayman, Marshall Islands)",
          "Governance token compliance and securities risk assessment",
          "Voting mechanisms and proposal systems design",
          "Treasury management, multi-signature controls, and contributor agreements",
          "Decentralization pathway planning for regulatory compliance"
        ]
      }
    ]
  },
  {
    id: "corporate-governance",
    title: "Corporate Governance & Risk Management",
    image: corporateGovernanceImage,
    services: [
      {
        id: "internal-compliance",
        title: "Internal Compliance",
        details: [
          "Three Lines of Defense model implementation",
          "Comprehensive compliance manual and code of conduct",
          "Control environment design (preventive, detective, corrective controls)",
          "Policy management system and version control",
          "Compliance testing and monitoring programs",
          "Issue management and corrective action tracking"
        ]
      },
      {
        id: "board-governance",
        title: "Board and Governance Policy",
        details: [
          "Board charter and committee structures",
          "Delegation of authority framework and approval matrices",
          "Conflict of interest policies and related party transactions",
          "Board reporting standards with compliance dashboards",
          "Director duties and fiduciary obligations"
        ]
      },
      {
        id: "risk-management",
        title: "Risk Management Framework",
        details: [
          "Enterprise risk management (ERM)",
          "Risk assessment methodologies and heat mapping",
          "Risk appetite statements and tolerance levels",
          "Key risk indicators (KRIs) and monitoring dashboards",
          "Risk treatment strategies and mitigation planning"
        ]
      }
    ]
  },
  {
    id: "esg",
    title: "ESG & Responsible Innovation",
    image: esgImage,
    services: [
      {
        id: "esg-policy",
        title: "ESG Policy Development",
        details: [
          "Carbon footprint assessment of blockchain operations (Proof of Work vs. Proof of Stake)",
          "Sustainability commitments and climate strategy",
          "Energy-efficient protocol selection and recommendations",
          "Carbon offset integration and environmental reporting",
          "Social impact measurement and stakeholder engagement",
          "Governance transparency and accountability mechanisms"
        ]
      },
      {
        id: "responsible-ai",
        title: "Responsible AI & Digital Ethics",
        details: [
          "Algorithm fairness review and bias detection/mitigation",
          "Explainability standards for automated decision-making",
          "Privacy-preserving AI techniques",
          "Ethics committee establishment for AI-powered Web3 applications",
          "Human oversight requirements and accountability frameworks",
          "Alignment with EU AI Act and emerging AI regulations"
        ]
      }
    ]
  },
  {
    id: "training-advisory",
    title: "Training & Advisory Services",
    image: trainingAdvisoryImage,
    services: [
      {
        id: "compliance-training",
        title: "Compliance Training Programs",
        details: [
          "Customized training for your team on relevant frameworks",
          "Security awareness training for all staff",
          "Specialized training for compliance officers, developers, legal teams",
          "Board-level governance and risk training"
        ]
      },
      {
        id: "ongoing-advisory",
        title: "Ongoing Advisory & Support",
        details: [
          "Fractional Chief Compliance Officer (CCO) services",
          "Part-time compliance expertise for growing organizations",
          "Regulatory monitoring and horizon scanning",
          "Policy updates and program enhancements",
          "Incident response advisory and crisis management support"
        ]
      }
    ]
  }
];

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
              Comprehensive Service Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Dual expertise in traditional compliance frameworks and cutting-edge Web3 regulatory solutions. Multi-jurisdictional coverage across North America, Europe, Asia-Pacific, and Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 relative">
        <div className="flex gap-8">
          {/* Sticky Sidebar */}
          <aside className="hidden xl:block w-64 shrink-0">
            <ServicesSidebar />
          </aside>

          {/* Service Categories */}
          <div className="flex-1 min-w-0">
            {/* Mobile Navigation Dropdown */}
            <ServicesMobileNav />
            
            {serviceCategories.map((category, categoryIndex) => (
              <section 
                key={category.id}
                id={category.id}
                className={`py-20 ${categoryIndex % 2 === 1 ? 'bg-muted/30 -mx-4 px-4 xl:-mx-8 xl:px-8 rounded-2xl' : ''}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    {category.title}
                  </h2>
                </motion.div>

                {/* Category Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-12 rounded-2xl overflow-hidden shadow-lg"
                >
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                  {category.services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      id={service.id}
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.15,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      whileHover={{ 
                        y: -8,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      className="bg-card rounded-2xl p-8 border border-border/50 hover:border-accent/30 shadow-sm hover:shadow-xl transition-colors"
                    >
                      <motion.h3 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                        className="text-xl font-bold text-foreground mb-3"
                      >
                        {service.title}
                      </motion.h3>
                      {service.description && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                          className="text-muted-foreground mb-4"
                        >
                          {service.description}
                        </motion.p>
                      )}
                      <ul className="space-y-3 mb-6">
                        {service.details.map((detail, i) => (
                          <motion.li 
                            key={i} 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 0.4, 
                              delay: index * 0.15 + 0.4 + i * 0.08 
                            }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      {/* Action Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.15 + 0.5 }}
                        className="flex flex-wrap gap-3 pt-4 border-t border-border/50"
                      >
                        <a href="https://calendly.com/chioma-legum/30min" target="_blank" rel="noopener noreferrer">
                          <Button variant="default" size="sm" className="gap-2">
                            <ClipboardCheck className="h-4 w-4" />
                            Start Free Assessment
                          </Button>
                        </a>
                        {serviceToDocumentMapping[service.id] && serviceToDocumentMapping[service.id] !== "training" && (
                          <Link to={`/documents#${serviceToDocumentMapping[service.id]}`}>
                            <Button variant="outline" size="sm" className="gap-2">
                              <FileText className="h-4 w-4" />
                              Purchase Documents
                            </Button>
                          </Link>
                        )}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
