import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle, Plus, Eye, Shield, Lock, Globe, Building, AlertTriangle, Coins, Scale, Users, Leaf, GraduationCap, Search, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { DocumentPreviewDialog } from "@/components/DocumentPreviewDialog";
import { toast } from "sonner";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "policy";
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
    description: "Comprehensive security policies including NIST CSF, ISO 27001, SOC 2, and ISO 22301",
    icon: <Shield className="w-6 h-6" />,
    documents: [
      {
        id: "nist-csf-policies",
        title: "NIST CSF Policy Bundle",
        description: "All five function policies: Identify, Protect, Detect, Respond, and Recover with assessment methodology.",
        price: 350,
        type: "policy",
        features: ["Identify Function Policy", "Protect Function Policy", "Detect Function Policy", "Respond & Recover Policies", "Maturity Assessment Methodology"]
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
        id: "soc2-policies",
        title: "SOC 2 Policy Bundle",
        description: "Security, Availability, Processing Integrity, Confidentiality, and Privacy policies with control matrix.",
        price: 450,
        type: "policy",
        features: ["Security Policies (CC6.1-CC6.8)", "Availability & Processing Integrity", "Confidentiality & Privacy Policies", "System Description", "Control Matrix & Audit Checklist"]
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
    description: "GDPR, NDPR, CCPA, and privacy policy templates",
    icon: <Lock className="w-6 h-6" />,
    documents: [
      {
        id: "gdpr-policies",
        title: "GDPR Policy Bundle (10+ Policies)",
        description: "Comprehensive GDPR policy set with DPIAs, privacy notices, DPAs, and SCCs.",
        price: 500,
        type: "policy",
        features: ["Data Protection Policy (Master)", "Data Processing & Retention Policies", "Data Subject Rights Policy", "DPIAs & Privacy Notices", "DPAs & SCCs"]
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
        id: "ccpa-policies",
        title: "CCPA Policy Bundle",
        description: "California Consumer Privacy Act policies including Do Not Sell and Service Provider management.",
        price: 300,
        type: "policy",
        features: ["CCPA Compliance Policy", "Consumer Rights Policy", "Do Not Sell Policy", "Service Provider Management", "Privacy Notice (CCPA format)"]
      }
    ]
  },
  {
    id: "industry-specific",
    title: "Industry-Specific Compliance",
    description: "Financial services, PCI DSS, and healthcare compliance policies",
    icon: <Building className="w-6 h-6" />,
    documents: [
      {
        id: "nigeria-finserv-policies",
        title: "Nigeria Financial Services Policies",
        description: "Complete CBN regulatory compliance policies with financial crime prevention.",
        price: 400,
        type: "policy",
        features: ["CBN Regulatory Compliance Policy", "Banking Security Standards", "Financial Crime Prevention", "Customer Due Diligence Policy"]
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
    description: "VAPT, smart contract audits, and security operations policies",
    icon: <AlertTriangle className="w-6 h-6" />,
    documents: [
      {
        id: "vapt-policies",
        title: "VAPT Policy Bundle",
        description: "Complete vulnerability management and security testing policies with ROE documents.",
        price: 350,
        type: "policy",
        features: ["Vulnerability Management Policy", "Penetration Testing Policy", "Patch Management Policy", "Rules of Engagement (ROE)", "Remediation Tracking Matrix"]
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
    description: "MSB, VASP, and MiCA compliance policies",
    icon: <Globe className="w-6 h-6" />,
    documents: [
      {
        id: "msb-policies",
        title: "MSB Compliance Policy Bundle",
        description: "Complete MSB policies including AML, BSA compliance, and transaction reporting.",
        price: 500,
        type: "policy",
        features: ["MSB Compliance Program Policy", "AML & BSA Compliance Policies", "State Licensing Compliance", "Transaction & SAR Reporting"]
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
        id: "mica-policies",
        title: "MiCA Compliance Policy Bundle",
        description: "Complete MiCA policy set with crypto-asset classification and ongoing monitoring.",
        price: 600,
        type: "policy",
        features: ["MiCA Compliance Policy", "Crypto-Asset Classification", "White Paper Disclosure Policy", "Authorization Requirements", "Ongoing Compliance Monitoring"]
      }
    ]
  },
  {
    id: "aml-kyc",
    title: "AML/KYC & Financial Crime Prevention",
    description: "AML/CTF programs, KYC, transaction monitoring, and sanctions compliance policies",
    icon: <Scale className="w-6 h-6" />,
    documents: [
      {
        id: "aml-ctf-policies",
        title: "AML/CTF Policy Bundle (10+ Policies)",
        description: "Complete AML/CTF policy manual with CDD, EDD, and SAR procedures.",
        price: 600,
        type: "policy",
        features: ["AML/CTF Program Policy (Master)", "CDD & EDD Policies", "Transaction Monitoring Policy", "SAR Policy", "Governance & Oversight Policy"]
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
        id: "transaction-monitoring-policies",
        title: "Transaction Monitoring Policy Bundle",
        description: "Transaction monitoring policies with crypto-specific rules and mixing detection.",
        price: 400,
        type: "policy",
        features: ["Transaction Monitoring Policy", "Alert Management Policy", "Blockchain Analytics Policy", "Typology Detection Policy", "Mixing/Layering Detection"]
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
    description: "Securities law, whitepaper, tokenomics, and DAO governance policies",
    icon: <Coins className="w-6 h-6" />,
    documents: [
      {
        id: "securities-policies",
        title: "Securities Law Policy Bundle",
        description: "Complete securities policies including Reg D, Reg S, Reg CF, and Reg A+.",
        price: 550,
        type: "policy",
        features: ["Securities Compliance Policy", "Reg D (506b/506c) Policy", "Reg S & Reg CF Policies", "Reg A+ Policy", "SEC Compliance Documentation"]
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
        id: "tokenomics-policies",
        title: "Tokenomics Compliance Policy Bundle",
        description: "Complete tokenomics policies covering distribution, vesting, and supply mechanics.",
        price: 400,
        type: "policy",
        features: ["Tokenomics Compliance Policy", "Distribution Mechanism Policy", "Vesting & Lock-Up Policy", "Airdrop & Incentive Policy", "Supply Mechanics Policy"]
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
    description: "Internal compliance, board governance, and enterprise risk management policies",
    icon: <Users className="w-6 h-6" />,
    documents: [
      {
        id: "internal-compliance-policies",
        title: "Internal Compliance Policy Bundle",
        description: "Code of conduct, ethics, whistleblower, and compliance testing policies.",
        price: 450,
        type: "policy",
        features: ["Compliance Framework Policy", "Code of Conduct", "Ethics & Whistleblower Policy", "Compliance Testing Policy", "Issue Management Policy"]
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
    description: "Environmental, social, governance policies and responsible AI",
    icon: <Leaf className="w-6 h-6" />,
    documents: [
      {
        id: "esg-policies",
        title: "ESG Policy Bundle (10+ Policies)",
        description: "Comprehensive ESG policies covering environmental, social, and governance aspects.",
        price: 400,
        type: "policy",
        features: ["ESG Policy (Master)", "Environmental & Carbon Policies", "Climate Strategy Policy", "Social Impact Policy", "Governance Transparency Policy"]
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
    description: "Compliance training programs and ongoing advisory support policies",
    icon: <GraduationCap className="w-6 h-6" />,
    documents: [
      {
        id: "training-policies",
        title: "Training & Awareness Policy Bundle",
        description: "Training policies with materials for security, compliance, and developer teams.",
        price: 300,
        type: "policy",
        features: ["Training & Awareness Policy", "Security Awareness Policy", "Compliance Training Policy", "Board Training Policy", "Developer Training Program"]
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
  useScrollToHash();
  const { addItem, items } = useCart();
  const [previewDocument, setPreviewDocument] = useState<DocumentItem | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter documents based on search query
  const filteredCategories = documentCategories.map(category => ({
    ...category,
    documents: category.documents.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.documents.length > 0);

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
            <div className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
            
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Compliance
                <span className="text-gradient"> Policy Templates</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed mb-4">
                Professional-grade policy documentation covering 10 major regulatory areas. 
                From ISMS and data protection to Web3 licensing and ESG policies.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-3 py-1">
                  <Shield className="w-3 h-3 mr-1" />
                  50+ Policies
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

      {/* Search Bar */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search frameworks, policies, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-10 py-6 text-base bg-card border-border/50 focus:border-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Found {filteredCategories.reduce((acc, cat) => acc + cat.documents.length, 0)} documents matching "{searchQuery}"
            </p>
          )}
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No documents found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search terms</p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          ) : (
            filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                id={category.id}
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
                            variant="secondary"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            Policy
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
          ))
          )}
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
