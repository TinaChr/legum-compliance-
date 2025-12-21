import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  Building2, 
  Globe, 
  Shield, 
  FileCheck, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  X,
  MapPin,
  Clock,
  DollarSign,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

interface LicensedEntity {
  id: string;
  name: string;
  jurisdiction: string;
  type: string;
  description: string;
  features: string[];
  price: string;
  timeline: string;
  popular?: boolean;
  category: string;
}

const licensedEntities: LicensedEntity[] = [
  // VASP Licenses
  {
    id: "vasp-uae-vara",
    name: "UAE VARA VASP License",
    jurisdiction: "United Arab Emirates",
    type: "VASP License",
    description: "Virtual Asset Service Provider license from the Virtual Assets Regulatory Authority (VARA) in Dubai.",
    features: [
      "Full crypto exchange operations",
      "Custody services permitted",
      "Broker-dealer activities",
      "NFT marketplace operations",
      "Lending and staking services"
    ],
    price: "Contact for pricing",
    timeline: "3-6 months",
    popular: true,
    category: "VASP Registration"
  },
  {
    id: "vasp-uae-adgm",
    name: "UAE ADGM FSRA License",
    jurisdiction: "United Arab Emirates (Abu Dhabi)",
    type: "FSRA License",
    description: "Financial Services Regulatory Authority license from Abu Dhabi Global Market for virtual asset activities.",
    features: [
      "Virtual asset custody",
      "Virtual asset exchange",
      "Virtual asset management",
      "Multilateral trading facility",
      "Regulated sandbox options"
    ],
    price: "Contact for pricing",
    timeline: "4-8 months",
    category: "VASP Registration"
  },
  {
    id: "vasp-singapore",
    name: "Singapore MAS License",
    jurisdiction: "Singapore",
    type: "Payment Services License",
    description: "Major Payment Institution (MPI) license from the Monetary Authority of Singapore for digital payment token services.",
    features: [
      "Digital payment token dealing",
      "Cross-border money transfer",
      "E-money issuance",
      "Account issuance services",
      "Domestic money transfer"
    ],
    price: "Contact for pricing",
    timeline: "6-12 months",
    popular: true,
    category: "VASP Registration"
  },
  {
    id: "vasp-hongkong",
    name: "Hong Kong VASP License",
    jurisdiction: "Hong Kong",
    type: "VASP License",
    description: "Virtual Asset Service Provider license from the Securities and Futures Commission (SFC) of Hong Kong.",
    features: [
      "Virtual asset trading platform",
      "Retail and professional investors",
      "Custody solutions",
      "Token listing services",
      "OTC trading permitted"
    ],
    price: "Contact for pricing",
    timeline: "6-9 months",
    category: "VASP Registration"
  },
  // EMI & Payment Institution Licenses
  {
    id: "emi-lithuania",
    name: "Lithuania EMI License",
    jurisdiction: "Lithuania (EU)",
    type: "Electronic Money Institution",
    description: "EU-wide Electronic Money Institution license enabling e-money issuance and payment services across the European Economic Area.",
    features: [
      "E-money issuance",
      "Payment processing",
      "EU passporting rights",
      "IBAN account issuance",
      "Card program management"
    ],
    price: "Contact for pricing",
    timeline: "6-9 months",
    popular: true,
    category: "EMI & Payment Institution"
  },
  {
    id: "emi-ireland",
    name: "Ireland EMI License",
    jurisdiction: "Ireland (EU)",
    type: "Electronic Money Institution",
    description: "Central Bank of Ireland regulated EMI license with full EU passporting capabilities.",
    features: [
      "E-money issuance",
      "Payment services",
      "EU/EEA passporting",
      "Safeguarding requirements",
      "Virtual IBAN services"
    ],
    price: "Contact for pricing",
    timeline: "9-12 months",
    category: "EMI & Payment Institution"
  },
  {
    id: "pi-uk",
    name: "UK Payment Institution License",
    jurisdiction: "United Kingdom",
    type: "Authorized Payment Institution",
    description: "FCA regulated payment institution license for authorized payment services in the United Kingdom.",
    features: [
      "Payment initiation services",
      "Account information services",
      "Money remittance",
      "Payment execution",
      "Merchant acquiring"
    ],
    price: "Contact for pricing",
    timeline: "6-12 months",
    category: "EMI & Payment Institution"
  },
  // MSB Registrations
  {
    id: "msb-usa-fincen",
    name: "US FinCEN MSB Registration",
    jurisdiction: "United States",
    type: "Money Services Business",
    description: "Federal FinCEN registration as a Money Services Business with state-level money transmitter licensing support.",
    features: [
      "Virtual currency exchange",
      "Money transmission",
      "Currency dealing",
      "Check cashing",
      "Multi-state licensing"
    ],
    price: "Contact for pricing",
    timeline: "3-18 months (varies by state)",
    category: "MSB Registration"
  },
  {
    id: "msb-canada",
    name: "Canada FINTRAC MSB",
    jurisdiction: "Canada",
    type: "Money Services Business",
    description: "FINTRAC registered Money Services Business for cryptocurrency and virtual asset operations in Canada.",
    features: [
      "Virtual currency dealing",
      "Money transfer services",
      "Currency exchange",
      "Remittance services",
      "Bitcoin ATM operations"
    ],
    price: "Contact for pricing",
    timeline: "2-4 months",
    category: "MSB Registration"
  },
  // Legal Entity Structures
  {
    id: "foundation-switzerland",
    name: "Swiss Foundation",
    jurisdiction: "Switzerland",
    type: "Foundation Structure",
    description: "Swiss foundation setup for token issuance, DAO governance, and decentralized project management.",
    features: [
      "Token issuance vehicle",
      "DAO legal wrapper",
      "Tax efficient structure",
      "Regulatory clarity",
      "Foundation council governance"
    ],
    price: "Contact for pricing",
    timeline: "2-4 months",
    popular: true,
    category: "Legal Entity Structuring"
  },
  {
    id: "foundation-cayman",
    name: "Cayman Islands Foundation",
    jurisdiction: "Cayman Islands",
    type: "Foundation Company",
    description: "Cayman Foundation Company structure ideal for decentralized protocols and token ecosystems.",
    features: [
      "No beneficial owners required",
      "Flexible governance",
      "Tax neutral jurisdiction",
      "Token project friendly",
      "DAO integration support"
    ],
    price: "Contact for pricing",
    timeline: "1-2 months",
    category: "Legal Entity Structuring"
  },
  {
    id: "foundation-bvi",
    name: "BVI Foundation",
    jurisdiction: "British Virgin Islands",
    type: "Limited Purpose Company",
    description: "BVI company structure with foundation characteristics for Web3 projects and token issuance.",
    features: [
      "Flexible corporate structure",
      "No taxation",
      "Privacy protection",
      "Quick incorporation",
      "Token issuance ready"
    ],
    price: "Contact for pricing",
    timeline: "1-2 weeks",
    category: "Legal Entity Structuring"
  },
  {
    id: "foundation-panama",
    name: "Panama Private Foundation",
    jurisdiction: "Panama",
    type: "Private Foundation",
    description: "Panama Private Interest Foundation for asset protection and crypto project governance.",
    features: [
      "Asset protection",
      "No taxation on foreign income",
      "Founder privacy",
      "Flexible management",
      "Token treasury management"
    ],
    price: "Contact for pricing",
    timeline: "2-4 weeks",
    category: "Legal Entity Structuring"
  },
  {
    id: "dao-wrapper-wyoming",
    name: "Wyoming DAO LLC",
    jurisdiction: "United States (Wyoming)",
    type: "DAO LLC",
    description: "First legally recognized DAO structure in the United States with limited liability protection.",
    features: [
      "Legal personality for DAO",
      "Limited liability for members",
      "Smart contract governance",
      "On-chain voting recognition",
      "US-based legal entity"
    ],
    price: "Contact for pricing",
    timeline: "2-4 weeks",
    category: "Legal Entity Structuring"
  },
  // MiCA Compliance
  {
    id: "mica-casp",
    name: "EU MiCA CASP License",
    jurisdiction: "European Union",
    type: "Crypto-Asset Service Provider",
    description: "Markets in Crypto-Assets Regulation (MiCA) compliant Crypto-Asset Service Provider authorization.",
    features: [
      "EU-wide operations",
      "Custody and administration",
      "Exchange services",
      "Order execution",
      "Advisory services"
    ],
    price: "Contact for pricing",
    timeline: "6-12 months",
    popular: true,
    category: "MiCA Readiness"
  },
  {
    id: "mica-stablecoin",
    name: "MiCA Stablecoin Authorization",
    jurisdiction: "European Union",
    type: "E-Money Token / Asset-Referenced Token",
    description: "MiCA authorization for stablecoin issuance as either E-Money Tokens (EMT) or Asset-Referenced Tokens (ART).",
    features: [
      "Stablecoin issuance",
      "EU market access",
      "Reserve requirements compliance",
      "Whitepaper authorization",
      "Redemption rights framework"
    ],
    price: "Contact for pricing",
    timeline: "9-15 months",
    category: "MiCA Readiness"
  }
];

