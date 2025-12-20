import { Linkedin, Mail, MapPin, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Legum Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-foreground">Legum</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Your Compliance Partner for the Digital Age. Traditional compliance & Web3 regulatory 
              solutions — accessible, affordable, and achievable.
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
              <a
                href="mailto:compliance@legum.com.ng"
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors group"
              >
                <Mail className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:compliance@legum.com.ng" className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-5 w-5 shrink-0 mt-0.5" />
                  <span>compliance@legum.com.ng</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com/company/legum-limited" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5 shrink-0 mt-0.5" />
                  <span>legum-limited</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>No. 5 Kwaji Close, Maitama<br />Abuja, Nigeria</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 shrink-0 mt-0.5" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM WAT</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {[
                "ISO 27001 Certification",
                "SOC 2 Compliance",
                "GDPR & NDPR",
                "Web3 Compliance",
                "Smart Contract Audits",
                "VASP Registration",
              ].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "#why-legum" },
                { label: "Services", href: "#services" },
                { label: "Packages", href: "#packages" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </a>
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
          <p className="text-muted-foreground text-sm">
            No. 5 Kwaji Close, Maitama, Abuja, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
};
