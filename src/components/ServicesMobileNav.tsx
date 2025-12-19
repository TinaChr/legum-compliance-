import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { id: "isms", title: "Information Security Management" },
  { id: "data-protection", title: "Data Protection & Privacy" },
  { id: "industry-specific", title: "Industry-Specific Compliance" },
  { id: "cybersecurity", title: "Cybersecurity & Technical" },
  { id: "web3-regulatory", title: "Web3 Regulatory & Licensing" },
  { id: "aml-kyc", title: "AML/KYC & Financial Crime" },
  { id: "token-governance", title: "Token Issuance & Governance" },
  { id: "corporate-governance", title: "Corporate Governance & Risk" },
  { id: "esg", title: "ESG & Responsible Innovation" },
  { id: "training-advisory", title: "Training & Advisory" },
];

export function ServicesMobileNav() {
  const [activeSection, setActiveSection] = useState<string>(categories[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    categories.forEach((category) => {
      const element = document.getElementById(category.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const activeCategory = categories.find((c) => c.id === activeSection);

  return (
    <div className="xl:hidden sticky top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-3 px-4 -mx-4 sm:-mx-6 lg:-mx-8">
      <Select value={activeSection} onValueChange={scrollToSection}>
        <SelectTrigger className="w-full bg-card border-border">
          <SelectValue placeholder="Jump to section">
            {activeCategory?.title || "Jump to section"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-card border-border z-50">
          {categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id}
              className="cursor-pointer"
            >
              {category.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
