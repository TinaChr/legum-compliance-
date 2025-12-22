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
  ArrowRight, 
  CheckCircle2, 
  Clock,
  ShoppingCart,
  Store
} from "lucide-react";
import { Link } from "react-router-dom";

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
              Licensed Entity Marketplace
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Buy or Sell Licensed Entities
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Acquire pre-licensed entities or list your licensed entity for sale. 
              Fast-track your market entry with ready-to-operate licenses.
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

      {/* Buy or Sell Forms */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Buy Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full border-accent/50">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-full bg-accent/20">
                      <ShoppingCart className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">I Want to Buy</CardTitle>
                      <CardDescription>Acquire a licensed entity</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <BuyerForm />
                </CardContent>
              </Card>
            </motion.div>

            {/* Sell Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-full bg-primary/20">
                      <Store className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">I Want to Sell</CardTitle>
                      <CardDescription>List your licensed entity</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <SellerForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                  <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">6-18+ months timeline</span>
                    <p className="text-sm text-muted-foreground">Extended regulatory review and approval process</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Compliance from scratch</span>
                    <p className="text-sm text-muted-foreground">Build all policies and procedures from the ground up</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Banking challenges</span>
                    <p className="text-sm text-muted-foreground">Establishing banking relationships can be difficult</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Approval uncertainty</span>
                    <p className="text-sm text-muted-foreground">No guarantee of successful license approval</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Variable costs</span>
                    <p className="text-sm text-muted-foreground">Application fees, legal costs, and ongoing expenses</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Process */}
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
              Our streamlined process makes acquiring or selling licensed entities simple and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Submit Inquiry",
                description: "Fill out the form with your requirements or entity details"
              },
              {
                step: "02",
                title: "Consultation",
                description: "Our team reviews and schedules a detailed consultation"
              },
              {
                step: "03",
                title: "Due Diligence",
                description: "Comprehensive review and verification process"
              },
              {
                step: "04",
                title: "Transfer Complete",
                description: "Finalize the transaction and ownership transfer"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full text-center border-border/50 hover:border-accent/50 transition-colors">
                  <div className="text-4xl font-bold text-accent/30 mb-4">{item.step}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 via-background to-accent/5 border-accent/20 max-w-4xl mx-auto">
            <div className="text-center">
              <Building2 className="h-12 w-12 text-accent mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Need Help Choosing?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Not sure if acquiring a licensed entity is right for you? Browse our services 
                to explore all available licensing and registration options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/services">
                    View All Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">
                    Contact Us
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
