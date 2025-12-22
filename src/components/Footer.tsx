import { Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Legum Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-foreground">Legum</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Your Compliance Partner for the Digital Age.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/company/legum-limited"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors group"
              >
                <Linkedin className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {[
                { label: "VASP Registration", href: "/services" },
                { label: "EMI & Payment Institution", href: "/services" },
                { label: "MSB Registration", href: "/services" },
                { label: "Legal Entity Structuring", href: "/services" },
                { label: "MiCA Readiness", href: "/services" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                { label: "Documents", href: "/documents" },
                { label: "Buy/Sell License", href: "/buy-licensed-entity" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Why Legum", href: "/#why-legum", isExternal: false },
                { label: "Services", href: "/services", isExternal: false },
                { label: "Contact", href: "/contact", isExternal: false },
                { label: "Book a Call", href: "https://calendly.com/chioma-legum/30min", isExternal: true },
              ].map((item) => (
                <li key={item.label}>
                  {item.isExternal ? (
                    <a 
                      href={item.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Legum Limited. All rights reserved.
          </p>
          <a
            href="https://linkedin.com/company/legum-limited"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground text-sm hover:text-primary transition-colors"
          >
            Follow us on LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};
