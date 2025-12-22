import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Shield,
  FileText,
  Calculator,
  X,
  Clock,
  Sparkles,
  AlertCircle,
  Briefcase
} from "lucide-react";

interface Framework {
  id: string;
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  timeline: string;
  category: string;
}

interface PolicyAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface ServiceAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

// Compliance frameworks (from Services page)
const frameworks: Framework[] = [
  // VASP Registration
  { id: "vasp-uae-vara", name: "UAE VARA VASP License", description: "Dubai Virtual Assets Regulatory Authority", minPrice: 35000, maxPrice: 55000, timeline: "3-6 months", category: "VASP Registration" },
  { id: "vasp-uae-adgm", name: "UAE ADGM FSRA License", description: "Abu Dhabi Global Market", minPrice: 45000, maxPrice: 70000, timeline: "4-8 months", category: "VASP Registration" },
  { id: "vasp-singapore", name: "Singapore MAS License", description: "Monetary Authority of Singapore", minPrice: 55000, maxPrice: 85000, timeline: "6-12 months", category: "VASP Registration" },
  { id: "vasp-hongkong", name: "Hong Kong VASP License", description: "Securities and Futures Commission", minPrice: 65000, maxPrice: 95000, timeline: "6-9 months", category: "VASP Registration" },
  // EMI & Payment Institution
  { id: "emi-lithuania", name: "Lithuania EMI License", description: "EU-wide e-money operations", minPrice: 70000, maxPrice: 110000, timeline: "6-9 months", category: "EMI & Payment Institution" },
  { id: "emi-ireland", name: "Ireland EMI License", description: "Central Bank of Ireland regulated", minPrice: 100000, maxPrice: 150000, timeline: "9-12 months", category: "EMI & Payment Institution" },
  { id: "pi-uk", name: "UK Payment Institution License", description: "FCA regulated payment services", minPrice: 80000, maxPrice: 120000, timeline: "6-12 months", category: "EMI & Payment Institution" },
  // MSB Registration
  { id: "msb-usa-fincen", name: "US FinCEN MSB Registration", description: "Federal registration + state licensing", minPrice: 25000, maxPrice: 50000, timeline: "3-18 months", category: "MSB Registration" },
  { id: "msb-canada", name: "Canada FINTRAC MSB", description: "FINTRAC registered operations", minPrice: 18000, maxPrice: 35000, timeline: "2-4 months", category: "MSB Registration" },
  // Legal Entity Structuring
  { id: "foundation-switzerland", name: "Swiss Foundation", description: "Token issuance & DAO governance", minPrice: 35000, maxPrice: 60000, timeline: "2-4 months", category: "Legal Entity Structuring" },
  { id: "foundation-cayman", name: "Cayman Islands Foundation", description: "Flexible foundation company", minPrice: 25000, maxPrice: 45000, timeline: "1-2 months", category: "Legal Entity Structuring" },
  { id: "foundation-bvi", name: "BVI Foundation", description: "Quick incorporation for Web3", minPrice: 10000, maxPrice: 20000, timeline: "1-2 weeks", category: "Legal Entity Structuring" },
  { id: "foundation-panama", name: "Panama Private Foundation", description: "Asset protection structure", minPrice: 15000, maxPrice: 28000, timeline: "2-4 weeks", category: "Legal Entity Structuring" },
  { id: "dao-wrapper-wyoming", name: "Wyoming DAO LLC", description: "Legal DAO structure in US", minPrice: 8000, maxPrice: 18000, timeline: "2-4 weeks", category: "Legal Entity Structuring" },
  // MiCA Readiness
  { id: "mica-casp", name: "EU MiCA CASP License", description: "Crypto-Asset Service Provider", minPrice: 80000, maxPrice: 120000, timeline: "6-12 months", category: "MiCA Readiness" },
  { id: "mica-stablecoin", name: "MiCA Stablecoin Authorization", description: "EMT or ART issuance", minPrice: 120000, maxPrice: 190000, timeline: "9-15 months", category: "MiCA Readiness" },
];

