import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Building2,
  Shield,
  FileText,
  Calculator,
  X,
  Clock,
  Sparkles
} from "lucide-react";

interface Framework {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  timeline: string;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  frameworks: Framework[];
}

const categories: Category[] = [
  {
    id: "vasp",
    name: "VASP Registration",
    description: "Virtual Asset Service Provider licensing across multiple jurisdictions",
    icon: <Building2 className="h-6 w-6" />,
    frameworks: [
      { id: "vasp-uae-vara", name: "UAE VARA VASP License", description: "Dubai Virtual Assets Regulatory Authority", basePrice: 45000, timeline: "3-6 months" },
      { id: "vasp-uae-adgm", name: "UAE ADGM FSRA License", description: "Abu Dhabi Global Market", basePrice: 55000, timeline: "4-8 months" },
      { id: "vasp-singapore", name: "Singapore MAS License", description: "Monetary Authority of Singapore", basePrice: 65000, timeline: "6-12 months" },
      { id: "vasp-hongkong", name: "Hong Kong VASP License", description: "Securities and Futures Commission", basePrice: 75000, timeline: "6-9 months" },
    ]
  },
  {
    id: "emi",
    name: "EMI & Payment Institution",
    description: "Electronic Money Institution and Payment Institution licensing",
    icon: <Shield className="h-6 w-6" />,
    frameworks: [
      { id: "emi-lithuania", name: "Lithuania EMI License", description: "EU-wide e-money operations", basePrice: 85000, timeline: "6-9 months" },
      { id: "emi-ireland", name: "Ireland EMI License", description: "Central Bank of Ireland regulated", basePrice: 120000, timeline: "9-12 months" },
      { id: "pi-uk", name: "UK Payment Institution License", description: "FCA regulated payment services", basePrice: 95000, timeline: "6-12 months" },
    ]
  },
  {
    id: "msb",
    name: "MSB Registration",
    description: "Money Services Business registration in North America",
    icon: <FileText className="h-6 w-6" />,
    frameworks: [
      { id: "msb-usa-fincen", name: "US FinCEN MSB Registration", description: "Federal registration + state licensing", basePrice: 35000, timeline: "3-18 months" },
      { id: "msb-canada", name: "Canada FINTRAC MSB", description: "FINTRAC registered operations", basePrice: 25000, timeline: "2-4 months" },
    ]
  },
  {
    id: "legal-entity",
    name: "Legal Entity Structuring",
    description: "Foundations, DAOs, and corporate structures for Web3",
    icon: <Building2 className="h-6 w-6" />,
    frameworks: [
      { id: "foundation-switzerland", name: "Swiss Foundation", description: "Token issuance & DAO governance", basePrice: 45000, timeline: "2-4 months" },
      { id: "foundation-cayman", name: "Cayman Islands Foundation", description: "Flexible foundation company", basePrice: 35000, timeline: "1-2 months" },
      { id: "foundation-bvi", name: "BVI Foundation", description: "Quick incorporation for Web3", basePrice: 15000, timeline: "1-2 weeks" },
      { id: "foundation-panama", name: "Panama Private Foundation", description: "Asset protection structure", basePrice: 20000, timeline: "2-4 weeks" },
      { id: "dao-wrapper-wyoming", name: "Wyoming DAO LLC", description: "Legal DAO structure in US", basePrice: 12000, timeline: "2-4 weeks" },
    ]
  },
  {
    id: "mica",
    name: "MiCA Readiness",
    description: "EU Markets in Crypto-Assets Regulation compliance",
    icon: <Shield className="h-6 w-6" />,
    frameworks: [
      { id: "mica-casp", name: "EU MiCA CASP License", description: "Crypto-Asset Service Provider", basePrice: 95000, timeline: "6-12 months" },
      { id: "mica-stablecoin", name: "MiCA Stablecoin Authorization", description: "EMT or ART issuance", basePrice: 150000, timeline: "9-15 months" },
    ]
  }
];

const addOns: AddOn[] = [
  { id: "aml-program", name: "AML/KYC Program Development", description: "Complete anti-money laundering compliance framework", price: 15000 },
  { id: "compliance-manual", name: "Compliance Manual & Policies", description: "Customized policies and procedures documentation", price: 8000 },
  { id: "staff-training", name: "Staff Compliance Training", description: "Comprehensive team training program", price: 5000 },
  { id: "ongoing-support", name: "12-Month Ongoing Support", description: "Dedicated compliance support and monitoring", price: 24000 },
  { id: "tech-integration", name: "Technology Integration", description: "Compliance software setup and integration", price: 12000 },
  { id: "regulatory-liaison", name: "Regulatory Liaison Services", description: "Direct communication with regulators", price: 10000 },
];

