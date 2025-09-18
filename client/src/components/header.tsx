import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, TrendingUp, BarChart3, Zap, Users, ArrowRight, Target, Crown, Globe, Brain, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { brand } from "@/config/brand";

const capabilitiesDropdown = [
  { 
    name: "Customer Success", 
    href: "/capability/customer-success", 
    icon: Users, 
    description: "Retention mastery (95%+): Churn prediction, relationship ecosystems"
  },
  { 
    name: "Digital Marketing", 
    href: "/capability/digital-marketing", 
    icon: TrendingUp, 
    description: "Growth campaigns (40%+ leads): SEO/PPC, AI personalization"
  },
  { 
    name: "Digital Transformation", 
    href: "/capability/digital-transformation", 
    icon: Zap, 
    description: "Efficiency revolutions (35%+): CRM/AI integrations, agile pivots"
  },
  { 
    name: "GTM Strategy", 
    href: "/capability/gtm-strategy", 
    icon: Target, 
    description: "Market dominance: Planning to launch, CEO-synced"
  },
  { 
    name: "Leadership & Scaling", 
    href: "/capability/leadership-scaling", 
    icon: Crown, 
    description: "Winning teams (5-50+, 25% productivity): Selfless builds"
  },
  { 
    name: "Cross-Industry Adaptability", 
    href: "/capability/cross-industry", 
    icon: Globe, 
    description: "Seamless shifts: Startup hustle to enterprise polish"
  },
  { 
    name: "AI Innovation", 
    href: "/capability/ai-innovation", 
    icon: Brain, 
    description: "Tool creation: SOW generators and beyond"
  },
  { 
    name: "Stakeholder Engagement", 
    href: "/capability/stakeholder-engagement", 
    icon: Network, 
    description: "Syncing deciders: CEO collaborations, influence without noise"
  }
];

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { 
    name: "Expertise", 
    href: "/expertise",
    dropdown: capabilitiesDropdown
  },
  { name: "Edgy Insights", href: "/edgy-insights" },
  { name: "Innovations", href: "/innovations" },
  { name: "Toolkit", href: "/toolkit" },
  { name: "Connect", href: "/connect" },
  { name: "Blog", href: "https://google.com", external: true },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExpertiseOpen, setIsExpertiseOpen] = useState(false);
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
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-foreground" data-testid="link-logo">
            <img src="/images/MainLogo.png" alt="" className="h-10" />
            {brand.name.split(' ')[0]}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => 
              item.dropdown ? (
                <DropdownMenu key={item.name} open={isExpertiseOpen} onOpenChange={setIsExpertiseOpen}>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className={`link-underline text-sm font-medium hover:text-accent transition-colors flex items-center gap-1 ${
                        isActiveLink(item.href) ? 'active' : ''
                      }`}
                      onMouseEnter={() => setIsExpertiseOpen(true)}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-[800px] p-0"
                    onMouseLeave={() => setIsExpertiseOpen(false)}
                    align="center"
                  >
                    <div className="p-8">
                      <div className="mb-6">
                        <h3 className="font-display font-bold text-lg text-foreground mb-2">
                          8 Capability Pillars
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          The NovaTransform Edge: Interconnected capabilities for explosive business transformation
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        {item.dropdown.map((subItem) => {
                          const IconComponent = subItem.icon;
                          return (
                            <DropdownMenuItem key={subItem.name} asChild className="p-0">
                              <Link 
                                href={subItem.href} 
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors group cursor-pointer border border-transparent hover:border-accent/20" 
                                data-testid={`dropdown-link-${subItem.name.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                                  <IconComponent className="w-4 h-4 text-accent group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-xs text-foreground group-hover:text-white transition-colors leading-tight">
                                    {subItem.name}
                                  </h4>
                                  <p className="text-xs text-muted-foreground group-hover:text-white/90 mt-1 leading-tight transition-colors line-clamp-2">
                                    {subItem.description}
                                  </p>
                                </div>
                              </Link>
                            </DropdownMenuItem>
                          );
                        })}
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-border flex justify-center">
                        <Link 
                          href="/expertise" 
                          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent/5 transition-colors group text-sm font-medium text-accent"
                        >
                          <Target className="w-4 h-4" />
                          View Full Capability Hub
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