// Policy add-ons (from Documents page)
const policyAddOns: PolicyAddOn[] = [
  // AML/KYC
  { id: "aml-ctf-policies", name: "AML/CTF Policy Bundle", description: "Complete AML/CTF policy manual with CDD, EDD, and SAR procedures", price: 600, category: "AML/KYC" },
  { id: "kyc-cdd-policies", name: "KYC/CDD Policy Bundle", description: "KYC policy set with PEP screening, sanctions, and beneficial ownership", price: 550, category: "AML/KYC" },
  { id: "transaction-monitoring-policies", name: "Transaction Monitoring Policies", description: "Transaction monitoring with crypto-specific rules", price: 400, category: "AML/KYC" },
  { id: "sanctions-policies", name: "Sanctions Compliance Policies", description: "OFAC, UN, EU sanctions policies with wallet screening", price: 350, category: "AML/KYC" },
  // Data Protection
  { id: "gdpr-policies", name: "GDPR Policy Bundle", description: "Comprehensive GDPR policy set with DPIAs and privacy notices", price: 500, category: "Data Protection" },
  { id: "ndpr-policies", name: "NDPR Policy Bundle", description: "Nigeria Data Protection Regulation policy set", price: 350, category: "Data Protection" },
  // Web3 Regulatory
  { id: "vasp-policies", name: "VASP Compliance Policies", description: "Virtual Asset Service Provider policies with travel rule", price: 550, category: "Web3 Regulatory" },
  { id: "mica-policies", name: "MiCA Compliance Policies", description: "Complete MiCA policy set with crypto-asset classification", price: 600, category: "Web3 Regulatory" },
  // Token Governance
  { id: "securities-policies", name: "Securities Law Policies", description: "Securities policies including Reg D, Reg S, Reg CF", price: 550, category: "Token Governance" },
  { id: "whitepaper-policies", name: "Whitepaper Publication Policies", description: "Risk disclosure templates and safe harbor language", price: 300, category: "Token Governance" },
  { id: "tokenomics-policies", name: "Tokenomics Compliance Policies", description: "Distribution, vesting, and supply mechanics policies", price: 400, category: "Token Governance" },
  { id: "dao-governance-policies", name: "DAO Governance Policies", description: "Voting mechanisms, treasury, and contributor agreements", price: 500, category: "Token Governance" },
  // ISMS
  { id: "iso27001-policies", name: "ISO 27001 Policy Bundle", description: "Complete set of 25+ required policies for ISO 27001", price: 750, category: "Information Security" },
  { id: "soc2-policies", name: "SOC 2 Policy Bundle", description: "Security, Availability, Confidentiality, and Privacy policies", price: 450, category: "Information Security" },
  // Corporate Governance
  { id: "internal-compliance-policies", name: "Internal Compliance Policies", description: "Code of conduct, ethics, and whistleblower policies", price: 450, category: "Corporate Governance" },
  { id: "board-governance-policies", name: "Board & Governance Policies", description: "Board charter, committee charters, and conflict of interest", price: 400, category: "Corporate Governance" },
];

// Additional service add-ons
const serviceAddOns: ServiceAddOn[] = [
  { id: "aml-program", name: "AML/KYC Program Development", description: "Complete anti-money laundering compliance framework", price: 15000 },
  { id: "staff-training", name: "Staff Compliance Training", description: "Comprehensive team training program", price: 5000 },
  { id: "ongoing-support", name: "12-Month Ongoing Support", description: "Dedicated compliance support and monitoring", price: 24000 },
  { id: "tech-integration", name: "Technology Integration", description: "Compliance software setup and integration", price: 12000 },
  { id: "regulatory-liaison", name: "Regulatory Liaison Services", description: "Direct communication with regulators", price: 10000 },
  { id: "gap-analysis", name: "Regulatory Gap Analysis", description: "Comprehensive compliance assessment", price: 8000 },
];

const frameworkCategories = [
  "VASP Registration",
  "EMI & Payment Institution", 
  "MSB Registration",
  "Legal Entity Structuring",
  "MiCA Readiness"
];

