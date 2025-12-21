import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, CheckCircle, ShoppingCart, Download, Eye, Lock, Shield, Scale, Globe, Building, AlertTriangle, Coins, Users, Leaf, GraduationCap } from "lucide-react";

interface DocumentPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: {
    id: string;
    title: string;
    description: string;
    price: number;
    type?: "framework" | "policy";
    features: string[];
  } | null;
  onAddToCart: () => void;
  isInCart: boolean;
}

interface PreviewContent {
  sections: { title: string; content: string; blurred?: boolean }[];
  tableOfContents: string[];
}

const documentPreviews: Record<string, PreviewContent> = {
  // ISMS Category
  "nist-csf-framework": {
    tableOfContents: [
      "1. Framework Overview",
      "2. Core Functions",
      "3. Implementation Tiers",
      "4. Framework Profiles",
      "5. Risk Management Framework",
      "6. Continuous Monitoring",
      "7. Control Mapping",
      "8. Assessment Methodology"
    ],
    sections: [
      {
        title: "1. Framework Overview",
        content: "The NIST Cybersecurity Framework provides a policy framework of computer security guidance for organizations to assess and improve their ability to prevent, detect, and respond to cyber attacks. This implementation package includes comprehensive documentation for deploying the framework across your organization."
      },
      {
        title: "2. Core Functions",
        content: "The framework consists of five core functions:\n\n• IDENTIFY – Develop organizational understanding to manage cybersecurity risk\n• PROTECT – Develop and implement appropriate safeguards\n• DETECT – Develop and implement activities to identify cybersecurity events\n• RESPOND – Develop and implement activities to take action\n• RECOVER – Develop and implement activities to maintain resilience"
      },
      {
        title: "3. Implementation Tiers",
        blurred: true,
        content: "Implementation Tiers describe the degree to which an organization's cybersecurity risk management practices exhibit the characteristics defined in the Framework. Tiers range from Partial (Tier 1) to Adaptive (Tier 4)..."
      }
    ]
  },
  "nist-csf-policies": {
    tableOfContents: [
      "1. Identify Function Policy",
      "2. Protect Function Policy",
      "3. Detect Function Policy",
      "4. Respond Function Policy",
      "5. Recover Function Policy",
      "6. Control Mapping Documentation",
      "7. Maturity Assessment Methodology"
    ],
    sections: [
      {
        title: "1. Identify Function Policy",
        content: "The Identify Function Policy establishes requirements for Asset Management and Risk Assessment activities. This policy ensures the organization maintains a comprehensive understanding of its business context, resources, and cybersecurity risks.\n\nScope: All information assets, systems, and data within the organizational boundary."
      },
      {
        title: "2. Protect Function Policy",
        content: "The Protect Function Policy defines requirements for:\n\n• Access Control mechanisms and procedures\n• Data Security classification and handling\n• Information Protection Processes and Procedures\n• Maintenance and repair activities\n• Protective Technology implementation"
      },
      {
        title: "3. Detect Function Policy",
        blurred: true,
        content: "The Detect Function Policy establishes requirements for Anomaly Detection, Security Monitoring, and Detection Processes. Organizations must implement continuous monitoring capabilities..."
      }
    ]
  },
  "iso27001-framework": {
    tableOfContents: [
      "1. ISMS Scope and Boundaries",
      "2. Leadership and Commitment",
      "3. Risk Assessment Methodology",
      "4. Risk Treatment Process",
      "5. Internal Audit Framework",
      "6. Management Review Process",
      "7. Continual Improvement",
      "8. Documentation Requirements"
    ],
    sections: [
      {
        title: "1. ISMS Scope and Boundaries",
        content: "The Information Security Management System (ISMS) Framework defines the scope, boundaries, and structure for managing information security in accordance with ISO/IEC 27001:2022. This framework encompasses all information assets, processes, and systems within the defined organizational scope."
      },
      {
        title: "2. Leadership and Commitment",
        content: "Top management demonstrates leadership and commitment by:\n\n• Establishing information security policy and objectives\n• Integrating ISMS requirements into business processes\n• Ensuring resources are available for the ISMS\n• Communicating the importance of information security\n• Ensuring the ISMS achieves its intended outcomes"
      },
      {
        title: "3. Risk Assessment Methodology",
        blurred: true,
        content: "The risk assessment methodology follows a structured approach including asset identification, threat analysis, vulnerability assessment, impact determination, and likelihood assessment..."
      }
    ]
  },
  "iso27001-policies": {
    tableOfContents: [
      "1. Information Security Policy (Master)",
      "2. Access Control Policy",
      "3. Asset Management Policy",
      "4. Cryptography Policy",
      "5-10. Security Operation Policies",
      "11-15. HR and Physical Security",
      "16-20. Technical Security Policies",
      "21-25. Compliance Policies",
      "26. Statement of Applicability"
    ],
    sections: [
      {
        title: "1. Information Security Policy (Master)",
        content: "This Information Security Policy establishes the framework for managing information security within [Organization Name]. The policy applies to all employees, contractors, third-party users, and any individual with access to organizational information assets.\n\nObjectives:\n• Protect confidentiality, integrity, and availability\n• Ensure regulatory compliance\n• Maintain stakeholder trust"
      },
      {
        title: "2. Access Control Policy",
        content: "The Access Control Policy defines requirements for:\n\n• User access management and provisioning\n• Privileged access controls\n• Password and authentication requirements\n• Access review and recertification\n• Remote access security\n• Mobile device access controls"
      },
      {
        title: "3. Asset Management Policy",
        blurred: true,
        content: "The Asset Management Policy establishes requirements for the identification, classification, and protection of information assets throughout their lifecycle..."
      }
    ]
  },
  "soc2-framework": {
    tableOfContents: [
      "1. Trust Services Criteria Overview",
      "2. Common Criteria (CC1-CC9)",
      "3. Security Criteria",
      "4. Availability Criteria",
      "5. Processing Integrity Criteria",
      "6. Confidentiality Criteria",
      "7. Privacy Criteria",
      "8. Evidence Collection Framework"
    ],
    sections: [
      {
        title: "1. Trust Services Criteria Overview",
        content: "This SOC 2 Framework provides comprehensive documentation for achieving SOC 2 Type I and Type II compliance. The framework covers all five Trust Service Criteria as defined by the AICPA:\n\n• Security (Common Criteria)\n• Availability\n• Processing Integrity\n• Confidentiality\n• Privacy"
      },
      {
        title: "2. Common Criteria (CC1-CC9)",
        content: "The Common Criteria include:\n\nCC1: Control Environment\nCC2: Communication and Information\nCC3: Risk Assessment\nCC4: Monitoring Activities\nCC5: Control Activities\nCC6: Logical and Physical Access\nCC7: System Operations\nCC8: Change Management\nCC9: Risk Mitigation"
      },
      {
        title: "3. Security Criteria",
        blurred: true,
        content: "Security controls protect the system against unauthorized access, use, or modification. This includes both logical access controls (authentication, authorization) and physical access controls..."
      }
    ]
  },
  "soc2-policies": {
    tableOfContents: [
      "1. Security Policies (CC6.1-CC6.8)",
      "2. Availability Policies (A1.1-A1.3)",
      "3. Processing Integrity Policies",
      "4. Confidentiality Policies",
      "5. Privacy Policies (P1.1-P8.1)",
      "6. Change Management Policy",
      "7. Vendor Management Policy",
      "8. System Description Template"
    ],
    sections: [
      {
        title: "1. Security Policies (CC6.1-CC6.8)",
        content: "Security policies addressing the Common Criteria include:\n\n• CC6.1: Logical and physical access controls\n• CC6.2: System user registration and authorization\n• CC6.3: Authentication mechanism management\n• CC6.4: Access removal upon termination\n• CC6.5: Encryption for data in transit\n• CC6.6: Secure system boundaries\n• CC6.7: Malware protection\n• CC6.8: Infrastructure and software changes"
      },
      {
        title: "2. Availability Policies",
        content: "Availability policies ensure the system is available for operation as committed:\n\n• A1.1: Capacity planning and performance monitoring\n• A1.2: Environmental protection and recovery procedures\n• A1.3: Business continuity and disaster recovery"
      },
      {
        title: "3. Processing Integrity Policies",
        blurred: true,
        content: "Processing integrity policies ensure system processing is complete, valid, accurate, timely, and authorized..."
      }
    ]
  },
  "iso22301-framework": {
    tableOfContents: [
      "1. BCMS Scope and Context",
      "2. Business Impact Analysis",
      "3. Risk Assessment for BCM",
      "4. Business Continuity Strategy",
      "5. Incident Response Procedures",
      "6. Recovery Procedures",
      "7. Exercise and Testing",
      "8. Management Review"
    ],
    sections: [
      {
        title: "1. BCMS Scope and Context",
        content: "The Business Continuity Management System (BCMS) Framework establishes the organizational approach to building resilience and ensuring critical business functions can continue during and after disruption. This framework is aligned with ISO 22301:2019 requirements."
      },
      {
        title: "2. Business Impact Analysis",
        content: "The Business Impact Analysis (BIA) Framework includes:\n\n• Identification of critical business processes\n• Determination of Maximum Tolerable Period of Disruption (MTPD)\n• Resource requirements for recovery\n• Dependencies and interdependencies\n• Financial and operational impact assessment"
      },
      {
        title: "3. Risk Assessment for BCM",
        blurred: true,
        content: "Risk assessment for business continuity identifies threats and vulnerabilities that could disrupt critical business processes and evaluates the likelihood and potential impact..."
      }
    ]
  },
  "iso22301-policies": {
    tableOfContents: [
      "1. Business Continuity Policy",
      "2. Disaster Recovery Policy",
      "3. Crisis Management Policy",
      "4. Emergency Response Policy",
      "5. Communication Policy",
      "6. IT Service Continuity Policy",
      "7. RTO/RPO Matrices"
    ],
    sections: [
      {
        title: "1. Business Continuity Policy",
        content: "[Organization Name] is committed to ensuring the continuity of critical business operations during and after disruptive incidents. This policy establishes the framework for identifying critical processes, developing continuity strategies, and maintaining organizational resilience."
      },
      {
        title: "2. Disaster Recovery Policy",
        content: "The Disaster Recovery Policy defines requirements for:\n\n• IT system recovery procedures\n• Data backup and restoration\n• Alternate processing facilities\n• Recovery time and point objectives\n• Testing and validation of recovery capabilities"
      },
      {
        title: "3. Crisis Management Policy",
        blurred: true,
        content: "The Crisis Management Policy establishes the organizational structure and procedures for managing crises, including crisis team activation, decision-making authority, and stakeholder communication..."
      }
    ]
  },

  // Data Protection Category
  "gdpr-framework": {
    tableOfContents: [
      "1. Data Protection Principles",
      "2. Lawful Basis for Processing",
      "3. Data Subject Rights",
      "4. Privacy by Design",
      "5. Data Protection Impact Assessment",
      "6. International Data Transfers",
      "7. Third-Party Management",
      "8. Breach Response Framework"
    ],
    sections: [
      {
        title: "1. Data Protection Principles",
        content: "The GDPR establishes seven key principles for processing personal data:\n\n1. Lawfulness, fairness, and transparency\n2. Purpose limitation\n3. Data minimization\n4. Accuracy\n5. Storage limitation\n6. Integrity and confidentiality\n7. Accountability"
      },
      {
        title: "2. Lawful Basis for Processing",
        content: "Processing of personal data must be based on one of six legal grounds:\n\n• Consent of the data subject\n• Performance of a contract\n• Compliance with a legal obligation\n• Protection of vital interests\n• Performance of a public task\n• Legitimate interests (with balancing test)"
      },
      {
        title: "3. Data Subject Rights",
        blurred: true,
        content: "Data subjects have the following rights under GDPR: right to be informed, right of access, right to rectification, right to erasure, right to restrict processing, right to data portability..."
      }
    ]
  },
  "gdpr-policies": {
    tableOfContents: [
      "1. Data Protection Policy (Master)",
      "2. Data Processing Policy",
      "3. Data Retention Policy",
      "4. Data Breach Response Policy",
      "5. Data Subject Rights Policy",
      "6. Privacy by Design Policy",
      "7. Data Transfer Policy",
      "8. Consent Management Policy",
      "9. Third-Party Processing Policy",
      "10. Records of Processing Activities"
    ],
    sections: [
      {
        title: "1. Data Protection Policy (Master)",
        content: "[Organization Name] is committed to protecting personal data in accordance with the General Data Protection Regulation (GDPR). This policy establishes the principles, procedures, and responsibilities for ensuring lawful, fair, and transparent processing of personal data."
      },
      {
        title: "2. Data Processing Policy",
        content: "This policy defines requirements for:\n\n• Identifying lawful basis for processing\n• Documenting processing activities\n• Implementing appropriate technical measures\n• Ensuring data quality and accuracy\n• Limiting data retention periods\n• Securing personal data processing"
      },
      {
        title: "3. Data Retention Policy",
        blurred: true,
        content: "Personal data shall be kept in a form which permits identification of data subjects for no longer than is necessary for the purposes for which the personal data are processed..."
      }
    ]
  },
  "ndpr-framework": {
    tableOfContents: [
      "1. NITDA Compliance Requirements",
      "2. DPCO Framework",
      "3. Annual Audit Requirements",
      "4. Data Protection Principles",
      "5. Consent Requirements",
      "6. Data Subject Rights (Nigeria)",
      "7. Cross-Border Transfers",
      "8. Breach Notification (72-hour)"
    ],
    sections: [
      {
        title: "1. NITDA Compliance Requirements",
        content: "The Nigeria Data Protection Regulation (NDPR) requires all organizations processing personal data of Nigerian citizens to comply with specific requirements set by the National Information Technology Development Agency (NITDA).\n\nApplicability: All data controllers and processors handling Nigerian personal data."
      },
      {
        title: "2. DPCO Framework",
        content: "Organizations must designate a Data Protection Compliance Organization (DPCO) responsible for:\n\n• Ensuring NDPR compliance\n• Conducting annual data protection audits\n• Filing audit reports with NITDA\n• Managing data subject requests\n• Maintaining records of processing activities"
      },
      {
        title: "3. Annual Audit Requirements",
        blurred: true,
        content: "All data controllers must conduct an annual data protection audit and submit the report to NITDA. The audit must cover all processing activities, security measures, and compliance status..."
      }
    ]
  },
  "ndpr-policies": {
    tableOfContents: [
      "1. NDPR Compliance Policy",
      "2. Data Protection Policy (Nigeria)",
      "3. Consent Management Policy",
      "4. Data Subject Rights Policy",
      "5. Third-Party Processor Policy",
      "6. Data Security Policy",
      "7. Breach Notification Policy",
      "8. International Transfer Policy",
      "9. Employee Data Protection",
      "10. Vendor Management Policy"
    ],
    sections: [
      {
        title: "1. NDPR Compliance Policy",
        content: "[Organization Name] is committed to complying with the Nigeria Data Protection Regulation (NDPR) 2019 and subsequent amendments. This policy establishes our commitment to protecting the personal data of Nigerian data subjects and ensuring lawful processing."
      },
      {
        title: "2. Data Protection Policy (Nigeria)",
        content: "This policy covers:\n\n• Lawful basis for processing Nigerian personal data\n• Data minimization and purpose limitation\n• Accuracy and storage limitation principles\n• Security of personal data\n• Accountability and governance requirements"
      },
      {
        title: "3. Consent Management Policy",
        blurred: true,
        content: "Consent must be obtained before processing personal data unless another lawful basis applies. Consent must be freely given, specific, informed, and unambiguous..."
      }
    ]
  },
  "ccpa-framework": {
    tableOfContents: [
      "1. CCPA/CPRA Overview",
      "2. Consumer Rights Framework",
      "3. Data Sale Opt-Out Framework",
      "4. DSAR Processing Framework",
      "5. Verification Procedures",
      "6. Service Provider Requirements",
      "7. Privacy Notice Requirements",
      "8. Enforcement and Penalties"
    ],
    sections: [
      {
        title: "1. CCPA/CPRA Overview",
        content: "The California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) establish privacy rights for California residents. This framework covers requirements for businesses that collect, sell, or share personal information of California consumers."
      },
      {
        title: "2. Consumer Rights Framework",
        content: "California consumers have the following rights:\n\n• Right to Know what personal information is collected\n• Right to Delete personal information\n• Right to Opt-Out of sale or sharing\n• Right to Correct inaccurate information\n• Right to Limit use of sensitive information\n• Right to Non-Discrimination for exercising rights"
      },
      {
        title: "3. Data Sale Opt-Out Framework",
        blurred: true,
        content: "Businesses that sell or share personal information must provide a 'Do Not Sell or Share My Personal Information' link on their website and honor opt-out requests..."
      }
    ]
  },
  "ccpa-policies": {
    tableOfContents: [
      "1. CCPA Compliance Policy",
      "2. Consumer Rights Policy",
      "3. Do Not Sell Policy",
      "4. Data Sale and Sharing Policy",
      "5. Service Provider Policy",
      "6. Privacy Notice Policy",
      "7. Opt-Out Mechanism Policy"
    ],
    sections: [
      {
        title: "1. CCPA Compliance Policy",
        content: "[Organization Name] is committed to complying with the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA). This policy establishes procedures for protecting the privacy rights of California consumers."
      },
      {
        title: "2. Consumer Rights Policy",
        content: "This policy establishes procedures for handling:\n\n• Right to Know requests (categories and specific pieces)\n• Right to Delete requests\n• Right to Opt-Out requests\n• Right to Correct requests\n• Verification of consumer identity\n• Response timeframes (45 days)"
      },
      {
        title: "3. Do Not Sell Policy",
        blurred: true,
        content: "We respect consumer choices regarding the sale or sharing of their personal information. Consumers may opt out at any time using the designated mechanisms..."
      }
    ]
  },
  "blockchain-privacy": {
    tableOfContents: [
      "1. On-Chain Privacy Principles",
      "2. Zero-Knowledge Implementations",
      "3. Immutable Ledger Considerations",
      "4. Data Minimization Strategies",
      "5. Pseudonymization Approaches",
      "6. Right to Erasure Solutions",
      "7. Smart Contract Privacy",
      "8. Compliance Mapping"
    ],
    sections: [
      {
        title: "1. On-Chain Privacy Principles",
        content: "Blockchain technology presents unique privacy challenges due to its transparent and immutable nature. This framework establishes principles for protecting personal data while leveraging blockchain's benefits for security and trust."
      },
      {
        title: "2. Zero-Knowledge Implementations",
        content: "Zero-knowledge proofs enable privacy-preserving verification:\n\n• Identity verification without revealing identity data\n• Compliance checks without exposing transaction details\n• Age or jurisdiction verification\n• Accreditation status verification\n• Selective disclosure mechanisms"
      },
      {
        title: "3. Immutable Ledger Considerations",
        blurred: true,
        content: "Managing the conflict between blockchain immutability and data protection rights requires careful architecture design, including off-chain storage, encryption, and access control mechanisms..."
      }
    ]
  },

  // Industry-Specific Category
  "nigeria-finserv-framework": {
    tableOfContents: [
      "1. CBN Regulatory Requirements",
      "2. Banking Security Standards",
      "3. Fintech Regulatory Framework",
      "4. Payment Processor Security",
      "5. Risk Management Requirements",
      "6. Capital Requirements",
      "7. Reporting Obligations",
      "8. Consumer Protection"
    ],
    sections: [
      {
        title: "1. CBN Regulatory Requirements",
        content: "The Central Bank of Nigeria (CBN) establishes regulatory requirements for financial institutions operating in Nigeria. This framework covers compliance requirements for banks, payment service providers, and fintech companies."
      },
      {
        title: "2. Banking Security Standards",
        content: "Nigerian financial institutions must implement:\n\n• Information security management systems\n• Cybersecurity frameworks aligned with CBN guidelines\n• Fraud detection and prevention systems\n• Business continuity and disaster recovery\n• Third-party risk management\n• Customer authentication requirements"
      },
      {
        title: "3. Fintech Regulatory Framework",
        blurred: true,
        content: "Fintech companies operating in Nigeria must comply with specific CBN regulations including licensing requirements, capital adequacy, technology risk management, and consumer protection obligations..."
      }
    ]
  },
  "nigeria-finserv-policies": {
    tableOfContents: [
      "1. CBN Regulatory Compliance Policy",
      "2. Payment Processor Security Policy",
      "3. Investment Platform Compliance",
      "4. Banking Security Standards",
      "5. Financial Crime Prevention",
      "6. Customer Due Diligence Policy"
    ],
    sections: [
      {
        title: "1. CBN Regulatory Compliance Policy",
        content: "[Organization Name] is committed to full compliance with Central Bank of Nigeria regulations and guidelines. This policy establishes our framework for maintaining regulatory compliance and managing regulatory relationships."
      },
      {
        title: "2. Payment Processor Security Policy",
        content: "This policy establishes security requirements for:\n\n• Transaction processing security\n• Encryption and key management\n• Access control and authentication\n• Fraud detection and monitoring\n• Incident response procedures\n• Third-party integration security"
      },
      {
        title: "3. Financial Crime Prevention",
        blurred: true,
        content: "We implement comprehensive controls to prevent financial crime including fraud, money laundering, and terrorist financing. This includes transaction monitoring, suspicious activity reporting..."
      }
    ]
  },
  "pci-dss-framework": {
    tableOfContents: [
      "1. PCI DSS Overview",
      "2. Cardholder Data Environment",
      "3. Network Segmentation",
      "4. 12 Requirements Framework",
      "5. Quarterly Validation",
      "6. Annual Assessment",
      "7. Compensating Controls",
      "8. Evidence Requirements"
    ],
    sections: [
      {
        title: "1. PCI DSS Overview",
        content: "The Payment Card Industry Data Security Standard (PCI DSS) is a set of security standards designed to ensure that all companies that accept, process, store, or transmit credit card information maintain a secure environment. This framework covers PCI DSS v4.0 requirements."
      },
      {
        title: "2. Cardholder Data Environment",
        content: "The Cardholder Data Environment (CDE) includes:\n\n• Systems that store, process, or transmit cardholder data\n• Systems connected to or providing security services to the CDE\n• Network segments with access to the CDE\n• All people, processes, and technologies interacting with CHD"
      },
      {
        title: "3. Network Segmentation",
        blurred: true,
        content: "Proper network segmentation reduces the scope of PCI DSS assessment by isolating the CDE from other network segments. This includes firewall configurations, VLAN separation, and access control lists..."
      }
    ]
  },
  "pci-dss-policies": {
    tableOfContents: [
      "1. PCI DSS Compliance Policy",
      "2. Network Segmentation Policy",
      "3. Cardholder Data Protection",
      "4. Access Control Policy",
      "5. Encryption Policy",
      "6. Vulnerability Management",
      "7. Secure Configuration",
      "8. Physical Security Policy",
      "9. Logging and Monitoring",
      "10. Incident Response Policy",
      "11. Penetration Testing Policy",
      "12. Wireless Security Policy"
    ],
    sections: [
      {
        title: "1. PCI DSS Compliance Policy",
        content: "[Organization Name] is committed to protecting cardholder data and maintaining compliance with the Payment Card Industry Data Security Standard (PCI DSS). This master policy establishes our framework for achieving and maintaining PCI DSS compliance."
      },
      {
        title: "2. Network Segmentation Policy",
        content: "This policy establishes requirements for:\n\n• CDE boundary definition and documentation\n• Firewall and router configurations\n• Network access controls\n• Segmentation testing requirements\n• Change management for network changes\n• Annual segmentation validation"
      },
      {
        title: "3. Cardholder Data Protection",
        blurred: true,
        content: "Cardholder data must be protected throughout its lifecycle. This includes restrictions on data storage, encryption requirements for transmission, and secure disposal procedures..."
      }
    ]
  },
  "telecom-nigeria-framework": {
    tableOfContents: [
      "1. NITDA Telecommunications Requirements",
      "2. Infrastructure Security",
      "3. Service Availability Standards",
      "4. Quality of Service",
      "5. Data Retention Requirements",
      "6. Consumer Protection",
      "7. Interconnection Security",
      "8. Emergency Communications"
    ],
    sections: [
      {
        title: "1. NITDA Telecommunications Requirements",
        content: "Nigerian telecommunications operators must comply with regulations established by the National Information Technology Development Agency (NITDA) and Nigerian Communications Commission (NCC). This framework covers security, availability, and compliance requirements."
      },
      {
        title: "2. Infrastructure Security",
        content: "Infrastructure security requirements include:\n\n• Physical security of telecommunications facilities\n• Network security and access controls\n• Cybersecurity incident management\n• Business continuity and disaster recovery\n• Third-party and vendor security\n• Employee security awareness"
      },
      {
        title: "3. Service Availability Standards",
        blurred: true,
        content: "Telecommunications operators must maintain specified service availability levels and report outages to regulatory authorities. This includes network redundancy, failover capabilities..."
      }
    ]
  },
  "hitrust-csf-framework": {
    tableOfContents: [
      "1. HITRUST CSF Overview",
      "2. Control Categories",
      "3. Implementation Requirements",
      "4. Assessment Methodology",
      "5. PHI Protection Framework",
      "6. Healthcare Security",
      "7. HIPAA Mapping",
      "8. Certification Process"
    ],
    sections: [
      {
        title: "1. HITRUST CSF Overview",
        content: "The HITRUST Common Security Framework (CSF) provides a comprehensive, certifiable framework for managing information security in healthcare and other industries. This framework integrates requirements from multiple standards including HIPAA, NIST, ISO, and PCI."
      },
      {
        title: "2. Control Categories",
        content: "HITRUST CSF includes 14 control categories:\n\n• Information Protection Program\n• Endpoint Protection\n• Portable Media Security\n• Mobile Device Security\n• Wireless Security\n• Configuration Management\n• Vulnerability Management\n• Network Protection\n• Password Management\n• Access Control\n• Audit Logging and Monitoring\n• Education and Awareness\n• Third Party Assurance\n• Incident Management"
      },
      {
        title: "3. Implementation Requirements",
        blurred: true,
        content: "Implementation requirements vary by organization size, regulatory environment, and risk factors. Organizations must assess their requirements level and implement appropriate controls..."
      }
    ]
  },
  "hitrust-policies": {
    tableOfContents: [
      "1. HITRUST Compliance Policy",
      "2. PHI Policy",
      "3. Healthcare Data Security",
      "4. BAA Policy",
      "5. HIPAA Alignment Policy",
      "6. Medical Device Security",
      "7. Assessment Documentation"
    ],
    sections: [
      {
        title: "1. HITRUST Compliance Policy",
        content: "[Organization Name] is committed to achieving and maintaining HITRUST CSF certification. This policy establishes our framework for implementing required controls and undergoing periodic assessment and certification."
      },
      {
        title: "2. PHI Policy",
        content: "Protected Health Information (PHI) must be:\n\n• Identified and classified appropriately\n• Protected with appropriate safeguards\n• Accessed only by authorized individuals\n• Transmitted securely when required\n• Disposed of securely when no longer needed\n• Subject to breach notification if compromised"
      },
      {
        title: "3. Healthcare Data Security",
        blurred: true,
        content: "Healthcare data security encompasses administrative, physical, and technical safeguards to protect the confidentiality, integrity, and availability of electronic protected health information..."
      }
    ]
  },

  // Cybersecurity Category
  "vapt-framework": {
    tableOfContents: [
      "1. Vulnerability Management Program",
      "2. Assessment Methodology",
      "3. Penetration Testing Approach",
      "4. Scope Definition",
      "5. Testing Procedures",
      "6. Remediation Process",
      "7. Validation Testing",
      "8. Reporting Requirements"
    ],
    sections: [
      {
        title: "1. Vulnerability Management Program",
        content: "The Vulnerability Assessment and Penetration Testing (VAPT) Framework establishes a comprehensive approach to identifying, assessing, and remediating security vulnerabilities. This program ensures continuous security improvement through systematic testing and validation."
      },
      {
        title: "2. Assessment Methodology",
        content: "Our assessment methodology includes:\n\n• Asset discovery and enumeration\n• Automated vulnerability scanning\n• Manual vulnerability verification\n• Risk rating and prioritization\n• Remediation recommendations\n• Trend analysis and reporting"
      },
      {
        title: "3. Penetration Testing Approach",
        blurred: true,
        content: "Penetration testing simulates real-world attacks to identify exploitable vulnerabilities. Our approach includes reconnaissance, scanning, exploitation, post-exploitation, and detailed reporting..."
      }
    ]
  },
  "vapt-policies": {
    tableOfContents: [
      "1. Vulnerability Management Policy",
      "2. Penetration Testing Policy",
      "3. Remediation Policy",
      "4. Security Testing Policy",
      "5. Rules of Engagement",
      "6. Testing Procedures",
      "7. Remediation Tracking"
    ],
    sections: [
      {
        title: "1. Vulnerability Management Policy",
        content: "[Organization Name] maintains a comprehensive vulnerability management program to identify, assess, and remediate security vulnerabilities in a timely manner. This policy establishes requirements for vulnerability scanning, assessment, and remediation."
      },
      {
        title: "2. Penetration Testing Policy",
        content: "Penetration testing requirements include:\n\n• Annual external penetration testing\n• Annual internal penetration testing\n• Testing after significant changes\n• Third-party testing by qualified firms\n• Defined scope and rules of engagement\n• Remediation and retesting requirements"
      },
      {
        title: "3. Remediation Policy",
        blurred: true,
        content: "Vulnerabilities must be remediated within defined timeframes based on severity: Critical within 24-48 hours, High within 7-14 days, Medium within 30 days, Low within 90 days..."
      }
    ]
  },
  "smart-contract-framework": {
    tableOfContents: [
      "1. Smart Contract Audit Program",
      "2. Audit Methodology",
      "3. Multi-Firm Coordination",
      "4. Formal Verification",
      "5. Vulnerability Classification",
      "6. Economic Security Review",
      "7. Remediation Guidelines",
      "8. Continuous Monitoring"
    ],
    sections: [
      {
        title: "1. Smart Contract Audit Program",
        content: "The Smart Contract Security Framework establishes requirements for auditing and securing smart contracts before deployment. This includes automated analysis, manual review, formal verification, and economic security assessment."
      },
      {
        title: "2. Audit Methodology",
        content: "Smart contract audit methodology includes:\n\n• Automated static analysis\n• Manual code review\n• Test coverage analysis\n• Gas optimization review\n• Access control verification\n• Business logic validation\n• Integration testing\n• Formal verification where applicable"
      },
      {
        title: "3. Multi-Firm Coordination",
        blurred: true,
        content: "For high-value or complex smart contracts, multiple audit firms may be engaged to provide independent reviews. This framework establishes procedures for coordinating multi-firm audits..."
      }
    ]
  },
  "smart-contract-policies": {
    tableOfContents: [
      "1. Smart Contract Security Policy",
      "2. Code Review Policy",
      "3. Vulnerability Classification",
      "4. Audit Coordination Policy",
      "5. Economic Security Review",
      "6. Remediation Guidelines"
    ],
    sections: [
      {
        title: "1. Smart Contract Security Policy",
        content: "[Organization Name] is committed to deploying secure smart contracts. All smart contracts must undergo security review and audit before deployment. This policy establishes minimum security requirements for smart contract development and deployment."
      },
      {
        title: "2. Code Review Policy",
        content: "Code review requirements include:\n\n• Peer review of all smart contract code\n• Security-focused review checklist\n• Documentation of review findings\n• Sign-off before external audit\n• Version control and change tracking\n• Upgrade and migration procedures"
      },
      {
        title: "3. Vulnerability Classification",
        blurred: true,
        content: "Smart contract vulnerabilities are classified by severity: Critical (funds at immediate risk), High (significant financial impact), Medium (limited impact), Low (minor issues), and Informational..."
      }
    ]
  },
  "secops-framework": {
    tableOfContents: [
      "1. Security Operations Center",
      "2. SIEM Implementation",
      "3. Incident Response Framework",
      "4. Threat Intelligence",
      "5. Monitoring Strategy",
      "6. Alert Management",
      "7. Escalation Procedures",
      "8. Metrics and Reporting"
    ],
    sections: [
      {
        title: "1. Security Operations Center",
        content: "The Security Operations Center (SOC) Framework establishes the organizational structure, processes, and technologies for continuous security monitoring and incident response. This framework covers SOC capabilities, staffing, tools, and procedures."
      },
      {
        title: "2. SIEM Implementation",
        content: "Security Information and Event Management (SIEM) implementation includes:\n\n• Log source identification and integration\n• Correlation rule development\n• Alert thresholds and tuning\n• Dashboard and visualization\n• Retention and storage requirements\n• Compliance reporting capabilities"
      },
      {
        title: "3. Incident Response Framework",
        blurred: true,
        content: "The incident response framework establishes procedures for detecting, analyzing, containing, eradicating, and recovering from security incidents. This includes team roles, communication plans, and escalation procedures..."
      }
    ]
  },
  "secops-policies": {
    tableOfContents: [
      "1. Security Operations Policy",
      "2. SIEM Policy",
      "3. Security Monitoring Policy",
      "4. Log Management Policy",
      "5. Incident Response Policy",
      "6. Threat Intelligence Policy",
      "7. Event Classification Policy"
    ],
    sections: [
      {
        title: "1. Security Operations Policy",
        content: "[Organization Name] maintains a 24x7 security operations capability to detect, analyze, and respond to security threats. This policy establishes requirements for security monitoring, incident detection, and response activities."
      },
      {
        title: "2. SIEM Policy",
        content: "SIEM policy requirements include:\n\n• Centralized log collection from all critical systems\n• Real-time correlation and alerting\n• Minimum 12-month log retention\n• Regular rule review and tuning\n• Access controls and audit trails\n• Integration with incident response"
      },
      {
        title: "3. Security Monitoring Policy",
        blurred: true,
        content: "Continuous security monitoring is required for all critical systems and network segments. This includes network traffic analysis, endpoint detection, and user behavior analytics..."
      }
    ]
  },

  // Web3 Regulatory Category
  "msb-framework": {
    tableOfContents: [
      "1. FinCEN Registration Requirements",
      "2. FINTRAC Compliance (Canada)",
      "3. State Money Transmitter Licensing",
      "4. AML/BSA Program Requirements",
      "5. Transaction Reporting",
      "6. Recordkeeping Requirements",
      "7. Examination Preparation",
      "8. Multi-State Compliance"
    ],
    sections: [
      {
        title: "1. FinCEN Registration Requirements",
        content: "Money Services Businesses (MSBs) operating in the United States must register with the Financial Crimes Enforcement Network (FinCEN). This framework covers registration requirements, ongoing obligations, and compliance program requirements."
      },
      {
        title: "2. FINTRAC Compliance (Canada)",
        content: "Canadian MSB requirements include:\n\n• FINTRAC registration\n• Compliance program implementation\n• Know Your Customer procedures\n• Transaction reporting requirements\n• Recordkeeping obligations\n• Travel rule compliance\n• Agent monitoring requirements"
      },
      {
        title: "3. State Money Transmitter Licensing",
        blurred: true,
        content: "In addition to federal registration, MSBs may require state-level money transmitter licenses. Requirements vary by state and include surety bonds, net worth requirements, and examination fees..."
      }
    ]
  },
  "msb-policies": {
    tableOfContents: [
      "1. MSB Compliance Program Policy",
      "2. AML Policy",
      "3. BSA Compliance Policy",
      "4. State Licensing Compliance",
      "5. Transaction Reporting Policy",
      "6. SAR Policy"
    ],
    sections: [
      {
        title: "1. MSB Compliance Program Policy",
        content: "[Organization Name] operates as a registered Money Services Business and maintains a comprehensive compliance program. This policy establishes our commitment to complying with all federal and state MSB requirements."
      },
      {
        title: "2. AML Policy",
        content: "Our Anti-Money Laundering policy includes:\n\n• Customer identification and verification\n• Transaction monitoring\n• Suspicious activity reporting\n• Recordkeeping requirements\n• Employee training\n• Independent testing\n• BSA/AML Officer designation"
      },
      {
        title: "3. BSA Compliance Policy",
        blurred: true,
        content: "Bank Secrecy Act compliance requires implementation of policies, procedures, and internal controls reasonably designed to prevent the MSB from being used for money laundering or terrorist financing..."
      }
    ]
  },
  "vasp-framework": {
    tableOfContents: [
      "1. FATF VASP Requirements",
      "2. Travel Rule Compliance",
      "3. Multi-Jurisdictional Registration",
      "4. UAE VARA/ADGM Requirements",
      "5. Singapore MAS Licensing",
      "6. Hong Kong VASP Licensing",
      "7. AML/CTF for VASPs",
      "8. Ongoing Compliance"
    ],
    sections: [
      {
        title: "1. FATF VASP Requirements",
        content: "The Financial Action Task Force (FATF) has established requirements for Virtual Asset Service Providers (VASPs). This framework covers FATF recommendations for VASP regulation, the travel rule, and risk-based approach to AML/CTF compliance."
      },
      {
        title: "2. Travel Rule Compliance",
        content: "VASP travel rule requirements include:\n\n• Collecting originator information\n• Collecting beneficiary information\n• Secure transmission between VASPs\n• Threshold considerations (varies by jurisdiction)\n• Recordkeeping of transmitted data\n• Screening of counterparty VASPs"
      },
      {
        title: "3. Multi-Jurisdictional Registration",
        blurred: true,
        content: "VASPs operating across multiple jurisdictions must navigate varying regulatory requirements. This framework provides guidance on registration requirements in key jurisdictions..."
      }
    ]
  },
  "vasp-policies": {
    tableOfContents: [
      "1. VASP Compliance Policy",
      "2. Virtual Asset Handling Policy",
      "3. Travel Rule Compliance Policy",
      "4. Customer Due Diligence (VASP)",
      "5. Wallet Screening Policy"
    ],
    sections: [
      {
        title: "1. VASP Compliance Policy",
        content: "[Organization Name] operates as a Virtual Asset Service Provider and maintains compliance with applicable regulations in all jurisdictions where we operate. This policy establishes our commitment to regulatory compliance and customer protection."
      },
      {
        title: "2. Virtual Asset Handling Policy",
        content: "Virtual asset handling requirements include:\n\n• Secure custody of customer assets\n• Segregation of customer and company assets\n• Hot wallet/cold wallet security\n• Key management procedures\n• Transaction verification\n• Asset reconciliation procedures"
      },
      {
        title: "3. Travel Rule Compliance Policy",
        blurred: true,
        content: "We comply with travel rule requirements by collecting and transmitting required originator and beneficiary information for qualifying transactions..."
      }
    ]
  },
  "mica-framework": {
    tableOfContents: [
      "1. MiCA Regulation Overview",
      "2. Crypto-Asset Classification",
      "3. CASP Authorization",
      "4. White Paper Requirements",
      "5. Capital Requirements",
      "6. Governance Requirements",
      "7. Market Abuse Rules",
      "8. Transition Timeline"
    ],
    sections: [
      {
        title: "1. MiCA Regulation Overview",
        content: "The Markets in Crypto-Assets Regulation (MiCA) establishes a comprehensive regulatory framework for crypto-assets in the European Union. This framework covers requirements for issuers and service providers, effective from 2024-2025."
      },
      {
        title: "2. Crypto-Asset Classification",
        content: "MiCA classifies crypto-assets into:\n\n• Asset-Referenced Tokens (ARTs): Tokens referencing multiple currencies/assets\n• E-Money Tokens (EMTs): Tokens referencing single fiat currency\n• Utility Tokens: Tokens providing access to goods/services\n• Other Crypto-Assets: Not classified as ARTs, EMTs, or existing regulated instruments"
      },
      {
        title: "3. CASP Authorization",
        blurred: true,
        content: "Crypto-Asset Service Providers (CASPs) must obtain authorization from their home member state to provide crypto-asset services in the EU. Authorization requirements include governance, capital, and conduct rules..."
      }
    ]
  },
  "mica-policies": {
    tableOfContents: [
      "1. MiCA Compliance Policy",
      "2. Crypto-Asset Classification Policy",
      "3. White Paper Disclosure Policy",
      "4. Authorization Requirements",
      "5. Ongoing Compliance Monitoring"
    ],
    sections: [
      {
        title: "1. MiCA Compliance Policy",
        content: "[Organization Name] is committed to achieving and maintaining compliance with the EU Markets in Crypto-Assets Regulation (MiCA). This policy establishes our framework for MiCA compliance including classification, authorization, and ongoing obligations."
      },
      {
        title: "2. Crypto-Asset Classification Policy",
        content: "Crypto-asset classification procedures include:\n\n• Assessment against MiCA definitions\n• Determination of regulatory treatment\n• Documentation of classification rationale\n• Review upon material changes\n• Legal and compliance sign-off\n• Regulatory notification where required"
      },
      {
        title: "3. White Paper Disclosure Policy",
        blurred: true,
        content: "Issuers of crypto-assets must publish a white paper containing specified information about the project, token, risks, and issuer. This policy establishes requirements for white paper preparation, approval, and publication..."
      }
    ]
  },
  "emi-pi-framework": {
    tableOfContents: [
      "1. EMI Licensing Requirements",
      "2. Payment Institution Framework",
      "3. Stablecoin Issuer Requirements",
      "4. Capital Requirements",
      "5. Safeguarding Requirements",
      "6. Passporting Rights",
      "7. Ongoing Supervision",
      "8. Consumer Protection"
    ],
    sections: [
      {
        title: "1. EMI Licensing Requirements",
        content: "Electronic Money Institutions (EMIs) must obtain authorization to issue electronic money in the EU. This framework covers licensing requirements, capital adequacy, safeguarding, and ongoing obligations for EMIs."
      },
      {
        title: "2. Payment Institution Framework",
        content: "Payment Institution requirements include:\n\n• Licensing application and approval\n• Initial capital requirements\n• Own funds requirements\n• Safeguarding of customer funds\n• Agent management\n• Outsourcing controls\n• Governance and risk management"
      },
      {
        title: "3. Stablecoin Issuer Requirements",
        blurred: true,
        content: "Stablecoin issuers may need EMI authorization depending on the structure of their token. Requirements include reserve asset management, redemption rights, and disclosure obligations..."
      }
    ]
  },
  "regulatory-classification": {
    tableOfContents: [
      "1. Digital Asset Classification",
      "2. Howey Test Framework",
      "3. Securities Analysis",
      "4. Commodity Classification",
      "5. Utility Token Analysis",
      "6. Multi-Jurisdictional Assessment",
      "7. Exemption Strategies",
      "8. Regulatory Opinion Process"
    ],
    sections: [
      {
        title: "1. Digital Asset Classification",
        content: "This framework provides methodology for classifying digital assets under applicable regulatory frameworks. Proper classification is essential for determining regulatory requirements and developing compliance strategies."
      },
      {
        title: "2. Howey Test Framework",
        content: "The Howey Test determines if an asset is a security:\n\n• Investment of money\n• In a common enterprise\n• With expectation of profits\n• Derived from efforts of others\n\nEach element must be analyzed in the context of the specific digital asset and its distribution."
      },
      {
        title: "3. Securities Analysis",
        blurred: true,
        content: "Securities law analysis considers federal and state securities laws, applicable exemptions, and the functional characteristics of the digital asset at various stages of its lifecycle..."
      }
    ]
  },
  "legal-entity-structuring": {
    tableOfContents: [
      "1. DAO Legal Wrapper Options",
      "2. Foundation Structures",
      "3. Multi-Jurisdictional Planning",
      "4. SPV Structures",
      "5. Tax Considerations",
      "6. Governance Integration",
      "7. Liability Protection",
      "8. Regulatory Alignment"
    ],
    sections: [
      {
        title: "1. DAO Legal Wrapper Options",
        content: "DAOs may benefit from legal entity wrappers to provide liability protection, contracting capability, and regulatory clarity. Options include LLC structures (Wyoming, Marshall Islands), foundation structures, and association models."
      },
      {
        title: "2. Foundation Structures",
        content: "Foundation jurisdictions include:\n\n• Switzerland (Stiftung)\n• Cayman Islands Foundation Companies\n• Panama Private Interest Foundations\n• Singapore Foundation Companies\n• BVI (proposed foundation regime)\n\nEach offers different benefits for governance, taxation, and regulatory treatment."
      },
      {
        title: "3. Multi-Jurisdictional Planning",
        blurred: true,
        content: "Multi-jurisdictional structures may separate intellectual property, operations, token issuance, and treasury management across different entities and jurisdictions..."
      }
    ]
  },

  // AML/KYC Category
  "aml-ctf-framework": {
    tableOfContents: [
      "1. AML/CTF Program Overview",
      "2. Risk-Based Approach",
      "3. Three Lines of Defense",
      "4. Customer Due Diligence",
      "5. Transaction Monitoring",
      "6. Suspicious Activity Reporting",
      "7. Governance Structure",
      "8. Independent Testing"
    ],
    sections: [
      {
        title: "1. AML/CTF Program Overview",
        content: "This Anti-Money Laundering and Counter-Terrorist Financing (AML/CTF) Framework establishes a comprehensive, risk-based approach to preventing financial crime. The framework is aligned with FATF recommendations and applicable regulatory requirements."
      },
      {
        title: "2. Risk-Based Approach",
        content: "The risk-based approach includes:\n\n• Enterprise-wide risk assessment\n• Customer risk rating methodology\n• Product/service risk assessment\n• Geographic risk factors\n• Delivery channel risk\n• Risk-based resource allocation\n• Periodic risk reassessment"
      },
      {
        title: "3. Three Lines of Defense",
        blurred: true,
        content: "The three lines of defense model ensures appropriate segregation of duties: First line (business operations), Second line (compliance and risk management), Third line (internal audit)..."
      }
    ]
  },
  "aml-ctf-policies": {
    tableOfContents: [
      "1. AML/CTF Program Policy",
      "2. Risk-Based Approach Policy",
      "3. CDD Policy",
      "4. EDD Policy",
      "5. Transaction Monitoring Policy",
      "6. SAR Policy",
      "7. Record Keeping Policy",
      "8. Training Policy",
      "9. Independent Testing Policy",
      "10. Governance Policy"
    ],
    sections: [
      {
        title: "1. AML/CTF Program Policy",
        content: "[Organization Name] is committed to preventing money laundering, terrorist financing, and other financial crimes. This master policy establishes our AML/CTF program framework and applies to all employees, contractors, and business activities."
      },
      {
        title: "2. Risk-Based Approach Policy",
        content: "Our risk-based approach ensures resources are allocated effectively:\n\n• Higher risk requires enhanced measures\n• Lower risk allows simplified measures\n• Risk assessments are documented\n• Controls are proportionate to risk\n• Residual risk is monitored\n• Risk appetite is defined and approved"
      },
      {
        title: "3. CDD Policy",
        blurred: true,
        content: "Customer Due Diligence (CDD) must be conducted for all customers at onboarding and throughout the relationship. CDD includes customer identification, verification, beneficial ownership, and understanding the nature and purpose of the relationship..."
      }
    ]
  },
  "kyc-cdd-framework": {
    tableOfContents: [
      "1. KYC Program Structure",
      "2. Customer Identification",
      "3. Customer Verification",
      "4. Beneficial Ownership",
      "5. Enhanced Due Diligence",
      "6. Ongoing Monitoring",
      "7. Risk Rating Methodology",
      "8. Periodic Review"
    ],
    sections: [
      {
        title: "1. KYC Program Structure",
        content: "The Know Your Customer (KYC) Framework establishes requirements for customer identification, verification, and ongoing due diligence. This framework ensures we know our customers, understand their activities, and can detect suspicious behavior."
      },
      {
        title: "2. Customer Identification",
        content: "Customer identification requirements:\n\n• Full legal name\n• Date of birth\n• Residential address\n• Identification number\n• Business registration (legal entities)\n• Authorized representatives\n• Source of funds (where applicable)"
      },
      {
        title: "3. Customer Verification",
        blurred: true,
        content: "Verification of customer identity must be completed using reliable, independent sources. This includes government-issued identification, database verification, and liveness detection for remote onboarding..."
      }
    ]
  },
  "kyc-cdd-policies": {
    tableOfContents: [
      "1. KYC Policy",
      "2. CIP Policy",
      "3. Beneficial Ownership Policy",
      "4. UBO Policy",
      "5. PEP Screening Policy",
      "6. Sanctions Screening Policy",
      "7. Adverse Media Screening",
      "8. EDD Policy",
      "9. Ongoing CDD Policy",
      "10. Periodic Review Policy"
    ],
    sections: [
      {
        title: "1. KYC Policy",
        content: "[Organization Name] maintains a comprehensive Know Your Customer (KYC) program. This policy establishes requirements for customer identification, verification, and ongoing due diligence to prevent our services from being used for illicit purposes."
      },
      {
        title: "2. CIP Policy",
        content: "The Customer Identification Program (CIP) requires:\n\n• Collection of identifying information\n• Verification using reliable sources\n• Documentation of verification methods\n• Resolution of discrepancies\n• Comparison against government lists\n• Recordkeeping of CIP documentation"
      },
      {
        title: "3. Beneficial Ownership Policy",
        blurred: true,
        content: "Beneficial ownership identification is required for legal entity customers. This includes identifying individuals who own 25% or more of the entity and individuals who control the entity..."
      }
    ]
  },
  "transaction-monitoring-framework": {
    tableOfContents: [
      "1. Monitoring Program Overview",
      "2. Rule-Based Detection",
      "3. Blockchain Analytics",
      "4. Alert Generation",
      "5. Alert Investigation",
      "6. Case Management",
      "7. SAR Filing",
      "8. Model Validation"
    ],
    sections: [
      {
        title: "1. Monitoring Program Overview",
        content: "The Transaction Monitoring Framework establishes procedures for detecting suspicious activity through automated and manual monitoring. This includes traditional transaction monitoring as well as blockchain-specific analytics."
      },
      {
        title: "2. Rule-Based Detection",
        content: "Transaction monitoring rules include:\n\n• Structuring detection\n• Rapid movement of funds\n• High-risk jurisdiction transactions\n• Unusual transaction patterns\n• Deviation from expected activity\n• Round-dollar transactions\n• Third-party transactions"
      },
      {
        title: "3. Blockchain Analytics",
        blurred: true,
        content: "Blockchain analytics enables identification of high-risk wallet addresses, exposure to illicit sources, mixing services, darknet markets, and sanctioned entities..."
      }
    ]
  },
  "transaction-monitoring-policies": {
    tableOfContents: [
      "1. Transaction Monitoring Policy",
      "2. Alert Management Policy",
      "3. SAR Policy",
      "4. Blockchain Analytics Policy",
      "5. Typology Detection Policy"
    ],
    sections: [
      {
        title: "1. Transaction Monitoring Policy",
        content: "[Organization Name] implements comprehensive transaction monitoring to detect potentially suspicious activity. This policy establishes requirements for automated monitoring, alert handling, investigation, and reporting."
      },
      {
        title: "2. Alert Management Policy",
        content: "Alert management procedures include:\n\n• Alert prioritization and assignment\n• Investigation timeframes\n• Escalation procedures\n• Documentation requirements\n• Quality assurance review\n• Alert disposition categories\n• Trend analysis and reporting"
      },
      {
        title: "3. SAR Policy",
        blurred: true,
        content: "Suspicious Activity Reports (SARs) must be filed within required timeframes when suspicious activity is identified. This includes determining when to file, completing the report, and maintaining confidentiality..."
      }
    ]
  },
  "sanctions-framework": {
    tableOfContents: [
      "1. Sanctions Compliance Overview",
      "2. OFAC Requirements",
      "3. UN/EU Sanctions",
      "4. Wallet Screening",
      "5. Geographic Restrictions",
      "6. Real-Time Screening",
      "7. Match Handling",
      "8. Recordkeeping"
    ],
    sections: [
      {
        title: "1. Sanctions Compliance Overview",
        content: "The Sanctions Compliance Framework ensures we do not engage in prohibited transactions with sanctioned individuals, entities, or jurisdictions. This framework covers screening requirements, hit resolution, and escalation procedures."
      },
      {
        title: "2. OFAC Requirements",
        content: "OFAC compliance requirements include:\n\n• Screening against SDN List\n• Screening against sectoral sanctions\n• 50% rule application\n• Secondary sanctions considerations\n• Licenses and exemptions\n• Voluntary self-disclosure\n• Penalties and enforcement"
      },
      {
        title: "3. UN/EU Sanctions",
        blurred: true,
        content: "United Nations and European Union sanctions must also be screened. This includes asset freezes, travel bans, arms embargoes, and sectoral restrictions applicable to our operations..."
      }
    ]
  },
  "sanctions-policies": {
    tableOfContents: [
      "1. Sanctions Compliance Policy",
      "2. OFAC Screening Policy",
      "3. UN/EU Screening Policy",
      "4. Wallet Address Screening",
      "5. Geographic IP Blocking",
      "6. VPN Detection Policy"
    ],
    sections: [
      {
        title: "1. Sanctions Compliance Policy",
        content: "[Organization Name] is committed to complying with all applicable sanctions laws and regulations. This policy establishes our sanctions compliance program including screening, restrictions, and escalation procedures."
      },
      {
        title: "2. OFAC Screening Policy",
        content: "OFAC screening requirements:\n\n• Screen all customers at onboarding\n• Screen all transactions\n• Screen against updated lists\n• Investigate potential matches\n• Escalate confirmed matches\n• Block prohibited transactions\n• Report blocked transactions"
      },
      {
        title: "3. Wallet Address Screening",
        blurred: true,
        content: "Cryptocurrency wallet addresses must be screened against known sanctioned addresses and addresses associated with illicit activity. This includes direct matches and exposure analysis..."
      }
    ]
  },

  // Token Governance Category
  "securities-framework": {
    tableOfContents: [
      "1. Securities Law Overview",
      "2. Howey Test Application",
      "3. Securities Act Exemptions",
      "4. Regulation D",
      "5. Regulation S",
      "6. Regulation Crowdfunding",
      "7. Regulation A+",
      "8. State Blue Sky Laws"
    ],
    sections: [
      {
        title: "1. Securities Law Overview",
        content: "This Securities Law Compliance Framework provides guidance for analyzing whether digital assets may be classified as securities and developing appropriate compliance strategies. The framework covers U.S. federal securities laws and multi-jurisdictional considerations."
      },
      {
        title: "2. Howey Test Application",
        content: "The Howey Test analysis considers:\n\n• Nature of the investment (money or other consideration)\n• Common enterprise analysis (horizontal or vertical)\n• Expectation of profits (capital appreciation or participation)\n• Efforts of others (reliance on promoter or third party)\n• Evolution of network decentralization"
      },
      {
        title: "3. Securities Act Exemptions",
        blurred: true,
        content: "Various exemptions may be available for securities offerings, including private placements under Regulation D, offshore offerings under Regulation S, and crowdfunding under Regulation CF..."
      }
    ]
  },
  "securities-policies": {
    tableOfContents: [
      "1. Securities Compliance Policy",
      "2. Investment Contract Analysis",
      "3. Exemption Strategy Policy",
      "4. Regulation D Policy",
      "5. Regulation S Policy",
      "6. Regulation CF Policy",
      "7. Regulation A+ Policy",
      "8. Multi-Jurisdictional Policy"
    ],
    sections: [
      {
        title: "1. Securities Compliance Policy",
        content: "[Organization Name] is committed to compliance with applicable securities laws. This policy establishes our framework for analyzing securities law implications and ensuring appropriate compliance for digital asset activities."
      },
      {
        title: "2. Investment Contract Analysis",
        content: "Investment contract analysis procedures:\n\n• Apply Howey Test framework\n• Document analysis and conclusions\n• Consider evolution over time\n• Review SEC guidance and enforcement\n• Obtain legal opinions where appropriate\n• Monitor regulatory developments"
      },
      {
        title: "3. Exemption Strategy Policy",
        blurred: true,
        content: "When securities treatment applies, appropriate exemptions must be identified and compliance requirements satisfied. This includes investor accreditation, disclosure requirements, and filing obligations..."
      }
    ]
  },
  "whitepaper-framework": {
    tableOfContents: [
      "1. Whitepaper Standards",
      "2. Risk Disclosure Requirements",
      "3. Forward-Looking Statements",
      "4. Regulatory Compliance Review",
      "5. Jurisdictional Disclaimers",
      "6. Update and Versioning",
      "7. Distribution Controls",
      "8. Legal Review Process"
    ],
    sections: [
      {
        title: "1. Whitepaper Standards",
        content: "This framework establishes standards for whitepaper preparation, review, and publication. Whitepapers must be accurate, complete, and not misleading. They must include appropriate risk disclosures and comply with applicable regulations."
      },
      {
        title: "2. Risk Disclosure Requirements",
        content: "Risk disclosures must cover:\n\n• Technology risks\n• Regulatory risks\n• Market risks\n• Operational risks\n• Key person risks\n• Competition risks\n• Liquidity risks\n• General investment risks"
      },
      {
        title: "3. Forward-Looking Statements",
        blurred: true,
        content: "Forward-looking statements must be clearly identified and accompanied by meaningful cautionary language. Projections must have a reasonable basis and identify key assumptions..."
      }
    ]
  },
  "whitepaper-policies": {
    tableOfContents: [
      "1. Whitepaper Publication Policy",
      "2. Risk Disclosure Policy",
      "3. Forward-Looking Statements",
      "4. Misrepresentation Prevention",
      "5. Jurisdictional Restrictions"
    ],
    sections: [
      {
        title: "1. Whitepaper Publication Policy",
        content: "[Organization Name] ensures all published whitepapers are accurate, complete, and compliant with applicable regulations. This policy establishes approval requirements, disclosure standards, and update procedures."
      },
      {
        title: "2. Risk Disclosure Policy",
        content: "Risk disclosure requirements:\n\n• Comprehensive risk factor section\n• Specific rather than generic risks\n• Material risks prominently disclosed\n• Regular review and updates\n• Consistent across documents\n• Approved by legal and compliance"
      },
      {
        title: "3. Misrepresentation Prevention",
        blurred: true,
        content: "All statements in whitepapers must be accurate and verifiable. Procedures are in place to verify factual claims, substantiate projections, and prevent misleading statements..."
      }
    ]
  },
  "tokenomics-framework": {
    tableOfContents: [
      "1. Token Economics Design",
      "2. Distribution Framework",
      "3. Vesting and Lock-Up",
      "4. Token Utility Analysis",
      "5. Supply Mechanics",
      "6. Incentive Alignment",
      "7. Secondary Market Considerations",
      "8. Compliance Integration"
    ],
    sections: [
      {
        title: "1. Token Economics Design",
        content: "This framework provides guidance for designing token economics that are sustainable, compliant, and aligned with project objectives. Tokenomics design must consider regulatory implications, market dynamics, and long-term sustainability."
      },
      {
        title: "2. Distribution Framework",
        content: "Token distribution considerations:\n\n• Allocation categories (team, investors, community, treasury)\n• Fair launch vs. pre-sale models\n• Geographic restrictions\n• Accreditation requirements\n• Lockup and vesting schedules\n• Cliff periods\n• Release mechanisms"
      },
      {
        title: "3. Vesting and Lock-Up",
        blurred: true,
        content: "Vesting and lock-up mechanisms align incentives and demonstrate commitment. This includes time-based vesting, milestone-based vesting, and contractual lock-up agreements..."
      }
    ]
  },
  "tokenomics-policies": {
    tableOfContents: [
      "1. Tokenomics Compliance Policy",
      "2. Distribution Mechanism Policy",
      "3. Vesting and Lock-Up Policy",
      "4. Token Utility Policy",
      "5. Airdrop Policy",
      "6. Supply Mechanics Policy"
    ],
    sections: [
      {
        title: "1. Tokenomics Compliance Policy",
        content: "[Organization Name] designs token economics with compliance as a core consideration. This policy establishes requirements for tokenomics design, documentation, and compliance review."
      },
      {
        title: "2. Distribution Mechanism Policy",
        content: "Token distribution requirements:\n\n• Documented allocation rationale\n• Compliance with securities laws\n• Geographic restriction enforcement\n• Smart contract verification\n• Distribution transparency\n• Audit trail maintenance"
      },
      {
        title: "3. Vesting and Lock-Up Policy",
        blurred: true,
        content: "Team and investor tokens are subject to vesting schedules designed to align incentives with long-term project success. Vesting terms are enforced through smart contracts or custodial arrangements..."
      }
    ]
  },
  "dao-governance-framework": {
    tableOfContents: [
      "1. DAO Structure Design",
      "2. Legal Entity Integration",
      "3. Governance Token Framework",
      "4. Voting Mechanisms",
      "5. Proposal Systems",
      "6. Treasury Management",
      "7. Multi-Sig Controls",
      "8. Decentralization Pathway"
    ],
    sections: [
      {
        title: "1. DAO Structure Design",
        content: "This framework provides guidance for structuring Decentralized Autonomous Organizations (DAOs) with appropriate governance, legal, and operational frameworks. DAO design must balance decentralization objectives with legal and practical requirements."
      },
      {
        title: "2. Legal Entity Integration",
        content: "DAO legal considerations include:\n\n• Legal wrapper options (LLC, Foundation, Association)\n• Liability protection for participants\n• Contracting capability\n• Banking and treasury management\n• Tax implications\n• Regulatory classification\n• Cross-border operations"
      },
      {
        title: "3. Governance Token Framework",
        blurred: true,
        content: "Governance tokens grant voting rights and may have additional utility. Token design must consider regulatory implications, voting power distribution, and alignment with decentralization objectives..."
      }
    ]
  },
  "dao-governance-policies": {
    tableOfContents: [
      "1. DAO Governance Policy",
      "2. Legal Entity Policy",
      "3. Governance Token Policy",
      "4. Voting Mechanism Policy",
      "5. Proposal System Policy",
      "6. Treasury Management Policy",
      "7. Multi-Sig Control Policy",
      "8. Contributor Agreement Policy",
      "9. Decentralization Pathway"
    ],
    sections: [
      {
        title: "1. DAO Governance Policy",
        content: "[DAO Name] is governed according to principles of decentralization, transparency, and community participation. This policy establishes our governance framework, including voting procedures, proposal processes, and treasury management."
      },
      {
        title: "2. Voting Mechanism Policy",
        content: "Voting mechanisms include:\n\n• Token-weighted voting\n• Quadratic voting (where applicable)\n• Delegation capabilities\n• Voting periods and quorum\n• Snapshot voting\n• On-chain execution\n• Vote verification"
      },
      {
        title: "3. Treasury Management Policy",
        blurred: true,
        content: "DAO treasury is managed according to community-approved policies. This includes multi-signature requirements, spending limits, diversification strategies, and transparency reporting..."
      }
    ]
  },

  // Corporate Governance Category
  "internal-compliance-framework": {
    tableOfContents: [
      "1. Compliance Program Structure",
      "2. Three Lines of Defense",
      "3. Control Environment",
      "4. Policy Management",
      "5. Compliance Testing",
      "6. Issue Management",
      "7. Regulatory Relationship",
      "8. Program Assessment"
    ],
    sections: [
      {
        title: "1. Compliance Program Structure",
        content: "The Internal Compliance Framework establishes the structure, governance, and processes for managing compliance risk. This framework ensures appropriate oversight, controls, and accountability for regulatory compliance."
      },
      {
        title: "2. Three Lines of Defense",
        content: "The three lines model assigns responsibilities:\n\n• First Line: Business operations own and manage risk\n• Second Line: Compliance and risk management provide oversight\n• Third Line: Internal audit provides independent assurance\n\nClear accountability and escalation paths are defined for each line."
      },
      {
        title: "3. Control Environment",
        blurred: true,
        content: "The control environment includes the tone at the top, organizational structure, assignment of authority, and human resources practices that influence the effectiveness of internal controls..."
      }
    ]
  },
  "internal-compliance-policies": {
    tableOfContents: [
      "1. Compliance Framework Policy",
      "2. Code of Conduct",
      "3. Ethics Policy",
      "4. Whistleblower Policy",
      "5. Compliance Testing Policy",
      "6. Monitoring Policy",
      "7. Issue Management Policy",
      "8. Corrective Action Policy"
    ],
    sections: [
      {
        title: "1. Compliance Framework Policy",
        content: "[Organization Name] maintains a comprehensive compliance program to ensure adherence to applicable laws, regulations, and internal standards. This policy establishes our compliance framework, governance structure, and key program elements."
      },
      {
        title: "2. Code of Conduct",
        content: "Our Code of Conduct establishes expectations for:\n\n• Ethical behavior and integrity\n• Compliance with laws and regulations\n• Conflicts of interest\n• Confidentiality and data protection\n• Fair dealing and competition\n• Use of company resources\n• Reporting concerns"
      },
      {
        title: "3. Whistleblower Policy",
        blurred: true,
        content: "Employees are encouraged to report concerns about potential violations without fear of retaliation. Reporting channels, investigation procedures, and protections are established..."
      }
    ]
  },
  "board-governance-framework": {
    tableOfContents: [
      "1. Corporate Governance Principles",
      "2. Board Structure and Composition",
      "3. Board Committees",
      "4. Delegation of Authority",
      "5. Director Duties",
      "6. Board Meetings",
      "7. Board Evaluation",
      "8. Stakeholder Engagement"
    ],
    sections: [
      {
        title: "1. Corporate Governance Principles",
        content: "The Board and Governance Framework establishes principles for effective corporate governance including board structure, oversight responsibilities, and accountability mechanisms. Good governance supports sustainable business performance and stakeholder trust."
      },
      {
        title: "2. Board Structure and Composition",
        content: "Board composition considerations:\n\n• Size appropriate to business needs\n• Balance of skills and experience\n• Independence of directors\n• Diversity of perspectives\n• Succession planning\n• Orientation and ongoing development\n• Term limits and rotation"
      },
      {
        title: "3. Board Committees",
        blurred: true,
        content: "Board committees provide focused oversight in key areas. Common committees include Audit, Risk, Compliance, Compensation, and Nominating/Governance. Each committee operates under a charter defining its responsibilities..."
      }
    ]
  },
  "board-governance-policies": {
    tableOfContents: [
      "1. Board Charter",
      "2. Committee Charters",
      "3. Delegation of Authority",
      "4. Conflict of Interest Policy",
      "5. Related Party Transactions",
      "6. Board Reporting Policy",
      "7. Director Duties Policy"
    ],
    sections: [
      {
        title: "1. Board Charter",
        content: "The Board of Directors is responsible for the governance of [Organization Name]. This charter establishes the board's role, responsibilities, and operating procedures for effective corporate governance."
      },
      {
        title: "2. Committee Charters",
        content: "Board committee structure includes:\n\n• Audit Committee: Financial reporting, internal controls, external audit\n• Risk Committee: Enterprise risk oversight\n• Compliance Committee: Regulatory compliance oversight\n\nEach committee has a charter defining scope, membership, and responsibilities."
      },
      {
        title: "3. Conflict of Interest Policy",
        blurred: true,
        content: "Directors and officers must disclose actual or potential conflicts of interest. Procedures are established for managing conflicts, including recusal from decisions and transactions..."
      }
    ]
  },
  "erm-framework": {
    tableOfContents: [
      "1. ERM Program Overview",
      "2. Risk Identification",
      "3. Risk Assessment",
      "4. Risk Response",
      "5. Risk Monitoring",
      "6. Risk Reporting",
      "7. Risk Appetite",
      "8. Program Governance"
    ],
    sections: [
      {
        title: "1. ERM Program Overview",
        content: "The Enterprise Risk Management Framework provides a structured approach to identifying, assessing, and managing risks across the organization. ERM integrates risk management into strategic planning and decision-making."
      },
      {
        title: "2. Risk Identification",
        content: "Risk identification methods include:\n\n• Risk workshops and interviews\n• Process analysis\n• Incident and loss analysis\n• Industry benchmarking\n• Emerging risk scanning\n• Scenario analysis\n• Control self-assessments"
      },
      {
        title: "3. Risk Assessment",
        blurred: true,
        content: "Risk assessment evaluates the likelihood and potential impact of identified risks. This includes inherent risk assessment, control effectiveness evaluation, and residual risk determination..."
      }
    ]
  },
  "erm-policies": {
    tableOfContents: [
      "1. ERM Policy",
      "2. Risk Assessment Policy",
      "3. Risk Appetite Policy",
      "4. Risk Tolerance Policy",
      "5. Key Risk Indicator Policy",
      "6. Risk Treatment Policy",
      "7. Risk Mitigation Policy"
    ],
    sections: [
      {
        title: "1. ERM Policy",
        content: "[Organization Name] maintains an enterprise risk management program to identify, assess, and manage risks that could affect our ability to achieve objectives. This policy establishes our risk management framework and governance structure."
      },
      {
        title: "2. Risk Assessment Policy",
        content: "Risk assessment requirements:\n\n• Annual enterprise-wide risk assessment\n• Standardized assessment methodology\n• Consistent impact and likelihood scales\n• Documentation of assessments\n• Review and challenge process\n• Integration with strategic planning"
      },
      {
        title: "3. Risk Appetite Policy",
        blurred: true,
        content: "Risk appetite defines the amount and type of risk the organization is willing to accept in pursuit of its objectives. Risk appetite statements are approved by the board and guide risk-taking decisions..."
      }
    ]
  },

  // ESG Category
  "esg-framework": {
    tableOfContents: [
      "1. ESG Program Overview",
      "2. Environmental Framework",
      "3. Social Framework",
      "4. Governance Framework",
      "5. Carbon Footprint Assessment",
      "6. Sustainability Strategy",
      "7. Stakeholder Engagement",
      "8. ESG Reporting"
    ],
    sections: [
      {
        title: "1. ESG Program Overview",
        content: "The ESG Framework establishes our approach to Environmental, Social, and Governance matters. This framework integrates ESG considerations into business strategy, operations, and stakeholder relationships."
      },
      {
        title: "2. Environmental Framework",
        content: "Environmental priorities include:\n\n• Climate change mitigation and adaptation\n• Energy efficiency and renewable energy\n• Carbon footprint measurement and reduction\n• Resource efficiency and waste management\n• Environmental compliance\n• Sustainable supply chain"
      },
      {
        title: "3. Social Framework",
        blurred: true,
        content: "Social considerations include employee welfare, diversity and inclusion, community engagement, human rights, and responsible technology development..."
      }
    ]
  },
  "esg-policies": {
    tableOfContents: [
      "1. ESG Policy (Master)",
      "2. Environmental Policy",
      "3. Carbon Footprint Policy",
      "4. Climate Strategy Policy",
      "5. Energy Efficiency Policy",
      "6. Carbon Offset Policy",
      "7. Social Impact Policy",
      "8. Stakeholder Engagement Policy",
      "9. Governance Transparency Policy",
      "10. Accountability Policy"
    ],
    sections: [
      {
        title: "1. ESG Policy (Master)",
        content: "[Organization Name] is committed to responsible business practices that consider environmental, social, and governance factors. This policy establishes our ESG framework and commitment to sustainable value creation."
      },
      {
        title: "2. Environmental Policy",
        content: "Environmental commitments include:\n\n• Minimize environmental impact\n• Measure and reduce carbon emissions\n• Promote energy efficiency\n• Reduce waste and promote recycling\n• Consider environmental factors in decisions\n• Comply with environmental regulations"
      },
      {
        title: "3. Carbon Footprint Policy",
        blurred: true,
        content: "We measure our carbon footprint across Scope 1, 2, and 3 emissions. Reduction targets are set and progress is tracked. For blockchain operations, we consider proof-of-work versus proof-of-stake impacts..."
      }
    ]
  },
  "responsible-ai-framework": {
    tableOfContents: [
      "1. AI Ethics Principles",
      "2. Algorithm Fairness",
      "3. Bias Detection",
      "4. Privacy-Preserving AI",
      "5. Explainability Standards",
      "6. Human Oversight",
      "7. AI Governance",
      "8. EU AI Act Compliance"
    ],
    sections: [
      {
        title: "1. AI Ethics Principles",
        content: "The Responsible AI Framework establishes principles for ethical AI development and deployment. AI systems must be fair, transparent, accountable, and respect privacy and human rights."
      },
      {
        title: "2. Algorithm Fairness",
        content: "Algorithm fairness requirements:\n\n• Fairness criteria definition\n• Bias testing across protected groups\n• Disparate impact assessment\n• Fairness metrics selection\n• Ongoing monitoring for drift\n• Remediation procedures\n• Documentation of fairness decisions"
      },
      {
        title: "3. Bias Detection",
        blurred: true,
        content: "Bias detection methods include statistical parity testing, equal opportunity analysis, and disparate impact assessment. Bias must be tested before deployment and monitored in production..."
      }
    ]
  },
  "responsible-ai-policies": {
    tableOfContents: [
      "1. Responsible AI Policy",
      "2. Algorithm Fairness Policy",
      "3. Bias Detection Policy",
      "4. Explainability Standards",
      "5. Privacy-Preserving AI Policy",
      "6. Ethics Committee Policy",
      "7. Human Oversight Policy",
      "8. AI Accountability Policy",
      "9. EU AI Act Compliance"
    ],
    sections: [
      {
        title: "1. Responsible AI Policy",
        content: "[Organization Name] is committed to responsible AI development and deployment. AI systems must be designed and operated in accordance with ethical principles, regulatory requirements, and our commitment to fairness and transparency."
      },
      {
        title: "2. Algorithm Fairness Policy",
        content: "Algorithm fairness requirements:\n\n• Define fairness criteria for each use case\n• Test for bias before deployment\n• Monitor for fairness in production\n• Remediate identified biases\n• Document fairness decisions\n• Regular fairness audits"
      },
      {
        title: "3. EU AI Act Compliance",
        blurred: true,
        content: "AI systems are classified according to EU AI Act risk categories. High-risk systems are subject to conformity assessment, registration, and ongoing compliance requirements..."
      }
    ]
  },

  // Training Category
  "training-framework": {
    tableOfContents: [
      "1. Training Program Overview",
      "2. Security Awareness Training",
      "3. Compliance Training",
      "4. Role-Based Training",
      "5. Board Training",
      "6. Developer Training",
      "7. Training Effectiveness",
      "8. Recordkeeping"
    ],
    sections: [
      {
        title: "1. Training Program Overview",
        content: "The Compliance Training Framework establishes requirements for employee education and awareness. Effective training ensures employees understand their responsibilities and can identify and respond to risks appropriately."
      },
      {
        title: "2. Security Awareness Training",
        content: "Security awareness training covers:\n\n• Phishing and social engineering\n• Password and authentication security\n• Data protection and privacy\n• Physical security\n• Incident reporting\n• Remote work security\n• Mobile device security"
      },
      {
        title: "3. Compliance Training",
        blurred: true,
        content: "Compliance training covers regulatory requirements, company policies, and ethical standards. Training is tailored to employee roles and includes annual refresher training..."
      }
    ]
  },
  "training-policies": {
    tableOfContents: [
      "1. Training and Awareness Policy",
      "2. Security Awareness Policy",
      "3. Compliance Training Policy",
      "4. Board Training Policy"
    ],
    sections: [
      {
        title: "1. Training and Awareness Policy",
        content: "[Organization Name] provides comprehensive training to ensure employees understand their security and compliance responsibilities. This policy establishes training requirements, delivery methods, and completion tracking."
      },
      {
        title: "2. Security Awareness Policy",
        content: "Security awareness requirements:\n\n• Annual security awareness training for all employees\n• Phishing simulation exercises\n• Role-based security training\n• New hire security orientation\n• Security awareness communications\n• Incident response training"
      },
      {
        title: "3. Compliance Training Policy",
        blurred: true,
        content: "Compliance training covers regulatory requirements and company policies. Training is assigned based on role and updated as regulations change..."
      }
    ]
  },
  "advisory-framework": {
    tableOfContents: [
      "1. Advisory Services Overview",
      "2. Fractional CCO Services",
      "3. Regulatory Monitoring",
      "4. Policy Update Services",
      "5. Incident Response Advisory",
      "6. Crisis Management",
      "7. Regulatory Engagement",
      "8. Service Level Standards"
    ],
    sections: [
      {
        title: "1. Advisory Services Overview",
        content: "The Ongoing Advisory Framework establishes the structure and standards for providing continuous compliance advisory services. This includes regulatory monitoring, policy updates, incident response, and strategic guidance."
      },
      {
        title: "2. Fractional CCO Services",
        content: "Fractional CCO services include:\n\n• Compliance program oversight\n• Regulatory relationship management\n• Board and management reporting\n• Compliance strategy development\n• Team leadership and development\n• Regulatory examination support\n• Policy and procedure review"
      },
      {
        title: "3. Regulatory Monitoring",
        blurred: true,
        content: "Regulatory monitoring tracks developments across relevant jurisdictions and provides impact assessments for new regulations, guidance, and enforcement actions..."
      }
    ]
  },
  "advisory-policies": {
    tableOfContents: [
      "1. Advisory Services Policy",
      "2. Regulatory Monitoring Policy",
      "3. Policy Update Policy",
      "4. Incident Response Advisory",
      "5. Crisis Management Policy"
    ],
    sections: [
      {
        title: "1. Advisory Services Policy",
        content: "Advisory services are provided according to defined service standards and deliverables. This policy establishes expectations for advisory engagements, communication, and quality assurance."
      },
      {
        title: "2. Regulatory Monitoring Policy",
        content: "Regulatory monitoring includes:\n\n• Tracking regulatory developments\n• Assessing impact on clients\n• Providing timely alerts\n• Recommending response actions\n• Updating policies as needed\n• Horizon scanning for emerging issues"
      },
      {
        title: "3. Crisis Management Policy",
        blurred: true,
        content: "Crisis management advisory supports clients during significant incidents including regulatory enforcement, data breaches, and reputational events. This includes immediate response, communication strategy, and remediation planning..."
      }
    ]
  }
};

