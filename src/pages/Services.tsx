import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  X,
  MapPin,
  Clock,
  DollarSign,
  Star
} from "lucide-react";

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

export default function Services() {
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
              Licenses & Registrations
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Comprehensive licensing and registration services across multiple jurisdictions. 
              Fast-track your market entry with our expert regulatory guidance.
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
                <div className="text-sm text-muted-foreground">Successful Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">2-12</div>
                <div className="text-sm text-muted-foreground">Months Timeline</div>
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
              <h3 className="text-xl font-semibold text-foreground mb-2">No services found</h3>
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
                          <Link to={`/contact?service=${entity.id}`}>
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

      {/* Why Choose Legum */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Expert Regulatory Guidance
            </h2>
            <p className="text-muted-foreground">
              Our team of compliance experts will guide you through every step of the licensing process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-accent/20">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Multi-Jurisdictional Expertise</h3>
              </div>
              <p className="text-muted-foreground">
                Deep knowledge of regulatory requirements across 15+ jurisdictions worldwide.
              </p>
            </Card>

            <Card className="p-6 border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-accent/20">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Streamlined Process</h3>
              </div>
              <p className="text-muted-foreground">
                Our proven methodology reduces time-to-license and minimizes regulatory friction.
              </p>
            </Card>

            <Card className="p-6 border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-accent/20">
                  <Building2 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground">End-to-End Support</h3>
              </div>
              <p className="text-muted-foreground">
                From initial assessment to license acquisition and ongoing compliance support.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 via-background to-accent/5 border-accent/20">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-8">
                Contact our team today to discuss your licensing requirements and get a customized roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/buy-licensed-entity">
                    Buy Licensed Entity
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
