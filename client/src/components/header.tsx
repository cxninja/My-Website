import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, TrendingUp, BarChart3, Zap, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { brand } from "@/config/brand";

const servicesDropdown = [
  { 
    name: "Digital Marketing", 
    href: "/service/digital-marketing", 
    icon: TrendingUp, 
    description: "Full-funnel measurement, CRO sprints, paid media systems"
  },
  { 
    name: "Manufacturing Analytics", 
    href: "/service/manufacturing-analytics", 
    icon: BarChart3, 
    description: "OEE dashboards, anomaly detection, line telemetry pipelines"
  },
  { 
    name: "Digital Transformation", 
    href: "/service/digital-transformation", 
    icon: Zap, 
    description: "Process automation, data integration, workflow optimization"
  },
  { 
    name: "Customer Success", 
    href: "/service/customer-success", 
    icon: Users, 
    description: "Health scoring, onboarding systems, churn prevention"
  }
];

const navigation = [
  { name: "Home", href: "/" },
  { 
    name: "Services", 
    href: "/services",
    dropdown: servicesDropdown
  },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Leadership", href: "/leadership" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "https://google.com", external: true },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  const handleLinkClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, "_blank", "noopener noreferrer");
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'header-blur bg-background/80 border-b border-border' 
          : 'bg-transparent'
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display font-bold text-xl text-foreground" data-testid="link-logo">
            {brand.name.split(' ')[0]}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => 
              item.dropdown ? (
                <DropdownMenu key={item.name} open={isServicesOpen} onOpenChange={setIsServicesOpen}>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className={`link-underline text-sm font-medium hover:text-accent transition-colors flex items-center gap-1 ${
                        isActiveLink(item.href) ? 'active' : ''
                      }`}
                      onMouseEnter={() => setIsServicesOpen(true)}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-96 p-0"
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-1 gap-4">
                        {item.dropdown.map((subItem) => {
                          const IconComponent = subItem.icon;
                          return (
                            <DropdownMenuItem key={subItem.name} asChild className="p-0">
                              <Link 
                                href={subItem.href} 
                                className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent transition-colors group cursor-pointer" 
                                data-testid={`dropdown-link-${subItem.name.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                                  <IconComponent className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm text-foreground group-hover:text-white transition-colors">
                                    {subItem.name}
                                  </h4>
                                  <p className="text-xs text-muted-foreground group-hover:text-white/90 mt-1 leading-relaxed transition-colors">
                                    {subItem.description}
                                  </p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors flex-shrink-0 mt-1" />
                              </Link>
                            </DropdownMenuItem>
                          );
                        })}
                      </div>
                      <div className="mt-6 pt-4 border-t border-border">
                        <Link 
                          href="/services" 
                          className="flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-accent/5 transition-colors group text-sm font-medium text-accent"
                        >
                          View All Services
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href, item.external)}
                  className={`link-underline text-sm font-medium hover:text-accent transition-colors ${
                    isActiveLink(item.href) ? 'active' : ''
                  }`}
                  data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden p-2"
                data-testid="button-mobile-menu"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item, index) => 
                  item.dropdown ? (
                    <div key={item.name} className="space-y-2">
                      <div className="text-lg font-semibold text-accent py-2">{item.name}</div>
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => handleLinkClick(subItem.href)}
                          className={`text-base font-medium hover:text-accent transition-colors py-1 pl-4 block ${
                            isActiveLink(subItem.href) ? 'text-accent' : ''
                          }`}
                          style={{ 
                            animationDelay: `${(index + subIndex) * 100}ms`,
                            animation: isMobileMenuOpen ? 'slideInFromRight 0.3s ease-out forwards' : undefined
                          }}
                          data-testid={`mobile-dropdown-link-${subItem.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => handleLinkClick(item.href, item.external)}
                      className={`text-lg font-medium hover:text-accent transition-colors py-2 ${
                        isActiveLink(item.href) ? 'text-accent' : ''
                      }`}
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        animation: isMobileMenuOpen ? 'slideInFromRight 0.3s ease-out forwards' : undefined
                      }}
                      data-testid={`mobile-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
