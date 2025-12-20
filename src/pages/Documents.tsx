import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Download, ShoppingCart, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const documentCategories = [
  {
    id: "policies",
    title: "Security & Privacy Policies",
    documents: [
      {
        id: "isms-policy",
        title: "Information Security Policy Template",
        description: "Comprehensive ISMS policy aligned with ISO 27001 requirements.",
        price: 150,
        features: ["Editable Word format", "Implementation guide", "Annual review checklist"]
      },
      {
        id: "privacy-policy",
        title: "GDPR Privacy Policy Template",
        description: "Ready-to-use privacy policy compliant with GDPR requirements.",
        price: 100,
        features: ["Multi-language support", "Cookie policy included", "DPA template"]
      },
      {
        id: "aml-policy",
        title: "AML/KYC Policy Template",
        description: "Anti-Money Laundering policy for VASPs and financial services.",
        price: 200,
        features: ["Risk assessment framework", "CDD procedures", "SAR templates"]
      }
    ]
  },
  {
    id: "frameworks",
    title: "Compliance Frameworks",
    documents: [
      {
        id: "soc2-toolkit",
        title: "SOC 2 Readiness Toolkit",
        description: "Complete documentation package for SOC 2 Type I & II preparation.",
        price: 500,
        features: ["50+ policy templates", "Evidence collection guide", "Gap analysis tool"]
      },
      {
        id: "iso27001-toolkit",
        title: "ISO 27001 Implementation Kit",
        description: "Full documentation set for ISO 27001 certification.",
        price: 600,
        features: ["Statement of Applicability", "Risk register template", "Internal audit checklist"]
      },
      {
        id: "mica-toolkit",
        title: "MiCA Compliance Toolkit",
        description: "Essential documents for EU crypto-asset regulation compliance.",
        price: 400,
        features: ["White paper template", "Governance policies", "Reserve requirements guide"]
      }
    ]
  },
  {
    id: "contracts",
    title: "Legal Contracts & Agreements",
    documents: [
      {
        id: "dpa-template",
        title: "Data Processing Agreement",
        description: "GDPR-compliant DPA template for vendor relationships.",
        price: 75,
        features: ["Sub-processor provisions", "SCC integration", "Breach notification"]
      },
      {
        id: "nda-template",
        title: "NDA Template Bundle",
        description: "Mutual and one-way NDA templates for business relationships.",
        price: 50,
        features: ["Mutual NDA", "One-way NDA", "International versions"]
      },
      {
        id: "terms-conditions",
        title: "Terms & Conditions Template",
        description: "Comprehensive T&C for digital platforms and Web3 services.",
        price: 125,
        features: ["User agreement", "Acceptable use policy", "Dispute resolution"]
      }
    ]
  },
  {
    id: "web3",
    title: "Web3 & Blockchain Documents",
    documents: [
      {
        id: "tokenomics-template",
        title: "Tokenomics Documentation Kit",
        description: "Complete tokenomics framework with compliance considerations.",
        price: 350,
        features: ["Distribution model", "Vesting schedules", "Securities analysis"]
      },
      {
        id: "whitepaper-template",
        title: "White Paper Template",
        description: "Professional white paper template with regulatory disclosures.",
        price: 200,
        features: ["Technical sections", "Risk disclosures", "Legal disclaimers"]
      },
      {
        id: "dao-governance",
        title: "DAO Governance Framework",
        description: "Complete governance documentation for DAOs.",
        price: 300,
        features: ["Constitution template", "Voting procedures", "Treasury policies"]
      }
    ]
  }
];

const Documents = () => {
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
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Compliance Document
                <span className="text-gradient"> Templates</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed">
                Professional-grade compliance documents and policy templates. 
                Save time and ensure regulatory alignment with our ready-to-use documentation.
              </p>
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
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                {category.title}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.documents.map((doc, docIndex) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: docIndex * 0.1 }}
                  >
                    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Template
                          </Badge>
                          <span className="text-2xl font-bold text-primary">${doc.price}</span>
                        </div>
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                        <CardDescription>{doc.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <ul className="space-y-2">
                          {doc.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="pt-4 border-t border-border/50">
                        <Button className="w-full gap-2" asChild>
                          <Link to="/contact">
                            <ShoppingCart className="w-4 h-4" />
                            Purchase Now
                          </Link>
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
              Need Custom Documents?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team can create tailored compliance documentation specific to your business needs, 
              jurisdiction, and regulatory requirements.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Request Custom Documents</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Documents;
