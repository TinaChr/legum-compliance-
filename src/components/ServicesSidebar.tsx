import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

export function ServicesSidebar() {
  const [activeSection, setActiveSection] = useState<string>("");

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

  return (
    <nav className="hidden xl:block sticky top-32 h-fit max-h-[calc(100vh-10rem)] overflow-y-auto">
      <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground mb-4 px-2">
          Categories
        </h3>
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => scrollToSection(category.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                  "hover:bg-muted/50 hover:text-foreground",
                  activeSection === category.id
                    ? "bg-accent/10 text-accent font-medium border-l-2 border-accent"
                    : "text-muted-foreground"
                )}
              >
                {category.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
