import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const serviceOptions = [
  { value: "vasp-registration", label: "VASP Registration" },
  { value: "emi-payment", label: "EMI & Payment Institution" },
  { value: "msb-registration", label: "MSB Registration" },
  { value: "legal-entity", label: "Legal Entity Structuring" },
  { value: "mica-readiness", label: "MiCA Readiness" },
  { value: "policy-templates", label: "Policy Templates" },
  { value: "quote-request", label: "Custom Quote Request" },
  { value: "other", label: "Other" },
];

// Quote item mappings
const quoteItemNames: Record<string, { name: string; type: 'framework' | 'policy' | 'service' }> = {
  // Frameworks
  "vasp-uae-vara": { name: "UAE VARA VASP License", type: "framework" },
  "vasp-uae-adgm": { name: "UAE ADGM FSRA License", type: "framework" },
  "vasp-singapore": { name: "Singapore MAS License", type: "framework" },
  "vasp-hongkong": { name: "Hong Kong VASP License", type: "framework" },
  "emi-lithuania": { name: "Lithuania EMI License", type: "framework" },
  "emi-ireland": { name: "Ireland EMI License", type: "framework" },
  "pi-uk": { name: "UK Payment Institution License", type: "framework" },
  "msb-usa-fincen": { name: "US FinCEN MSB Registration", type: "framework" },
  "msb-canada": { name: "Canada FINTRAC MSB", type: "framework" },
  "foundation-switzerland": { name: "Swiss Foundation", type: "framework" },
  "foundation-cayman": { name: "Cayman Islands Foundation", type: "framework" },
  "foundation-bvi": { name: "BVI Foundation", type: "framework" },
  "foundation-panama": { name: "Panama Private Foundation", type: "framework" },
  "dao-wrapper-wyoming": { name: "Wyoming DAO LLC", type: "framework" },
  "mica-casp": { name: "EU MiCA CASP License", type: "framework" },
  "mica-stablecoin": { name: "MiCA Stablecoin Authorization", type: "framework" },
  // Policies
  "aml-ctf-policies": { name: "AML/CTF Policy Bundle", type: "policy" },
  "kyc-cdd-policies": { name: "KYC/CDD Policy Bundle", type: "policy" },
  "transaction-monitoring-policies": { name: "Transaction Monitoring Policies", type: "policy" },
  "sanctions-policies": { name: "Sanctions Compliance Policies", type: "policy" },
  "gdpr-policies": { name: "GDPR Policy Bundle", type: "policy" },
  "ndpr-policies": { name: "NDPR Policy Bundle", type: "policy" },
  "vasp-policies": { name: "VASP Compliance Policies", type: "policy" },
  "mica-policies": { name: "MiCA Compliance Policies", type: "policy" },
  "securities-policies": { name: "Securities Law Policies", type: "policy" },
  "whitepaper-policies": { name: "Whitepaper Publication Policies", type: "policy" },
  "tokenomics-policies": { name: "Tokenomics Compliance Policies", type: "policy" },
  "dao-governance-policies": { name: "DAO Governance Policies", type: "policy" },
  "iso27001-policies": { name: "ISO 27001 Policy Bundle", type: "policy" },
  "soc2-policies": { name: "SOC 2 Policy Bundle", type: "policy" },
  "internal-compliance-policies": { name: "Internal Compliance Policies", type: "policy" },
  "board-governance-policies": { name: "Board & Governance Policies", type: "policy" },
  // Services
  "aml-program": { name: "AML/KYC Program Development", type: "service" },
  "staff-training": { name: "Staff Compliance Training", type: "service" },
  "ongoing-support": { name: "12-Month Ongoing Support", type: "service" },
  "tech-integration": { name: "Technology Integration", type: "service" },
  "regulatory-liaison": { name: "Regulatory Liaison Services", type: "service" },
  "gap-analysis": { name: "Regulatory Gap Analysis", type: "service" },
};

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ServiceContactForm() {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  // Parse quote selections from URL and pre-fill form
  useEffect(() => {
    const quoteParam = searchParams.get("quote");
    if (quoteParam) {
      const selectedIds = decodeURIComponent(quoteParam).split(",").filter(Boolean);
      
      if (selectedIds.length > 0) {
        const frameworks: string[] = [];
        const policies: string[] = [];
        const services: string[] = [];

        selectedIds.forEach(id => {
          const item = quoteItemNames[id];
          if (item) {
            if (item.type === "framework") frameworks.push(item.name);
            else if (item.type === "policy") policies.push(item.name);
            else if (item.type === "service") services.push(item.name);
          }
        });

        let messageLines: string[] = ["I am interested in receiving a detailed quote for the following selections:"];
        
        if (frameworks.length > 0) {
          messageLines.push("");
          messageLines.push("LICENSING/REGISTRATION:");
          frameworks.forEach(f => messageLines.push(`• ${f}`));
        }
        
        if (policies.length > 0) {
          messageLines.push("");
          messageLines.push("POLICY ADD-ONS:");
          policies.forEach(p => messageLines.push(`• ${p}`));
        }
        
        if (services.length > 0) {
          messageLines.push("");
          messageLines.push("SERVICE ADD-ONS:");
          services.forEach(s => messageLines.push(`• ${s}`));
        }
        
        messageLines.push("");
        messageLines.push("Please provide a detailed proposal and final pricing for these services.");

        setFormData(prev => ({
          ...prev,
          service: "quote-request",
          message: messageLines.join("\n"),
        }));
      }
    }
  }, [searchParams]);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
          <CheckCircle className="h-8 w-8 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Thank you!</h3>
        <p className="text-muted-foreground mb-6">
          We've received your inquiry and will be in touch shortly.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: "", email: "", company: "", service: "", message: "" });
          }}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@company.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            placeholder="Acme Inc."
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className={errors.company ? "border-destructive" : ""}
          />
          {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="service">Service of Interest *</Label>
          <Select value={formData.service} onValueChange={(value) => handleChange("service", value)}>
            <SelectTrigger className={errors.service ? "border-destructive" : ""}>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border z-50">
              {serviceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && <p className="text-sm text-destructive">{errors.service}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your compliance needs..."
          rows={5}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
      </div>

      <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