interface QuoteBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteBuilder({ isOpen, onClose }: QuoteBuilderProps) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const currentCategory = categories.find(c => c.id === selectedCategory);

  const calculateTotal = () => {
    let total = 0;
    
    // Add framework prices
    selectedFrameworks.forEach(fId => {
      categories.forEach(cat => {
        const framework = cat.frameworks.find(f => f.id === fId);
        if (framework) total += framework.basePrice;
      });
    });
    
    // Add add-on prices
    selectedAddOns.forEach(aId => {
      const addOn = addOns.find(a => a.id === aId);
      if (addOn) total += addOn.price;
    });
    
    return total;
  };

  const getSelectedFrameworkDetails = () => {
    const frameworks: Framework[] = [];
    selectedFrameworks.forEach(fId => {
      categories.forEach(cat => {
        const framework = cat.frameworks.find(f => f.id === fId);
        if (framework) frameworks.push(framework);
      });
    });
    return frameworks;
  };

  const getSelectedAddOnDetails = () => {
    return addOns.filter(a => selectedAddOns.includes(a.id));
  };

  const handleFrameworkToggle = (frameworkId: string) => {
    setSelectedFrameworks(prev => 
      prev.includes(frameworkId) 
        ? prev.filter(id => id !== frameworkId)
        : [...prev, frameworkId]
    );
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const resetBuilder = () => {
    setStep(1);
    setSelectedCategory(null);
    setSelectedFrameworks([]);
    setSelectedAddOns([]);
  };

  const handleClose = () => {
    resetBuilder();
    onClose();
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedCategory !== null;
      case 2: return selectedFrameworks.length > 0;
      case 3: return true; // Add-ons are optional
      case 4: return true;
      default: return false;
    }
  };

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
              <h2 className="text-xl font-bold text-foreground">Quote Builder</h2>
              <p className="text-sm text-muted-foreground">Build your custom compliance package</p>
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
              { num: 1, label: "Category" },
              { num: 2, label: "Frameworks" },
              { num: 3, label: "Add-ons" },
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
            {/* Step 1: Select Category */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Select a Service Category</h3>
                  <p className="text-sm text-muted-foreground">Choose the type of compliance service you need</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <Card 
                      key={category.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedCategory === category.id 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'hover:border-accent/50'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${selectedCategory === category.id ? 'bg-primary/20' : 'bg-muted'}`}>
                            {category.icon}
                          </div>
                          <CardTitle className="text-base">{category.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{category.description}</CardDescription>
                        <Badge variant="outline" className="mt-2">
                          {category.frameworks.length} options
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Frameworks */}
            {step === 2 && currentCategory && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Select Compliance Frameworks</h3>
                  <p className="text-sm text-muted-foreground">Choose one or more frameworks from {currentCategory.name}</p>
                </div>
                <div className="space-y-3">
                  {currentCategory.frameworks.map((framework) => (
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
                        <div className="flex items-start gap-4">
                          <Checkbox 
                            checked={selectedFrameworks.includes(framework.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-foreground">{framework.name}</h4>
                                <p className="text-sm text-muted-foreground">{framework.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-primary">
                                  ${framework.basePrice.toLocaleString()}
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
              </motion.div>
            )}

            {/* Step 3: Select Add-ons */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Optional Add-ons</h3>
                  <p className="text-sm text-muted-foreground">Enhance your compliance package with additional services</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {addOns.map((addOn) => (
                    <Card 
                      key={addOn.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedAddOns.includes(addOn.id) 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'hover:border-accent/50'
                      }`}
                      onClick={() => handleAddOnToggle(addOn.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            checked={selectedAddOns.includes(addOn.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-medium text-foreground text-sm">{addOn.name}</h4>
                                <p className="text-xs text-muted-foreground">{addOn.description}</p>
                              </div>
                              <div className="font-semibold text-primary whitespace-nowrap">
                                +${addOn.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mb-3">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Your Custom Quote</h3>
                  <p className="text-sm text-muted-foreground">Review your selections and indicative pricing</p>
                </div>

                <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5">
                  <CardContent className="p-6 space-y-6">
                    {/* Selected Frameworks */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        Selected Frameworks
                      </h4>
                      <div className="space-y-2">
                        {getSelectedFrameworkDetails().map((framework) => (
                          <div key={framework.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                            <div>
                              <div className="font-medium text-foreground">{framework.name}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {framework.timeline}
                              </div>
                            </div>
                            <div className="font-semibold text-foreground">
                              ${framework.basePrice.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Selected Add-ons */}
                    {selectedAddOns.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-accent" />
                          Add-on Services
                        </h4>
                        <div className="space-y-2">
                          {getSelectedAddOnDetails().map((addOn) => (
                            <div key={addOn.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                              <div className="font-medium text-foreground">{addOn.name}</div>
                              <div className="font-semibold text-foreground">
                                ${addOn.price.toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Total */}
                    <div className="pt-4 border-t-2 border-primary/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-foreground">Indicative Total</div>
                          <div className="text-xs text-muted-foreground">*Final pricing may vary based on requirements</div>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          ${calculateTotal().toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Ready to proceed? Our team will prepare a detailed proposal based on your selections.
                  </p>
                  <Button asChild>
                    <a href={`/contact?quote=custom&total=${calculateTotal()}&frameworks=${selectedFrameworks.join(',')}&addons=${selectedAddOns.join(',')}`}>
                      Request Detailed Proposal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-border bg-muted/30 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : handleClose()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          
          {step < 4 && (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