const categories = [
  "All",
  "VASP Registration",
  "EMI & Payment Institution",
  "MSB Registration",
  "Legal Entity Structuring",
  "MiCA Readiness"
];

// Buyer Form Component
function BuyerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    jurisdiction: "",
    licenseType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Inquiry Submitted",
      description: "Thank you for your interest. Our team will contact you shortly.",
    });
    
    setFormData({ name: "", email: "", company: "", jurisdiction: "", licenseType: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="buyer-name">Full Name *</Label>
          <Input
            id="buyer-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="buyer-email">Email *</Label>
          <Input
            id="buyer-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="john@company.com"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="buyer-company">Company</Label>
          <Input
            id="buyer-company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Company Name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="buyer-jurisdiction">Preferred Jurisdiction</Label>
          <Input
            id="buyer-jurisdiction"
            value={formData.jurisdiction}
            onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
            placeholder="e.g., UAE, Singapore, EU"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="buyer-license">License Type of Interest</Label>
        <Input
          id="buyer-license"
          value={formData.licenseType}
          onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
          placeholder="e.g., VASP, EMI, MSB"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="buyer-message">Additional Details</Label>
        <Textarea
          id="buyer-message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your requirements, timeline, and any specific preferences..."
          rows={3}
        />
      </div>
      <input type="hidden" name="interest" value="buyer" />
      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  );
}

