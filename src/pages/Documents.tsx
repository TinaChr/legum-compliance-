import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle, Plus, Eye, Shield, Lock, Globe, Building, AlertTriangle, Coins, Scale, Users, Leaf, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/contexts/CartContext";
import { DocumentPreviewDialog } from "@/components/DocumentPreviewDialog";
import { toast } from "sonner";

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "framework" | "policy";
  features: string[];
}

export interface DocumentCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  documents: DocumentItem[];
}

const documentCategories: DocumentCategory[] = [
  {
    id: "isms",
    title: "Information Security Management Systems",
    description: "Comprehensive security frameworks including NIST CSF, ISO 27001, SOC 2, and ISO 22301",
    icon: <Shield className="w-6 h-6" />,
    documents: [
      {
        id: "nist-csf-framework",
        title: "NIST CSF Implementation Framework",
        description: "Complete NIST Cybersecurity Framework implementation package with Risk Management and Continuous Monitoring frameworks.",
        price: 450,
        type: "framework",
        features: ["NIST CSF Implementation Framework", "Risk Management Framework (RMF)", "Continuous Monitoring Framework", "Control Mapping Documentation"]
      },
      {
        id: "nist-csf-policies",
        title: "NIST CSF Policy Bundle",
        description: "All five function policies: Identify, Protect, Detect, Respond, and Recover with assessment methodology.",
        price: 350,
        type: "policy",
        features: ["Identify Function Policy", "Protect Function Policy", "Detect Function Policy", "Respond & Recover Policies", "Maturity Assessment Methodology"]
      },
      {
        id: "iso27001-framework",
        title: "ISO 27001 ISMS Framework",
        description: "Complete Information Security Management System framework with risk assessment and audit frameworks.",
        price: 600,
        type: "framework",
        features: ["ISMS Framework", "Risk Assessment Framework", "Internal Audit Framework", "Management Review Framework"]
      },
      {
        id: "iso27001-policies",
        title: "ISO 27001 Policy Bundle (25+ Policies)",
        description: "Complete set of 25+ required policies for ISO 27001 certification including Statement of Applicability.",
        price: 750,
        type: "policy",
        features: ["Information Security Policy (Master)", "Access Control & Asset Management", "Business Continuity & Incident Management", "All 25+ Required Policies", "Statement of Applicability"]
      },
      {
        id: "soc2-framework",
        title: "SOC 2 Trust Services Framework",
        description: "Trust Services Criteria Framework with control environment and evidence collection frameworks.",
        price: 500,
        type: "framework",
        features: ["Trust Services Criteria Framework", "Control Environment Framework", "Vendor Risk Management Framework", "Evidence Collection Framework"]
      },
      {
        id: "soc2-policies",
        title: "SOC 2 Policy Bundle",
        description: "Security, Availability, Processing Integrity, Confidentiality, and Privacy policies with control matrix.",
        price: 450,
        type: "policy",
        features: ["Security Policies (CC6.1-CC6.8)", "Availability & Processing Integrity", "Confidentiality & Privacy Policies", "System Description", "Control Matrix & Audit Checklist"]
      },
      {
        id: "iso22301-framework",
        title: "ISO 22301 Business Continuity Framework",
        description: "Business Continuity Management System with BIA, Disaster Recovery, and Crisis Management frameworks.",
        price: 400,
        type: "framework",
        features: ["BCMS Framework", "Business Impact Analysis Framework", "Disaster Recovery Framework", "Crisis Management Framework"]
      },
      {
        id: "iso22301-policies",
        title: "ISO 22301 Policy Bundle",
        description: "Complete business continuity policies with RTO/RPO matrices and emergency response procedures.",
        price: 300,
        type: "policy",
        features: ["Business Continuity Policy", "Disaster Recovery Policy", "Crisis & Emergency Response", "IT Service Continuity Policy", "RTO/RPO Matrices"]
      }
    ]
  },
  {
    id: "data-protection",
    title: "Data Protection & Privacy Compliance",
    description: "GDPR, NDPR, CCPA, PIPEDA, POPIA, and blockchain-specific privacy frameworks and policies",
    icon: <Lock className="w-6 h-6" />,
    documents: [
      {
        id: "gdpr-framework",
        title: "GDPR Compliance Framework",
        description: "Complete Data Protection Management Framework with Privacy by Design and Cross-Border Transfer frameworks.",
        price: 550,
        type: "framework",
        features: ["Data Protection Management Framework", "Privacy by Design Framework", "Data Subject Rights Framework", "Cross-Border Transfer Framework"]
      },
      {
        id: "gdpr-policies",
        title: "GDPR Policy Bundle (10+ Policies)",
        description: "Comprehensive GDPR policy set with DPIAs, privacy notices, DPAs, and SCCs.",
        price: 500,
        type: "policy",
        features: ["Data Protection Policy (Master)", "Data Processing & Retention Policies", "Data Subject Rights Policy", "DPIAs & Privacy Notices", "DPAs & SCCs"]
      },
      {
        id: "ndpr-framework",
        title: "NDPR Nigeria Compliance Framework",
        description: "NITDA Compliance Framework with DPCO and Annual Audit frameworks for Nigeria.",
        price: 400,
        type: "framework",
        features: ["NITDA Compliance Framework", "DPCO Framework", "Annual Audit Framework", "NITDA Reporting Templates"]
      },
      {
        id: "ndpr-policies",
        title: "NDPR Policy Bundle",
        description: "Complete Nigeria Data Protection Regulation policy set with 72-hour breach notification.",
        price: 350,
        type: "policy",
        features: ["NDPR Compliance Policy", "Consent Management Policy", "Breach Notification Policy (72-hour)", "International Data Transfer Policy", "DPCO Designation Documentation"]
      },
      {
        id: "ccpa-framework",
        title: "CCPA Compliance Framework",
        description: "Consumer Rights Management and Data Sale Opt-Out frameworks for California compliance.",
        price: 350,
        type: "framework",
        features: ["Consumer Rights Framework", "Data Sale Opt-Out Framework", "DSAR Processing Framework", "Authorized Agent Verification"]
      },
      {
        id: "ccpa-policies",
        title: "CCPA Policy Bundle",
        description: "California Consumer Privacy Act policies including Do Not Sell and Service Provider management.",
        price: 300,
        type: "policy",
        features: ["CCPA Compliance Policy", "Consumer Rights Policy", "Do Not Sell Policy", "Service Provider Management", "Privacy Notice (CCPA format)"]
      },
      {
        id: "blockchain-privacy",
        title: "Blockchain Privacy Framework & Policies",
        description: "Specialized on-chain privacy framework with zero-knowledge proof and immutable ledger considerations.",
        price: 450,
        type: "framework",
        features: ["On-Chain Privacy Framework", "Zero-Knowledge Proof Framework", "Immutable Ledger Privacy", "Data Minimization Policy", "Right to Erasure Solutions"]
      }
    ]
  },
  {
    id: "industry-specific",
    title: "Industry-Specific Compliance",
    description: "Financial services, PCI DSS, telecommunications, and healthcare compliance frameworks",
    icon: <Building className="w-6 h-6" />,
    documents: [
      {
        id: "nigeria-finserv-framework",
        title: "Nigeria Financial Services Framework",
        description: "CBN Compliance Framework with Banking Security and Fintech Regulatory frameworks.",
        price: 500,
        type: "framework",
        features: ["CBN Compliance Framework", "Banking Security Framework", "Fintech Regulatory Framework", "Payment Processor Security"]
      },
      {
        id: "nigeria-finserv-policies",
        title: "Nigeria Financial Services Policies",
        description: "Complete CBN regulatory compliance policies with financial crime prevention.",
        price: 400,
        type: "policy",
        features: ["CBN Regulatory Compliance Policy", "Banking Security Standards", "Financial Crime Prevention", "Customer Due Diligence Policy"]
      },
      {
        id: "pci-dss-framework",
        title: "PCI DSS Compliance Framework",
        description: "Payment Card Industry framework with network segmentation and CDE frameworks.",
        price: 550,
        type: "framework",
        features: ["PCI DSS Compliance Framework", "Network Segmentation Framework", "CDE Framework", "Quarterly Validation Framework"]
      },
      {
        id: "pci-dss-policies",
        title: "PCI DSS Policy Bundle (12+ Policies)",
        description: "Complete PCI DSS policy set with all 12 requirements covered plus additional documents.",
        price: 600,
        type: "policy",
        features: ["PCI DSS Compliance Policy (Master)", "Cardholder Data Protection", "Access Control & Encryption", "Vulnerability Management", "Penetration Testing Policy"]
      },
      {
        id: "telecom-nigeria-framework",
        title: "Nigeria Telecommunications Framework",
        description: "NITDA Telecommunications Framework with infrastructure security and service availability.",
        price: 350,
        type: "framework",
        features: ["NITDA Telecom Framework", "Infrastructure Security Framework", "Service Availability Framework", "SLA Policy"]
      },
      {
        id: "hitrust-csf-framework",
        title: "HITRUST CSF Healthcare Framework",
        description: "HITRUST CSF Implementation Framework with PHI protection and healthcare security.",
        price: 500,
        type: "framework",
        features: ["HITRUST CSF Framework", "PHI Protection Framework", "Healthcare Security Framework", "HIPAA Alignment Policy"]
      },
      {
        id: "hitrust-policies",
        title: "HITRUST CSF Policy Bundle",
        description: "Healthcare compliance policies with BAA templates and medical device security.",
        price: 450,
        type: "policy",
        features: ["HITRUST Compliance Policy", "PHI Policy", "BAA Policy", "Medical Device Security", "HITRUST Readiness Assessment"]
      }
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Technical Compliance",
    description: "VAPT, smart contract audits, and security operations frameworks and policies",
    icon: <AlertTriangle className="w-6 h-6" />,
    documents: [
      {
        id: "vapt-framework",
        title: "VAPT Framework Bundle",
        description: "Vulnerability Assessment & Penetration Testing frameworks with remediation validation.",
        price: 400,
        type: "framework",
        features: ["Vulnerability Management Framework", "Penetration Testing Framework", "Remediation Validation Framework", "VAPT Methodology Documentation"]
      },
      {
        id: "vapt-policies",
        title: "VAPT Policy Bundle",
        description: "Complete vulnerability management and security testing policies with ROE documents.",
        price: 350,
        type: "policy",
        features: ["Vulnerability Management Policy", "Penetration Testing Policy", "Patch Management Policy", "Rules of Engagement (ROE)", "Remediation Tracking Matrix"]
      },
      {
        id: "smart-contract-framework",
        title: "Smart Contract Security Framework",
        description: "Smart Contract Audit Framework with multi-firm coordination and formal verification.",
        price: 500,
        type: "framework",
        features: ["Smart Contract Audit Framework", "Multi-Firm Coordination Framework", "Formal Verification Framework", "Vulnerability Classification Matrix"]
      },
      {
        id: "smart-contract-policies",
        title: "Smart Contract Security Policies",
        description: "Smart contract security policies with code review and economic security review.",
        price: 400,
        type: "policy",
        features: ["Smart Contract Security Policy", "Code Review Policy", "Vulnerability Classification Policy", "Economic Security Review Policy", "Remediation Guidelines"]
      },
      {
        id: "secops-framework",
        title: "Security Operations Framework",
        description: "SOC Framework with SIEM implementation, incident response, and threat intelligence.",
        price: 450,
        type: "framework",
        features: ["SOC Framework", "SIEM Implementation Framework", "Incident Response Framework", "Threat Intelligence Framework"]
      },
      {
        id: "secops-policies",
        title: "Security Operations Policy Bundle",
        description: "Complete security operations policies covering monitoring, logging, and incident response.",
        price: 400,
        type: "policy",
        features: ["Security Operations Policy", "SIEM & Monitoring Policies", "Log Management Policy", "Incident Response Policy", "Threat Intelligence Policy"]
      }
    ]
  },
  {
    id: "web3-regulatory",
    title: "Web3 Regulatory & Licensing",
    description: "MSB registration, VASP licensing, MiCA readiness, and regulatory classification",
    icon: <Globe className="w-6 h-6" />,
    documents: [
      {
        id: "msb-framework",
        title: "MSB Registration Framework",
        description: "Money Services Business frameworks for FinCEN, FINTRAC, and state licensing.",
        price: 600,
        type: "framework",
        features: ["FinCEN Compliance Framework", "FINTRAC Compliance Framework", "State Money Transmitter Framework", "Compliance Program Manual"]
      },
      {
        id: "msb-policies",
        title: "MSB Compliance Policy Bundle",
        description: "Complete MSB policies including AML, BSA compliance, and transaction reporting.",
        price: 500,
        type: "policy",
        features: ["MSB Compliance Program Policy", "AML & BSA Compliance Policies", "State Licensing Compliance", "Transaction & SAR Reporting"]
      },
      {
        id: "vasp-framework",
        title: "VASP Registration Framework",
        description: "FATF-aligned VASP framework with multi-jurisdictional registration guidance.",
        price: 650,
        type: "framework",
        features: ["FATF-Aligned VASP Framework", "Multi-Jurisdictional Framework", "UAE/Singapore/HK Documentation", "Travel Rule Compliance"]
      },
      {
        id: "vasp-policies",
        title: "VASP Compliance Policy Bundle",
        description: "Virtual Asset Service Provider policies with travel rule and due diligence.",
        price: 550,
        type: "policy",
        features: ["VASP Compliance Policy", "Virtual Asset Handling Policy", "Travel Rule Compliance Policy", "Customer Due Diligence (VASP)"]
      },
      {
        id: "mica-framework",
        title: "MiCA Readiness Framework",
        description: "EU Markets in Crypto-Assets framework with white paper and authorization procedures.",
        price: 700,
        type: "framework",
        features: ["MiCA Compliance Framework", "White Paper Preparation Framework", "Token Authorization Framework", "MiCA Gap Analysis Report"]
      },
      {
        id: "mica-policies",
        title: "MiCA Compliance Policy Bundle",
        description: "Complete MiCA policy set with crypto-asset classification and ongoing monitoring.",
        price: 600,
        type: "policy",
        features: ["MiCA Compliance Policy", "Crypto-Asset Classification", "White Paper Disclosure Policy", "Authorization Requirements", "Ongoing Compliance Monitoring"]
      },
      {
        id: "emi-pi-framework",
        title: "EMI & Payment Institution Framework",
        description: "Electronic Money Institution and Payment Institution licensing frameworks.",
        price: 550,
        type: "framework",
        features: ["EMI Framework", "Payment Institution Framework", "Stablecoin Issuer Framework", "Safeguarding Requirements"]
      },
      {
        id: "regulatory-classification",
        title: "Regulatory Classification Framework",
        description: "Digital asset classification with Howey Test and multi-jurisdictional analysis.",
        price: 500,
        type: "framework",
        features: ["Digital Asset Classification", "Howey Test Framework", "Multi-Jurisdictional Analysis", "Exemption Strategy Documentation"]
      },
      {
        id: "legal-entity-structuring",
        title: "Legal Entity Structuring Framework",
        description: "DAO legal wrappers, foundation setup, and multi-jurisdictional structures.",
        price: 600,
        type: "framework",
        features: ["DAO Legal Wrapper Framework", "Foundation Setup Framework", "Multi-Jurisdictional Structure", "SPV Structure Policy"]
      }
    ]
  },
  {
    id: "aml-kyc",
    title: "AML/KYC & Financial Crime Prevention",
    description: "Comprehensive AML/CTF programs, KYC infrastructure, transaction monitoring, and sanctions compliance",
    icon: <Scale className="w-6 h-6" />,
    documents: [
      {
        id: "aml-ctf-framework",
        title: "AML/CTF Program Framework",
        description: "FATF-compliant AML/CTF framework with risk-based approach and three lines of defense.",
        price: 650,
        type: "framework",
        features: ["FATF-Compliant AML/CTF Framework", "Risk-Based Approach Framework", "Three Lines of Defense", "Transaction Monitoring Framework"]
      },
      {
        id: "aml-ctf-policies",
        title: "AML/CTF Policy Bundle (10+ Policies)",
        description: "Complete AML/CTF policy manual with CDD, EDD, and SAR procedures.",
        price: 600,
        type: "policy",
        features: ["AML/CTF Program Policy (Master)", "CDD & EDD Policies", "Transaction Monitoring Policy", "SAR Policy", "Governance & Oversight Policy"]
      },
      {
        id: "kyc-cdd-framework",
        title: "KYC/CDD Infrastructure Framework",
        description: "Know Your Customer framework with CDD, EDD, and ongoing monitoring frameworks.",
        price: 500,
        type: "framework",
        features: ["KYC Framework", "CDD & EDD Frameworks", "Ongoing Monitoring Framework", "Customer Risk Rating Methodology"]
      },
      {
        id: "kyc-cdd-policies",
        title: "KYC/CDD Policy Bundle (10+ Policies)",
        description: "Complete KYC policy set with PEP screening, sanctions, and beneficial ownership.",
        price: 550,
        type: "policy",
        features: ["KYC & CIP Policies", "Beneficial Ownership Policy", "PEP & Sanctions Screening", "Adverse Media Screening", "Periodic Review Policy"]
      },
      {
        id: "transaction-monitoring-framework",
        title: "Transaction Monitoring Framework",
        description: "Transaction monitoring with blockchain analytics and alert management frameworks.",
        price: 450,
        type: "framework",
        features: ["Transaction Monitoring Framework", "Blockchain Analytics Framework", "Alert Management Framework", "SAR/STR Filing Framework"]
      },
      {
        id: "transaction-monitoring-policies",
        title: "Transaction Monitoring Policy Bundle",
        description: "Transaction monitoring policies with crypto-specific rules and mixing detection.",
        price: 400,
        type: "policy",
        features: ["Transaction Monitoring Policy", "Alert Management Policy", "Blockchain Analytics Policy", "Typology Detection Policy", "Mixing/Layering Detection"]
      },
      {
        id: "sanctions-framework",
        title: "Sanctions Compliance Framework",
        description: "Multi-jurisdictional sanctions framework with wallet address screening.",
        price: 400,
        type: "framework",
        features: ["Sanctions Screening Framework", "Multi-Jurisdictional Framework", "Wallet Address Screening", "Real-Time Screening Protocols"]
      },
      {
        id: "sanctions-policies",
        title: "Sanctions Compliance Policy Bundle",
        description: "OFAC, UN, EU sanctions policies with wallet screening and VPN detection.",
        price: 350,
        type: "policy",
        features: ["Sanctions Compliance Policy", "OFAC/UN/EU Screening", "Wallet Address Screening Policy", "Geographic IP Blocking", "VPN Detection Policy"]
      }
    ]
  },
  {
    id: "token-governance",
    title: "Token Issuance & Governance",
    description: "Securities law compliance, whitepaper review, tokenomics, and DAO governance",
    icon: <Coins className="w-6 h-6" />,
    documents: [
      {
        id: "securities-framework",
        title: "Securities Law Compliance Framework",
        description: "Securities law analysis with Howey Test and multi-jurisdictional offering frameworks.",
        price: 600,
        type: "framework",
        features: ["Securities Law Analysis Framework", "Howey Test Framework", "Exemption Strategy Framework", "Multi-Jurisdictional Offering"]
      },
      {
        id: "securities-policies",
        title: "Securities Law Policy Bundle",
        description: "Complete securities policies including Reg D, Reg S, Reg CF, and Reg A+.",
        price: 550,
        type: "policy",
        features: ["Securities Compliance Policy", "Reg D (506b/506c) Policy", "Reg S & Reg CF Policies", "Reg A+ Policy", "SEC Compliance Documentation"]
      },
      {
        id: "whitepaper-framework",
        title: "Whitepaper Legal Review Framework",
        description: "Risk disclosure and forward-looking statements frameworks with review checklists.",
        price: 350,
        type: "framework",
        features: ["Risk Disclosure Framework", "Forward-Looking Statements", "Regulatory Compliance Review", "Jurisdictional Disclaimers"]
      },
      {
        id: "whitepaper-policies",
        title: "Whitepaper Publication Policies",
        description: "Whitepaper publication policies with risk disclosure templates and safe harbor.",
        price: 300,
        type: "policy",
        features: ["Whitepaper Publication Policy", "Risk Disclosure Policy", "Forward-Looking Statements", "Misrepresentation Prevention", "Safe Harbor Language"]
      },
      {
        id: "tokenomics-framework",
        title: "Tokenomics Compliance Framework",
        description: "Token distribution, vesting, and utility analysis frameworks.",
        price: 450,
        type: "framework",
        features: ["Token Distribution Framework", "Vesting & Lock-Up Framework", "Token Utility Analysis", "Secondary Market Considerations"]
      },
      {
        id: "tokenomics-policies",
        title: "Tokenomics Compliance Policy Bundle",
        description: "Complete tokenomics policies covering distribution, vesting, and supply mechanics.",
        price: 400,
        type: "policy",
        features: ["Tokenomics Compliance Policy", "Distribution Mechanism Policy", "Vesting & Lock-Up Policy", "Airdrop & Incentive Policy", "Supply Mechanics Policy"]
      },
      {
        id: "dao-governance-framework",
        title: "DAO Governance Framework",
        description: "DAO legal integration with governance token and treasury management frameworks.",
        price: 550,
        type: "framework",
        features: ["DAO Legal Integration", "Governance Token Framework", "Decentralization Pathway", "Treasury Management Framework"]
      },
      {
        id: "dao-governance-policies",
        title: "DAO Governance Policy Bundle",
        description: "Complete DAO policies with voting mechanisms, treasury, and contributor agreements.",
        price: 500,
        type: "policy",
        features: ["DAO Governance Policy", "Voting Mechanism Policy", "Treasury Management Policy", "Multi-Sig Control Policy", "Contributor Agreement Policy"]
      }
    ]
  },
  {
    id: "corporate-governance",
    title: "Corporate Governance & Risk Management",
    description: "Internal compliance, board governance, and enterprise risk management frameworks",
    icon: <Users className="w-6 h-6" />,
    documents: [
      {
        id: "internal-compliance-framework",
        title: "Internal Compliance Framework",
        description: "Three lines of defense with compliance management and policy management frameworks.",
        price: 500,
        type: "framework",
        features: ["Three Lines of Defense", "Compliance Management Framework", "Control Environment Framework", "Policy Management Framework"]
      },
      {
        id: "internal-compliance-policies",
        title: "Internal Compliance Policy Bundle",
        description: "Code of conduct, ethics, whistleblower, and compliance testing policies.",
        price: 450,
        type: "policy",
        features: ["Compliance Framework Policy", "Code of Conduct", "Ethics & Whistleblower Policy", "Compliance Testing Policy", "Issue Management Policy"]
      },
      {
        id: "board-governance-framework",
        title: "Board & Governance Framework",
        description: "Corporate governance with board oversight and delegation of authority frameworks.",
        price: 450,
        type: "framework",
        features: ["Corporate Governance Framework", "Board Oversight Framework", "Delegation of Authority", "Committee Terms of Reference"]
      },
      {
        id: "board-governance-policies",
        title: "Board & Governance Policy Bundle",
        description: "Board charter, committee charters, and conflict of interest policies.",
        price: 400,
        type: "policy",
        features: ["Board Charter", "Committee Charters (Audit/Risk/Compliance)", "Delegation of Authority Policy", "Conflict of Interest Policy", "Related Party Transaction Policy"]
      },
      {
        id: "erm-framework",
        title: "Enterprise Risk Management Framework",
        description: "ERM framework with risk assessment and monitoring frameworks.",
        price: 400,
        type: "framework",
        features: ["ERM Framework", "Risk Assessment Framework", "Risk Monitoring Framework", "Risk Heat Maps"]
      },
      {
        id: "erm-policies",
        title: "Enterprise Risk Management Policies",
        description: "Complete ERM policies with risk appetite, tolerance, and KRI policies.",
        price: 350,
        type: "policy",
        features: ["ERM Policy", "Risk Assessment Policy", "Risk Appetite & Tolerance", "Key Risk Indicator Policy", "Risk Treatment & Mitigation"]
      }
    ]
  },
  {
    id: "esg",
    title: "ESG & Responsible Innovation",
    description: "Environmental, social, and governance policies with responsible AI and digital ethics",
    icon: <Leaf className="w-6 h-6" />,
    documents: [
      {
        id: "esg-framework",
        title: "ESG Policy Development Framework",
        description: "Complete ESG framework with carbon footprint assessment and sustainability frameworks.",
        price: 450,
        type: "framework",
        features: ["ESG Framework", "Carbon Footprint Assessment", "Sustainability Framework", "Stakeholder Engagement Framework"]
      },
      {
        id: "esg-policies",
        title: "ESG Policy Bundle (10+ Policies)",
        description: "Comprehensive ESG policies covering environmental, social, and governance aspects.",
        price: 400,
        type: "policy",
        features: ["ESG Policy (Master)", "Environmental & Carbon Policies", "Climate Strategy Policy", "Social Impact Policy", "Governance Transparency Policy"]
      },
      {
        id: "responsible-ai-framework",
        title: "Responsible AI & Digital Ethics Framework",
        description: "AI ethics framework with algorithm fairness and privacy-preserving AI frameworks.",
        price: 500,
        type: "framework",
        features: ["AI Ethics Framework", "Algorithm Fairness Framework", "Privacy-Preserving AI", "AI Governance Framework"]
      },
      {
        id: "responsible-ai-policies",
        title: "Responsible AI Policy Bundle",
        description: "AI policies covering fairness, bias detection, explainability, and EU AI Act compliance.",
        price: 450,
        type: "policy",
        features: ["Responsible AI Policy", "Algorithm Fairness Policy", "Bias Detection & Mitigation", "Explainability Standards", "EU AI Act Compliance Policy"]
      }
    ]
  },
  {
    id: "training-advisory",
    title: "Training & Advisory Services",
    description: "Compliance training programs and ongoing advisory support frameworks",
    icon: <GraduationCap className="w-6 h-6" />,
    documents: [
      {
        id: "training-framework",
        title: "Compliance Training Framework",
        description: "Security awareness and compliance training frameworks with board training.",
        price: 350,
        type: "framework",
        features: ["Security Awareness Training", "Compliance Training Framework", "Board Training Framework", "Training Curriculum by Role"]
      },
      {
        id: "training-policies",
        title: "Training & Awareness Policy Bundle",
        description: "Training policies with materials for security, compliance, and developer teams.",
        price: 300,
        type: "policy",
        features: ["Training & Awareness Policy", "Security Awareness Policy", "Compliance Training Policy", "Board Training Policy", "Developer Training Program"]
      },
      {
        id: "advisory-framework",
        title: "Ongoing Advisory Framework",
        description: "Fractional CCO framework with regulatory monitoring and incident response advisory.",
        price: 400,
        type: "framework",
        features: ["Fractional CCO Framework", "Regulatory Monitoring Framework", "Incident Response Advisory", "CCO Service Level Agreement"]
      },
      {
        id: "advisory-policies",
        title: "Advisory Services Policy Bundle",
        description: "Advisory policies with regulatory monitoring and crisis management.",
        price: 350,
        type: "policy",
        features: ["Advisory Services Policy", "Regulatory Monitoring Policy", "Policy Update Policy", "Incident Response Advisory", "Crisis Management Policy"]
      }
    ]
  }
];

const Documents = () => {
  const { addItem, items } = useCart();
  const [previewDocument, setPreviewDocument] = useState<DocumentItem | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleAddToCart = (doc: DocumentItem) => {
    addItem({ id: doc.id, title: doc.title, price: doc.price });
    toast.success(`${doc.title} added to cart`);
  };

  const isInCart = (id: string) => items.some((item) => item.id === id);

  const handlePreview = (doc: DocumentItem) => {
    setPreviewDocument(doc);
    setPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <CartDrawer />
            </div>
            
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Compliance Frameworks
                <span className="text-gradient"> & Policy Templates</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed mb-4">
                Professional-grade compliance documentation covering 10 major regulatory areas. 
                From ISMS and data protection to Web3 licensing and ESG frameworks.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-3 py-1">
                  <Shield className="w-3 h-3 mr-1" />
                  100+ Documents
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-3 py-1">
                  <FileText className="w-3 h-3 mr-1" />
                  Ready to Use
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-3 py-1">
                  <Globe className="w-3 h-3 mr-1" />
                  Multi-Jurisdictional
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {documentCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-20"
            >
              <div className="flex items-start gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {category.title}
                  </h2>
                  <p className="text-muted-foreground mt-1">{category.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.documents.map((doc, docIndex) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: docIndex * 0.05 }}
                  >
                    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-2">
                          <Badge 
                            variant={doc.type === "framework" ? "default" : "secondary"}
                            className={doc.type === "framework" ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-600 hover:bg-emerald-700 text-white"}
                          >
                            {doc.type === "framework" ? "Framework" : "Policy"}
                          </Badge>
                          <span className="text-xl font-bold text-primary">${doc.price}</span>
                        </div>
                        <CardTitle className="text-base leading-tight">{doc.title}</CardTitle>
                        <CardDescription className="text-sm line-clamp-2">{doc.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow pt-0">
                        <ul className="space-y-1.5">
                          {doc.features.slice(0, 4).map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <CheckCircle className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                          {doc.features.length > 4 && (
                            <li className="text-xs text-primary font-medium">
                              +{doc.features.length - 4} more included
                            </li>
                          )}
                        </ul>
                      </CardContent>
                      <CardFooter className="pt-4 border-t border-border/50 flex-col gap-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          className="w-full gap-2"
                          onClick={() => handlePreview(doc)}
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </Button>
                        <Button 
                          size="sm"
                          className="w-full gap-2" 
                          variant={isInCart(doc.id) ? "secondary" : "default"}
                          onClick={() => handleAddToCart(doc)}
                        >
                          {isInCart(doc.id) ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              In Cart
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Need Custom Documentation?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team can create tailored compliance frameworks and policies specific to your business needs, 
              jurisdiction, and regulatory requirements.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Request Custom Documents</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />

      <DocumentPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        document={previewDocument}
        onAddToCart={() => previewDocument && handleAddToCart(previewDocument)}
        isInCart={previewDocument ? isInCart(previewDocument.id) : false}
      />
    </div>
  );
};

export default Documents;
