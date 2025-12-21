import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, CheckCircle, ShoppingCart, Download, Eye, Lock } from "lucide-react";

interface DocumentPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: {
    id: string;
    title: string;
    description: string;
    price: number;
    features: string[];
  } | null;
  onAddToCart: () => void;
  isInCart: boolean;
}

const documentSamples: Record<string, { sections: { title: string; content: string; blurred?: boolean }[]; tableOfContents: string[] }> = {
  "isms-policy": {
    tableOfContents: [
      "1. Purpose and Scope",
      "2. Information Security Objectives",
      "3. Management Commitment",
      "4. Roles and Responsibilities",
      "5. Risk Assessment Framework",
      "6. Asset Management",
      "7. Access Control Policy",
      "8. Incident Management",
      "9. Business Continuity",
      "10. Compliance Requirements"
    ],
    sections: [
      {
        title: "1. Purpose and Scope",
        content: "This Information Security Management System (ISMS) Policy establishes the framework for managing information security within [Organization Name]. The policy applies to all employees, contractors, third-party users, and any individual with access to organizational information assets.\n\nThe scope encompasses all information assets including but not limited to: electronic data, paper documents, hardware, software, network infrastructure, and cloud services."
      },
      {
        title: "2. Information Security Objectives",
        content: "The organization commits to:\n• Protecting the confidentiality, integrity, and availability of information\n• Ensuring compliance with applicable legal, regulatory, and contractual requirements\n• Maintaining customer trust through robust security practices\n• Continuously improving the ISMS through regular review and assessment"
      },
      {
        title: "3. Management Commitment",
        blurred: true,
        content: "Senior management demonstrates commitment to information security by allocating appropriate resources, defining clear roles and responsibilities, and integrating security requirements into business processes..."
      }
    ]
  },
  "privacy-policy": {
    tableOfContents: [
      "1. Data Controller Information",
      "2. Categories of Personal Data",
      "3. Legal Basis for Processing",
      "4. Data Retention Periods",
      "5. Data Subject Rights",
      "6. International Transfers",
      "7. Security Measures",
      "8. Cookie Policy",
      "9. Third-Party Processors",
      "10. Policy Updates"
    ],
    sections: [
      {
        title: "1. Data Controller Information",
        content: "[Organization Name] (\"we\", \"us\", or \"our\") acts as the data controller for personal data processed in accordance with this Privacy Policy. Our registered address is [Address], and we can be contacted at [Email Address]."
      },
      {
        title: "2. Categories of Personal Data",
        content: "We process the following categories of personal data:\n\n• Identity Data: Name, username, date of birth, identification documents\n• Contact Data: Email address, telephone numbers, postal address\n• Financial Data: Bank account details, payment card information\n• Technical Data: IP address, browser type, device information\n• Usage Data: Information about how you use our website and services"
      },
      {
        title: "3. Legal Basis for Processing",
        blurred: true,
        content: "We process personal data based on the following legal grounds as defined in Article 6 of the GDPR: consent, contractual necessity, legal obligations, vital interests, public interest, and legitimate interests..."
      }
    ]
  },
  "aml-policy": {
    tableOfContents: [
      "1. Policy Statement",
      "2. Regulatory Framework",
      "3. Customer Due Diligence (CDD)",
      "4. Enhanced Due Diligence (EDD)",
      "5. Risk Assessment Methodology",
      "6. Transaction Monitoring",
      "7. Suspicious Activity Reporting",
      "8. Record Keeping",
      "9. Training Requirements",
      "10. Governance Structure"
    ],
    sections: [
      {
        title: "1. Policy Statement",
        content: "[Organization Name] is committed to preventing money laundering, terrorist financing, and other financial crimes. This Anti-Money Laundering (AML) and Know Your Customer (KYC) Policy establishes the framework for identifying, assessing, and managing money laundering risks."
      },
      {
        title: "2. Regulatory Framework",
        content: "This policy is designed to comply with:\n• Financial Action Task Force (FATF) Recommendations\n• EU Anti-Money Laundering Directives (AMLD)\n• Local jurisdiction requirements including [relevant laws]\n• Industry-specific regulations for Virtual Asset Service Providers (VASPs)"
      },
      {
        title: "3. Customer Due Diligence (CDD)",
        blurred: true,
        content: "CDD procedures must be applied when establishing a business relationship, conducting occasional transactions above defined thresholds, or when there is suspicion of money laundering..."
      }
    ]
  },
  "soc2-toolkit": {
    tableOfContents: [
      "1. Trust Service Criteria Overview",
      "2. Security Controls",
      "3. Availability Controls",
      "4. Processing Integrity",
      "5. Confidentiality Controls",
      "6. Privacy Controls",
      "7. Evidence Collection Templates",
      "8. Policy Templates (50+)",
      "9. Gap Analysis Workbook",
      "10. Audit Preparation Checklist"
    ],
    sections: [
      {
        title: "1. Trust Service Criteria Overview",
        content: "This SOC 2 Readiness Toolkit provides comprehensive documentation for achieving SOC 2 Type I and Type II compliance. The toolkit covers all five Trust Service Criteria:\n\n• Security (Common Criteria)\n• Availability\n• Processing Integrity\n• Confidentiality\n• Privacy"
      },
      {
        title: "2. Security Controls",
        content: "The Security criterion (Common Criteria) includes controls for:\n\nCC1: Control Environment\nCC2: Communication and Information\nCC3: Risk Assessment\nCC4: Monitoring Activities\nCC5: Control Activities\nCC6: Logical and Physical Access\nCC7: System Operations\nCC8: Change Management\nCC9: Risk Mitigation"
      },
      {
        title: "3. Availability Controls",
        blurred: true,
        content: "Availability controls ensure that the system is available for operation and use as committed or agreed. This includes capacity planning, incident response, disaster recovery, and business continuity procedures..."
      }
    ]
  },
  "iso27001-toolkit": {
    tableOfContents: [
      "1. ISMS Manual",
      "2. Statement of Applicability",
      "3. Risk Assessment Methodology",
      "4. Risk Treatment Plan",
      "5. Annex A Controls",
      "6. Internal Audit Program",
      "7. Management Review Process",
      "8. Corrective Action Procedures",
      "9. Document Control",
      "10. Continual Improvement"
    ],
    sections: [
      {
        title: "1. ISMS Manual",
        content: "The Information Security Management System (ISMS) Manual provides the overarching framework for managing information security within the organization. This document defines the scope, boundaries, and structure of the ISMS in accordance with ISO/IEC 27001:2022 requirements."
      },
      {
        title: "2. Statement of Applicability",
        content: "The Statement of Applicability (SoA) documents the organization's decisions regarding the implementation of Annex A controls:\n\n• Total Controls: 93 (ISO 27001:2022)\n• Applicable Controls: [To be determined]\n• Not Applicable Controls: [To be determined with justification]\n• Implementation Status: [Implemented/In Progress/Planned]"
      },
      {
        title: "3. Risk Assessment Methodology",
        blurred: true,
        content: "The risk assessment methodology follows a structured approach to identifying, analyzing, and evaluating information security risks. This includes asset identification, threat analysis, vulnerability assessment, and impact/likelihood matrices..."
      }
    ]
  },
  "mica-toolkit": {
    tableOfContents: [
      "1. MiCA Overview",
      "2. Token Classification Guide",
      "3. White Paper Requirements",
      "4. Authorization Procedures",
      "5. Governance Framework",
      "6. Reserve Asset Requirements",
      "7. Client Asset Segregation",
      "8. Market Abuse Prevention",
      "9. Disclosure Obligations",
      "10. Transition Timeline"
    ],
    sections: [
      {
        title: "1. MiCA Overview",
        content: "The Markets in Crypto-Assets Regulation (MiCA) establishes a comprehensive regulatory framework for crypto-assets in the European Union. This toolkit provides essential documentation for achieving and maintaining MiCA compliance."
      },
      {
        title: "2. Token Classification Guide",
        content: "MiCA categorizes crypto-assets into three main types:\n\n• Asset-Referenced Tokens (ARTs): Tokens that reference multiple currencies, commodities, or other assets\n• E-Money Tokens (EMTs): Tokens that reference a single fiat currency\n• Other Crypto-Assets: Including utility tokens and other tokens not classified as ARTs or EMTs"
      },
      {
        title: "3. White Paper Requirements",
        blurred: true,
        content: "The crypto-asset white paper must contain specific information including project description, token characteristics, rights and obligations, risks, technology details, and environmental impact assessment..."
      }
    ]
  },
  "dpa-template": {
    tableOfContents: [
      "1. Definitions",
      "2. Subject Matter and Duration",
      "3. Nature and Purpose of Processing",
      "4. Types of Personal Data",
      "5. Controller Obligations",
      "6. Processor Obligations",
      "7. Sub-Processor Provisions",
      "8. International Transfers",
      "9. Data Breach Notification",
      "10. Audit Rights"
    ],
    sections: [
      {
        title: "1. Definitions",
        content: "For the purposes of this Data Processing Agreement:\n\n\"Controller\" means the entity which determines the purposes and means of processing Personal Data.\n\"Processor\" means the entity which processes Personal Data on behalf of the Controller.\n\"Data Subject\" means an identified or identifiable natural person.\n\"Personal Data\" has the meaning given in Article 4 of the GDPR."
      },
      {
        title: "2. Subject Matter and Duration",
        content: "This Agreement governs the processing of Personal Data by the Processor on behalf of the Controller in connection with [describe services]. The Agreement shall remain in effect for the duration of the Principal Agreement unless terminated earlier in accordance with its terms."
      },
      {
        title: "3. Nature and Purpose of Processing",
        blurred: true,
        content: "The Processor shall process Personal Data only for the specific purposes set forth in this Agreement and strictly in accordance with the Controller's documented instructions..."
      }
    ]
  },
  "nda-template": {
    tableOfContents: [
      "1. Definitions",
      "2. Confidential Information",
      "3. Obligations of Receiving Party",
      "4. Exclusions",
      "5. Permitted Disclosures",
      "6. Term and Termination",
      "7. Return of Information",
      "8. Remedies",
      "9. General Provisions",
      "10. Signatures"
    ],
    sections: [
      {
        title: "1. Definitions",
        content: "\"Disclosing Party\" means the party disclosing Confidential Information.\n\"Receiving Party\" means the party receiving Confidential Information.\n\"Confidential Information\" means any information disclosed by the Disclosing Party that is designated as confidential or that reasonably should be understood to be confidential."
      },
      {
        title: "2. Confidential Information",
        content: "Confidential Information includes, but is not limited to:\n• Trade secrets and proprietary information\n• Business plans and financial information\n• Customer and supplier lists\n• Technical data and specifications\n• Marketing strategies and pricing\n• Any other information marked as \"Confidential\""
      },
      {
        title: "3. Obligations of Receiving Party",
        blurred: true,
        content: "The Receiving Party shall hold and maintain the Confidential Information in strict confidence, using the same degree of care as it uses to protect its own confidential information, but no less than reasonable care..."
      }
    ]
  },
  "terms-conditions": {
    tableOfContents: [
      "1. Acceptance of Terms",
      "2. User Eligibility",
      "3. Account Registration",
      "4. Acceptable Use Policy",
      "5. Intellectual Property",
      "6. User Content",
      "7. Payment Terms",
      "8. Limitation of Liability",
      "9. Dispute Resolution",
      "10. Termination"
    ],
    sections: [
      {
        title: "1. Acceptance of Terms",
        content: "By accessing or using [Platform Name] (\"the Platform\"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, you may not access or use the Platform. We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting."
      },
      {
        title: "2. User Eligibility",
        content: "To use the Platform, you must:\n• Be at least 18 years of age\n• Have the legal capacity to enter into binding agreements\n• Not be prohibited from using the Platform under applicable laws\n• Provide accurate and complete registration information"
      },
      {
        title: "3. Account Registration",
        blurred: true,
        content: "Users must register for an account to access certain features of the Platform. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account..."
      }
    ]
  },
  "tokenomics-template": {
    tableOfContents: [
      "1. Token Overview",
      "2. Token Economics Model",
      "3. Distribution Schedule",
      "4. Vesting Mechanisms",
      "5. Utility Framework",
      "6. Governance Rights",
      "7. Securities Analysis",
      "8. Regulatory Considerations",
      "9. Economic Incentives",
      "10. Risk Disclosures"
    ],
    sections: [
      {
        title: "1. Token Overview",
        content: "[Token Name] (\"TOKEN\") is a [utility/governance] token designed to [primary purpose]. The token operates on [blockchain network] and follows the [token standard, e.g., ERC-20] specification.\n\nTotal Supply: [Amount]\nCirculating Supply at Launch: [Amount]\nToken Contract: [Address]"
      },
      {
        title: "2. Token Economics Model",
        content: "The tokenomics model is designed to create sustainable value through:\n\n• Deflationary Mechanisms: [Describe burning, buyback mechanisms]\n• Staking Rewards: [Describe staking program]\n• Fee Distribution: [Describe how fees benefit holders]\n• Treasury Management: [Describe treasury allocation]"
      },
      {
        title: "3. Distribution Schedule",
        blurred: true,
        content: "The token distribution allocates tokens across various stakeholder groups including team, investors, community, ecosystem development, and reserves. Each allocation has specific vesting periods and unlock schedules..."
      }
    ]
  },
  "whitepaper-template": {
    tableOfContents: [
      "1. Executive Summary",
      "2. Problem Statement",
      "3. Solution Overview",
      "4. Technology Architecture",
      "5. Token Utility",
      "6. Market Analysis",
      "7. Roadmap",
      "8. Team",
      "9. Risk Factors",
      "10. Legal Disclaimers"
    ],
    sections: [
      {
        title: "1. Executive Summary",
        content: "[Project Name] is building [one-sentence description of what you're building]. Our mission is to [mission statement]. This white paper outlines our vision, technology, tokenomics, and roadmap for achieving [key objectives]."
      },
      {
        title: "2. Problem Statement",
        content: "The current [industry/market] faces significant challenges:\n\n• [Problem 1]: Description of the first major problem\n• [Problem 2]: Description of the second major problem\n• [Problem 3]: Description of the third major problem\n\nThese challenges create [negative outcomes] for [target users/businesses]."
      },
      {
        title: "3. Solution Overview",
        blurred: true,
        content: "Our solution addresses these challenges through a decentralized platform that leverages blockchain technology to provide transparency, security, and efficiency. The platform consists of three core components..."
      }
    ]
  },
  "dao-governance": {
    tableOfContents: [
      "1. DAO Constitution",
      "2. Membership Rights",
      "3. Governance Token",
      "4. Proposal Process",
      "5. Voting Mechanisms",
      "6. Quorum Requirements",
      "7. Treasury Management",
      "8. Committee Structure",
      "9. Dispute Resolution",
      "10. Amendment Procedures"
    ],
    sections: [
      {
        title: "1. DAO Constitution",
        content: "The [DAO Name] Decentralized Autonomous Organization (\"the DAO\") is established as a community-governed organization operating on [blockchain network]. This Constitution sets forth the fundamental principles, rights, and procedures governing the DAO's operations."
      },
      {
        title: "2. Membership Rights",
        content: "DAO membership is determined by holding [Governance Token]. Members are entitled to:\n\n• Submit proposals for community consideration\n• Vote on governance proposals\n• Participate in working groups and committees\n• Access member-exclusive resources and communications\n• Receive proportional share of any distributions"
      },
      {
        title: "3. Governance Token",
        blurred: true,
        content: "The [Token Name] governance token represents voting power within the DAO. Voting power is calculated based on token holdings at the time of proposal snapshot. Delegation of voting power is permitted through on-chain mechanisms..."
      }
    ]
  }
};

