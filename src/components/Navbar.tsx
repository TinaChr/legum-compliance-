import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface SubItem {
  name: string;
  href: string;
  isPage?: boolean;
}

interface NavLink {
  name: string;
  href: string;
  isPage: boolean;
  subItems?: SubItem[];
}

const navLinks: NavLink[] = [
  { 
    name: "Services", 
    href: "/services", 
    isPage: true,
    subItems: [
      { name: "VASP Registration", href: "/services", isPage: true },
      { name: "EMI & Payment Institution", href: "/services", isPage: true },
      { name: "MSB Registration", href: "/services", isPage: true },
      { name: "Legal Entity Structuring", href: "/services", isPage: true },
      { name: "MiCA Readiness", href: "/services", isPage: true },
    ]
  },
  { 
    name: "Policy Templates", 
    href: "/documents", 
    isPage: true,
    subItems: [
      { name: "ISMS Policies", href: "/documents#isms", isPage: true },
      { name: "Data Protection", href: "/documents#data-protection", isPage: true },
      { name: "AML/KYC Policies", href: "/documents#aml-kyc", isPage: true },
      { name: "Web3 Regulatory", href: "/documents#web3-regulatory", isPage: true },
      { name: "Token Governance", href: "/documents#token-governance", isPage: true },
      { name: "Corporate Governance", href: "/documents#corporate-governance", isPage: true },
    ]
  },
  { 
    name: "Buy/Sell License", 
    href: "/buy-licensed-entity", 
    isPage: true
  },
  { name: "Why Legum", href: "/#why-legum", isPage: false },
  { name: "Contact", href: "/contact", isPage: true },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown(openMobileDropdown === name ? null : name);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Legum Logo" className="h-8 w-8" />
            <span className={`text-xl font-bold transition-colors ${isScrolled ? 'text-foreground' : 'text-foreground'}`}>
              Legum
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.subItems && handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
              >
                {link.isPage ? (
                  <Link
                    to={link.href}
                    className={`text-sm font-medium transition-colors hover:text-accent flex items-center gap-1 py-2 ${
                      isScrolled ? "text-foreground/70" : "text-foreground/70"
                    }`}
                  >
                    {link.name}
                    {link.subItems && (
                      <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                    )}
                  </Link>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-sm font-medium transition-colors hover:text-accent flex items-center gap-1 py-2 ${
                      isScrolled ? "text-foreground/70" : "text-foreground/70"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.subItems && openDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                      <div className="py-2">
                        {link.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-2.5 text-sm text-foreground/80 hover:bg-accent/10 hover:text-accent transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant={isScrolled ? "hero" : "heroOutline"} size="default" asChild>
              <a href="https://calendly.com/chioma-legum/30min" target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-foreground' : 'text-foreground'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-foreground' : 'text-foreground'}`} />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4"
            >
              <div className="flex flex-col gap-2 bg-card rounded-xl p-4 shadow-lg border border-border">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.subItems ? (
                      <>
                        <button
                          onClick={() => toggleMobileDropdown(link.name)}
                          className="flex items-center justify-between w-full text-foreground/70 hover:text-accent font-medium py-2"
                        >
                          {link.name}
                          <ChevronDown className={`h-4 w-4 transition-transform ${openMobileDropdown === link.name ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {openMobileDropdown === link.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 border-l-2 border-accent/30 ml-2 mb-2"
                            >
                              {link.subItems.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  className="block text-sm text-foreground/60 hover:text-accent py-2"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : link.isPage ? (
                      <Link
                        to={link.href}
                        className="text-foreground/70 hover:text-accent font-medium py-2 block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-foreground/70 hover:text-accent font-medium py-2 block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Button variant="hero" size="default" className="mt-2" asChild>
                  <a href="https://calendly.com/chioma-legum/30min" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                    Book a Call
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};