interface QuoteBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteBuilder({ isOpen, onClose }: QuoteBuilderProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const calculatePriceRange = () => {
    let minTotal = 0;
    let maxTotal = 0;
    
    // Add framework prices
    selectedFrameworks.forEach(fId => {
      const framework = frameworks.find(f => f.id === fId);
      if (framework) {
        minTotal += framework.minPrice;
        maxTotal += framework.maxPrice;
      }
    });
    
    // Add policy prices
    selectedPolicies.forEach(pId => {
      const policy = policyAddOns.find(p => p.id === pId);
      if (policy) {
        minTotal += policy.price;
        maxTotal += policy.price;
      }
    });
    
    // Add service prices
    selectedServices.forEach(sId => {
      const service = serviceAddOns.find(s => s.id === sId);
      if (service) {
        minTotal += service.price;
        maxTotal += service.price;
      }
    });
    
    return { min: minTotal, max: maxTotal };
  };

  const getSelectedFrameworkDetails = () => {
    return frameworks.filter(f => selectedFrameworks.includes(f.id));
  };

  const getSelectedPolicyDetails = () => {
    return policyAddOns.filter(p => selectedPolicies.includes(p.id));
  };

  const getSelectedServiceDetails = () => {
    return serviceAddOns.filter(s => selectedServices.includes(s.id));
  };

  const handleFrameworkToggle = (frameworkId: string) => {
    setSelectedFrameworks(prev => 
      prev.includes(frameworkId) 
        ? prev.filter(id => id !== frameworkId)
        : [...prev, frameworkId]
    );
  };

  const handlePolicyToggle = (policyId: string) => {
    setSelectedPolicies(prev => 
      prev.includes(policyId) 
        ? prev.filter(id => id !== policyId)
        : [...prev, policyId]
    );
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const resetBuilder = () => {
    setStep(1);
    setSelectedFrameworks([]);
    setSelectedPolicies([]);
    setSelectedServices([]);
  };

  const handleClose = () => {
    resetBuilder();
    onClose();
  };

  const handleRequestQuote = () => {
    const selectedItems = [
      ...selectedFrameworks,
      ...selectedPolicies,
      ...selectedServices
    ].join(",");
    handleClose();
    navigate(`/contact?quote=${encodeURIComponent(selectedItems)}`);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedFrameworks.length > 0;
      case 2: return true; // Policies are optional
      case 3: return true; // Services are optional
      case 4: return true;
      default: return false;
    }
  };

  const priceRange = calculatePriceRange();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-card rounded-2xl border border-border shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Build Your Quote</h2>
              <p className="text-sm text-muted-foreground">Get an indicative price for your compliance package</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: "Framework" },
              { num: 2, label: "Policies" },
              { num: 3, label: "Services" },
              { num: 4, label: "Review" }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div className={`flex items-center gap-2 ${step >= s.num ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step > s.num 
                      ? 'bg-primary text-primary-foreground' 
                      : step === s.num 
                        ? 'bg-primary/20 text-primary border-2 border-primary' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {step > s.num ? <CheckCircle2 className="h-4 w-4" /> : s.num}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">{s.label}</span>
                </div>
                {idx < 3 && (
                  <div className={`w-12 sm:w-20 h-0.5 mx-2 ${step > s.num ? 'bg-primary' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          <AnimatePresence mode="wait">
            {/* Step 1: Select Compliance Framework */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Choose Compliance Framework(s)</h3>
                  <p className="text-sm text-muted-foreground">Select one or more licensing/registration frameworks</p>
                </div>
                
                {frameworkCategories.map((category) => {
                  const categoryFrameworks = frameworks.filter(f => f.category === category);
                  return (
                    <div key={category} className="space-y-3">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        {category}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categoryFrameworks.map((framework) => (
                          <Card 
                            key={framework.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              selectedFrameworks.includes(framework.id) 
                                ? 'border-primary ring-2 ring-primary/20' 
                                : 'hover:border-accent/50'
                            }`}
                            onClick={() => handleFrameworkToggle(framework.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <Checkbox 
                                  checked={selectedFrameworks.includes(framework.id)}
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <h5 className="font-medium text-foreground text-sm">{framework.name}</h5>
                                      <p className="text-xs text-muted-foreground">{framework.description}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                      <div className="text-xs font-semibold text-primary">
                                        ${framework.minPrice.toLocaleString()} - ${framework.maxPrice.toLocaleString()}
                                      </div>
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        {framework.timeline}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Step 2: Optional Policy Add-ons */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Optional Policy Add-ons</h3>
                  <p className="text-sm text-muted-foreground">Enhance your compliance package with policy documentation</p>
                </div>
                
                {["AML/KYC", "Data Protection", "Web3 Regulatory", "Token Governance", "Information Security", "Corporate Governance"].map((category) => {
                  const categoryPolicies = policyAddOns.filter(p => p.category === category);
                  if (categoryPolicies.length === 0) return null;
                  return (
                    <div key={category} className="space-y-3">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <FileText className="h-4 w-4 text-accent" />
                        {category}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categoryPolicies.map((policy) => (
                          <Card 
                            key={policy.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              selectedPolicies.includes(policy.id) 
                                ? 'border-primary ring-2 ring-primary/20' 
                                : 'hover:border-accent/50'
                            }`}
                            onClick={() => handlePolicyToggle(policy.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <Checkbox 
                                  checked={selectedPolicies.includes(policy.id)}
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <h5 className="font-medium text-foreground text-sm">{policy.name}</h5>
                                      <p className="text-xs text-muted-foreground">{policy.description}</p>
                                    </div>
                                    <div className="font-semibold text-primary whitespace-nowrap text-sm">
                                      +${policy.price.toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                <div className="text-center text-sm text-muted-foreground mt-4">
                  <Sparkles className="inline h-4 w-4 mr-1" />
                  Policies are optional. You can skip this step.
                </div>
              </motion.div>
            )}

            {/* Step 3: Optional Service Add-ons */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Optional Additional Services</h3>
                  <p className="text-sm text-muted-foreground">Add professional services to support your compliance journey</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {serviceAddOns.map((service) => (
                    <Card 
                      key={service.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedServices.includes(service.id) 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'hover:border-accent/50'
                      }`}
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            checked={selectedServices.includes(service.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-medium text-foreground text-sm">{service.name}</h4>
                                <p className="text-xs text-muted-foreground">{service.description}</p>
                              </div>
                              <div className="font-semibold text-primary whitespace-nowrap text-sm">
                                +${service.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center text-sm text-muted-foreground mt-4">
                  <Sparkles className="inline h-4 w-4 mr-1" />
                  Additional services are optional. You can skip this step.
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Review Your Quote</h3>
                  <p className="text-sm text-muted-foreground">Review your selections and indicative pricing</p>
                </div>
                
                <div className="space-y-6">
                  {/* Selected Frameworks */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Compliance Frameworks
                    </h4>
                    {getSelectedFrameworkDetails().length > 0 ? (
                      <div className="space-y-2">
                        {getSelectedFrameworkDetails().map((framework) => (
                          <div key={framework.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <div>
                              <div className="font-medium text-sm">{framework.name}</div>
                              <div className="text-xs text-muted-foreground">{framework.timeline}</div>
                            </div>
                            <div className="text-sm font-medium text-primary">
                              ${framework.minPrice.toLocaleString()} - ${framework.maxPrice.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No frameworks selected</p>
                    )}
                  </div>

                  {/* Selected Policies */}
                  {getSelectedPolicyDetails().length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <FileText className="h-4 w-4 text-accent" />
                        Policy Add-ons
                      </h4>
                      <div className="space-y-2">
                        {getSelectedPolicyDetails().map((policy) => (
                          <div key={policy.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <div className="font-medium text-sm">{policy.name}</div>
                            <div className="text-sm font-medium text-primary">
                              +${policy.price.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selected Services */}
                  {getSelectedServiceDetails().length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-accent" />
                        Additional Services
                      </h4>
                      <div className="space-y-2">
                        {getSelectedServiceDetails().map((service) => (
                          <div key={service.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <div className="font-medium text-sm">{service.name}</div>
                            <div className="text-sm font-medium text-primary">
                              +${service.price.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Indicative Price Range */}
                  <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-2">Indicative Price Range</div>
                        <div className="text-3xl font-bold text-primary mb-4">
                          ${priceRange.min.toLocaleString()} - ${priceRange.max.toLocaleString()}
                        </div>
                        <div className="flex items-start gap-2 p-3 bg-background/50 rounded-lg text-left">
                          <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <p className="text-xs text-muted-foreground">
                            This is an indicative estimate only. Final pricing will be determined after a detailed consultation to understand your specific requirements, jurisdictional complexities, and timeline considerations.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : handleClose()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>

          <div className="flex items-center gap-4">
            {priceRange.max > 0 && step < 4 && (
              <div className="text-right hidden sm:block">
                <div className="text-xs text-muted-foreground">Estimated Range</div>
                <div className="font-semibold text-primary">
                  ${priceRange.min.toLocaleString()} - ${priceRange.max.toLocaleString()}
                </div>
              </div>
            )}

            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
              >
                {step === 1 ? 'Next' : 'Continue'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleRequestQuote} variant="hero">
                Request Detailed Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