// Seller Form Component
function SellerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    entityType: "",
    jurisdiction: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Inquiry Submitted",
      description: "Thank you for reaching out. Our team will contact you shortly.",
    });
    
    setFormData({ name: "", email: "", company: "", entityType: "", jurisdiction: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="seller-name">Full Name *</Label>
          <Input
            id="seller-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="seller-email">Email *</Label>
          <Input
            id="seller-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="john@company.com"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="seller-company">Company / Entity Name</Label>
          <Input
            id="seller-company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Entity Name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="seller-jurisdiction">Entity Jurisdiction</Label>
          <Input
            id="seller-jurisdiction"
            value={formData.jurisdiction}
            onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
            placeholder="e.g., UAE, Singapore, EU"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="seller-type">Entity / License Type</Label>
        <Input
          id="seller-type"
          value={formData.entityType}
          onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
          placeholder="e.g., VASP, EMI, Foundation"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="seller-message">Entity Details</Label>
        <Textarea
          id="seller-message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Describe your entity, its history, operational status, and reason for selling..."
          rows={3}
        />
      </div>
      <input type="hidden" name="interest" value="seller" />
      <Button type="submit" className="w-full" variant="outline" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Listing Inquiry"}
        {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  );
}

export default function BuyLicensedEntity() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredEntities = licensedEntities.filter((entity) => {
    const matchesSearch = 
      entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || entity.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">
              Licensed Entities & Regulatory Structures
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Buy Licensed Entities
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Acquire pre-licensed entities and regulatory structures across multiple jurisdictions. 
              Fast-track your market entry with ready-to-operate licenses and legal frameworks.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">15+</div>
                <div className="text-sm text-muted-foreground">Jurisdictions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">6</div>
                <div className="text-sm text-muted-foreground">License Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">50+</div>
                <div className="text-sm text-muted-foreground">Successful Transfers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">2-12</div>
                <div className="text-sm text-muted-foreground">Weeks Timeline</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 border-b border-border/50 sticky top-16 bg-background/95 backdrop-blur-md z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search licenses, jurisdictions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Entities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredEntities.length === 0 ? (
            <div className="text-center py-16">
              <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No entities found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEntities.map((entity, index) => (
                <motion.div
                  key={entity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/50 group relative overflow-hidden">
                    {entity.popular && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-accent text-accent-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg group-hover:text-accent transition-colors">
                            {entity.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {entity.jurisdiction}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="w-fit mt-2">
                        {entity.type}
                      </Badge>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground mb-4">
                        {entity.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        {entity.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground/80">{feature}</span>
                          </div>
                        ))}
                        {entity.features.length > 4 && (
                          <span className="text-sm text-muted-foreground">
                            +{entity.features.length - 4} more features
                          </span>
                        )}
                      </div>

                      <div className="mt-auto pt-4 border-t border-border/50">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{entity.timeline}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm font-medium text-accent">
                            <DollarSign className="h-4 w-4" />
                            <span>{entity.price}</span>
                          </div>
                        </div>
                        <Button className="w-full group/btn" asChild>
                          <Link to={`/contact?entity=${entity.id}`}>
                            Inquire Now
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Acquire Instead of Apply */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              Smart Investment
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Acquire Instead of Apply?
            </h2>
            <p className="text-muted-foreground">
              Acquiring a licensed entity offers significant advantages over the traditional application process.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Acquire Column */}
            <Card className="p-6 border-accent/50 bg-accent/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-accent/20">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Acquire a Licensed Entity</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">2-12 weeks timeline</span>
                    <p className="text-sm text-muted-foreground">Immediate market access upon transfer completion</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Pre-approved compliance</span>
                    <p className="text-sm text-muted-foreground">Established frameworks already vetted by regulators</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Operational infrastructure</span>
                    <p className="text-sm text-muted-foreground">Banking relationships, policies, and procedures in place</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Lower regulatory risk</span>
                    <p className="text-sm text-muted-foreground">Proven track record with the regulator</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Predictable costs</span>
                    <p className="text-sm text-muted-foreground">Fixed acquisition price vs uncertain application fees</p>
                  </div>
                </li>
              </ul>
            </Card>

            {/* Apply Column */}
            <Card className="p-6 border-border/50 bg-muted/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-muted">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Apply for New License</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">6-24 months timeline</span>
                    <p className="text-sm text-muted-foreground">Lengthy regulatory review and approval process</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Uncertain outcome</span>
                    <p className="text-sm text-muted-foreground">No guarantee of approval after extensive effort</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Build from scratch</span>
                    <p className="text-sm text-muted-foreground">Must develop all policies, procedures, and relationships</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Higher regulatory scrutiny</span>
                    <p className="text-sm text-muted-foreground">New applicants face stricter vetting</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Escalating costs</span>
                    <p className="text-sm text-muted-foreground">Legal fees, consultants, and revisions add up</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What We Offer
            </h2>
            <p className="text-muted-foreground">
              Comprehensive support for both buyers and sellers of licensed entities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Buyers */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full p-8 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">I Want to Buy</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Interested in acquiring a licensed entity? Fill out the form below and our team will get back to you.
                </p>
                <BuyerForm />
              </Card>
            </motion.div>

            {/* For Sellers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full p-8 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Globe className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">I Want to Sell</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Looking to sell your licensed entity? Tell us about it and we'll connect you with qualified buyers.
                </p>
                <SellerForm />
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Jurisdictions */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              Global Coverage
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Key Jurisdictions
            </h2>
            <p className="text-muted-foreground">
              We specialize in licensed entities across the world's most important financial and crypto regulatory hubs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "United Arab Emirates", flag: "🇦🇪", types: "VARA, ADGM" },
              { name: "Singapore", flag: "🇸🇬", types: "MAS PSL" },
              { name: "Hong Kong", flag: "🇭🇰", types: "SFC VASP" },
              { name: "European Union", flag: "🇪🇺", types: "MiCA, EMI" },
              { name: "United Kingdom", flag: "🇬🇧", types: "FCA PI" },
              { name: "Switzerland", flag: "🇨🇭", types: "Foundations" },
              { name: "Lithuania", flag: "🇱🇹", types: "EMI, PI" },
              { name: "United States", flag: "🇺🇸", types: "MSB, MTL" },
              { name: "Canada", flag: "🇨🇦", types: "MSB" },
              { name: "Cayman Islands", flag: "🇰🇾", types: "Foundations" },
            ].map((jurisdiction, index) => (
              <motion.div
                key={jurisdiction.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="p-4 text-center hover:shadow-md hover:border-accent/50 transition-all cursor-pointer group">
                  <div className="text-4xl mb-2">{jurisdiction.flag}</div>
                  <h4 className="font-medium text-sm text-foreground group-hover:text-accent transition-colors">
                    {jurisdiction.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{jurisdiction.types}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Our streamlined acquisition process ensures a smooth and efficient transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Initial Consultation",
                description: "Discuss your requirements, target jurisdictions, and timeline. We match you with suitable entities.",
                icon: Building2
              },
              {
                step: "02",
                title: "Due Diligence",
                description: "Comprehensive review of entity documentation, compliance history, and regulatory standing.",
                icon: FileCheck
              },
              {
                step: "03",
                title: "Transaction & Filing",
                description: "Structure the deal, prepare documentation, and submit change of control applications to regulators.",
                icon: Shield
              },
              {
                step: "04",
                title: "Transfer & Onboarding",
                description: "Complete the transfer, update banking relationships, and hand over operational control.",
                icon: Globe
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="relative p-6 h-full border-border/50 hover:border-accent/50 transition-all group overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-muted/20 group-hover:text-accent/10 transition-colors">
                    {item.step}
                  </div>
                  <div className="relative z-10">
                    <div className="p-3 rounded-lg bg-accent/10 w-fit mb-4">
                      <item.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <Card className="bg-background/80 backdrop-blur-sm border-accent/20 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Ready to Fast-Track Your Market Entry?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Whether you're looking to buy a licensed entity or sell your existing license, 
                    our team of regulatory experts is here to guide you through every step.
                  </p>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      Free initial consultation
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      Confidential and secure process
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      Expert regulatory guidance
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <Button size="lg" className="w-full text-lg py-6" asChild>
                    <Link to="/contact">
                      Schedule a Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full" asChild>
                    <Link to="/services">
                      Explore Our Services
                    </Link>
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Or email us directly at{" "}
                    <a href="mailto:info@legumcompliance.com" className="text-accent hover:underline">
                      info@legumcompliance.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