export const DocumentPreviewDialog = ({
  open,
  onOpenChange,
  document,
  onAddToCart,
  isInCart
}: DocumentPreviewDialogProps) => {
  if (!document) return null;

  const sample = documentSamples[document.id] || {
    tableOfContents: ["1. Introduction", "2. Scope", "3. Definitions", "4. Requirements", "5. Implementation"],
    sections: [
      { title: "1. Introduction", content: "This document provides a comprehensive framework for [topic]. It is designed to help organizations establish clear policies and procedures." },
      { title: "2. Scope", content: "This document applies to all aspects of [scope area] within the organization. It covers operational procedures, compliance requirements, and best practices.", blurred: true }
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-primary/10 text-primary w-fit">
              <Eye className="w-3 h-3 mr-1" />
              Preview
            </Badge>
            <span className="text-2xl font-bold text-primary">${document.price}</span>
          </div>
          <DialogTitle className="text-xl md:text-2xl">{document.title}</DialogTitle>
          <DialogDescription>{document.description}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden grid md:grid-cols-[250px,1fr] gap-4">
          {/* Table of Contents */}
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Table of Contents
            </h4>
            <ul className="space-y-2 text-sm">
              {sample.tableOfContents.map((item, i) => (
                <li key={i} className="text-muted-foreground hover:text-foreground transition-colors cursor-default">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Content Preview */}
          <ScrollArea className="h-[400px] border border-border rounded-lg p-4">
            <div className="space-y-6 pr-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground border-b border-border pb-3">
                <Download className="w-4 h-4" />
                <span>Sample preview - Purchase for full editable document</span>
              </div>

              {sample.sections.map((section, i) => (
                <div key={i} className="space-y-2">
                  <h5 className="font-semibold text-foreground">{section.title}</h5>
                  <div className={`relative ${section.blurred ? 'select-none' : ''}`}>
                    <p className={`text-sm text-muted-foreground whitespace-pre-line leading-relaxed ${section.blurred ? 'blur-sm' : ''}`}>
                      {section.content}
                    </p>
                    {section.blurred && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[2px] rounded">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground bg-muted px-4 py-2 rounded-full shadow-sm">
                          <Lock className="w-4 h-4 text-primary" />
                          Purchase to unlock full content
                        </div>
                      </div>
                    )}
                  </div>
                  {i < sample.sections.length - 1 && <Separator className="my-4" />}
                </div>
              ))}

              <div className="border border-dashed border-border rounded-lg p-6 text-center bg-muted/20 mt-6">
                <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Purchase this template to access the complete document with all sections, 
                  implementation guides, and editable formats.
                </p>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Features & CTA */}
        <div className="flex-shrink-0 pt-4 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {document.features.map((feature, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  <CheckCircle className="w-3 h-3 mr-1 text-primary" />
                  {feature}
                </Badge>
              ))}
            </div>
            <Button 
              size="lg"
              className="gap-2"
              variant={isInCart ? "secondary" : "default"}
              onClick={() => {
                onAddToCart();
                onOpenChange(false);
              }}
            >
              {isInCart ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart - ${document.price}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
