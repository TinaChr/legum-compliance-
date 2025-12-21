// Maps service IDs to their corresponding document category IDs
export const serviceToDocumentMapping: Record<string, string> = {
  // ISMS Services
  "iso-27001": "isms",
  "soc-2": "isms",
  "nist": "isms",
  "iso-22301": "isms",
  
  // Data Protection Services
  "gdpr": "data-protection",
  "ndpr": "data-protection",
  "ccpa": "data-protection",
  "pipeda": "data-protection",
  "popia": "data-protection",
  "multi-jurisdictional": "data-protection",
  "blockchain-privacy": "data-protection",
  
  // Industry-Specific Services
  "pci-dss": "industry-specific",
  "hitrust": "industry-specific",
  "financial-ng": "industry-specific",
  "telecom-ng": "industry-specific",
  
  // Cybersecurity Services
  "vapt": "cybersecurity",
  "smart-contract-security": "cybersecurity",
  "security-operations": "cybersecurity",
  
  // Web3 Regulatory Services
  "mica-readiness": "web3-regulatory",
  "vasp-registration": "web3-regulatory",
  "msb-registration": "web3-regulatory",
  "emi-licensing": "web3-regulatory",
  "legal-entity": "web3-regulatory",
  
  // AML/KYC Services
  "aml-program": "aml-kyc",
  "kyc-cdd": "aml-kyc",
  "transaction-monitoring": "aml-kyc",
  "sanctions-compliance": "aml-kyc",
  
  // Token Governance Services
  "whitepaper-review": "token-governance",
  "tokenomics-compliance": "token-governance",
  "securities-law": "token-governance",
  "dao-governance": "token-governance",
  
  // Corporate Governance Services
  "internal-compliance": "corporate-governance",
  "board-governance": "corporate-governance",
  "risk-management": "corporate-governance",
  
  // ESG Services
  "esg-policy": "esg",
  "responsible-ai": "esg",
  
  // Training & Advisory (links to contact page)
  "compliance-training": "training",
  "ongoing-advisory": "training",
};