// Default preview for documents without specific content
const defaultPreview: PreviewContent = {
  tableOfContents: [
    "1. Introduction and Scope",
    "2. Definitions and Terms",
    "3. Requirements Overview",
    "4. Implementation Guidelines",
    "5. Roles and Responsibilities",
    "6. Compliance Requirements",
    "7. Monitoring and Review",
    "8. Documentation Templates"
  ],
  sections: [
    {
      title: "1. Introduction and Scope",
      content: "This document provides a comprehensive framework for implementing compliance requirements. The scope covers all relevant organizational activities, systems, and personnel within the defined boundaries."
    },
    {
      title: "2. Definitions and Terms",
      content: "Key terms and definitions are provided to ensure consistent understanding and interpretation of requirements across the organization. All stakeholders should familiarize themselves with these definitions before implementation."
    },
    {
      title: "3. Requirements Overview",
      blurred: true,
      content: "Detailed requirements are outlined in this section, covering all mandatory elements for compliance. Each requirement includes specific criteria, evidence requirements, and implementation guidance..."
    }
  ]
};

export function DocumentPreviewDialog({ 
  open, 
  onOpenChange, 
  document: doc, 
  onAddToCart, 
  isInCart 
}: DocumentPreviewDialogProps) {
  if (!doc) return null;

  const preview = documentPreviews[doc.id] || defaultPreview;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge 
                  variant={doc.type === "framework" ? "default" : "secondary"}
                  className={doc.type === "framework" ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-600 hover:bg-emerald-700 text-white"}
                >
                  {doc.type === "framework" ? "Framework" : "Policy"}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Eye className="w-3 h-3" />
                  Preview
                </Badge>
              </div>
              <DialogTitle className="text-xl">{doc.title}</DialogTitle>
              <DialogDescription className="mt-1">
                {doc.description}
              </DialogDescription>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold text-primary">${doc.price}</div>
              <div className="text-xs text-muted-foreground">One-time purchase</div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 pb-4">
            {/* Table of Contents */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Table of Contents
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
                {preview.tableOfContents.map((item, i) => (
                  <li key={i} className="text-muted-foreground">{item}</li>
                ))}
              </ul>
            </div>

            {/* Preview Sections */}
            <div className="space-y-4">
              <h3 className="font-semibold">Content Preview</h3>
              {preview.sections.map((section, i) => (
                <div key={i} className="border border-border rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">{section.title}</h4>
                  <div className={section.blurred ? "relative" : ""}>
                    <p className={`text-sm text-muted-foreground whitespace-pre-line ${section.blurred ? "blur-sm select-none" : ""}`}>
                      {section.content}
                    </p>
                    {section.blurred && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                        <div className="flex items-center gap-2 text-sm font-medium bg-background px-3 py-1.5 rounded-full border border-border">
                          <Lock className="w-3 h-3" />
                          Purchase to unlock
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* What's Included */}
            <div className="bg-primary/5 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Download className="w-4 h-4" />
                What's Included
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {doc.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>

        <Separator className="my-4" />
        
        <div className="flex gap-3 flex-shrink-0">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Close Preview
          </Button>
          <Button 
            className="flex-1 gap-2"
            variant={isInCart ? "secondary" : "default"}
            onClick={onAddToCart}
          >
            {isInCart ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart - ${doc.price}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
