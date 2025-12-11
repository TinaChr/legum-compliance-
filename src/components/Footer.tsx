import { Shield, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-accent">
                <Shield className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold text-primary-foreground">Legum</span>
            </div>
            <p className="text-primary-foreground/70 max-w-md mb-6">
              Your Compliance Partner for the Digital Age. Traditional compliance & Web3 regulatory 
              solutions — accessible, affordable, and achievable.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/company/legum-limited"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors group"
              >
                <Linkedin className="h-5 w-5 text-primary-foreground group-hover:text-accent-foreground" />
              </a>
              <a
                href="mailto:compliance@legum.com.ng"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors group"
              >
                <Mail className="h-5 w-5 text-primary-foreground group-hover:text-accent-foreground" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-primary-foreground font-semibold mb-4">Services</h4>
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
                  <a href="#services" className="text-primary-foreground/60 hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "#why-legum" },
                { label: "Services", href: "#services" },
                { label: "Packages", href: "#packages" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-primary-foreground/60 hover:text-accent transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Legum Limited. All rights reserved.
          </p>
          <p className="text-primary-foreground/50 text-sm">
            No. 5 Kwaji Close, Maitama, Abuja, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
};
