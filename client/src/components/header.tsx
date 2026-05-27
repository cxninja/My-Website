import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  Menu,
  ChevronDown,
  TrendingUp,
  BarChart3,
  Zap,
  Users,
  Target,
  Crown,
  Globe,
  Brain,
  Network,
  BookOpen,
  Download,
  User,
  Sparkles,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { brand } from "@/config/brand";

// ─── Dropdown contents ──────────────────────────────────────────────────────

const aboutDropdown = [
  {
    name: "About Varun",
    href: "/about",
    icon: User,
    description: "My story, career, and credentials: 19+ years across ops and growth.",
  },
  {
    name: "Philosophy",
    href: "/philosophy",
    icon: Sparkles,
    description: "The manifesto and contrarian principles behind how I work.",
  },
];

const practiceDropdown = [
  {
    name: "Customer Success",
    href: "/expertise/customer-success",
    icon: Users,
    description: "Retention mastery (95%+): Churn prediction, relationship ecosystems",
  },
  {
    name: "Digital Marketing",
    href: "/expertise/digital-marketing",
    icon: TrendingUp,
    description: "Growth campaigns (40%+ leads): SEO/PPC, AI personalization",
  },
  {
    name: "Digital Transformation",
    href: "/expertise/digital-transformation",
    icon: Zap,
    description: "Efficiency revolutions (35%+): CRM/AI integrations, agile pivots",
  },
  {
    name: "GTM Strategy",
    href: "/expertise/gtm-strategy",
    icon: Target,
    description: "Market dominance: Planning to launch, CEO-synced",
  },
  {
    name: "Leadership & Scaling",
    href: "/expertise/leadership-scaling",
    icon: Crown,
    description: "Winning teams (5-50+, 25% productivity): Selfless builds",
  },
  {
    name: "Cross-Industry Adaptability",
    href: "/expertise/cross-industry",
    icon: Globe,
    description: "Seamless shifts: Startup hustle to enterprise polish",
  },
  {
    name: "AI Innovation",
    href: "/expertise/ai-innovation",
    icon: Brain,
    description: "Tool creation: SOW generators and beyond",
  },
  {
    name: "Stakeholder Engagement",
    href: "/expertise/stakeholder-engagement",
    icon: Network,
    description: "Syncing deciders: CEO collaborations, influence without noise",
  },
];

const resourcesDropdown = [
  {
    name: "Blog",
    href: "/blog",
    icon: BookOpen,
    description: "Articles on growth, transformation, and AI-first execution.",
  },
  {
    name: "Toolkit",
    href: "/toolkit",
    icon: Download,
    description: "Free downloadable playbooks, frameworks, and templates.",
  },
];

const navigation: {
  name: string;
  href: string;
  dropdown?: typeof aboutDropdown;
  dropdownTitle?: string;
  dropdownSubtitle?: string;
  dropdownCols?: 1 | 2 | 3;
}[] = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    dropdown: aboutDropdown,
    dropdownTitle: "About Varun",
    dropdownSubtitle: "My story, career, and how I think about the work.",
    dropdownCols: 1,
  },
  {
    name: "Expertise",
    href: "/expertise",
    dropdown: practiceDropdown,
    dropdownTitle: "Expertise",
    dropdownSubtitle: "Eight interconnected capabilities, senior-led and AI-first.",
    dropdownCols: 3,
  },
  { name: "Case Studies", href: "/case-studies" },
  {
    name: "Resources",
    href: "/blog",
    dropdown: resourcesDropdown,
    dropdownTitle: "Resources",
    dropdownSubtitle: "Long-form thinking and ready-to-use playbooks.",
    dropdownCols: 1,
  },
  { name: "Contact", href: "/contact" },
];

// ─── Component ──────────────────────────────────────────────────────────────

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  // Active state for the About dropdown is true if user is on any of the three pages.
  const isAboutActive =
    location === "/about" || location === "/philosophy" || location === "/leadership" || location === "/meet-varun";
  const isResourcesActive =
    location.startsWith("/blog") || location === "/toolkit";

  const groupIsActive = (item: (typeof navigation)[number]) => {
    if (item.name === "About") return isAboutActive;
    if (item.name === "Resources") return isResourcesActive;
    return isActiveLink(item.href);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "header-blur bg-background/80 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display font-bold text-xl text-foreground"
            data-testid="link-logo"
          >
            <img
              src="/images/MainLogo.png"
              alt="Varun Goel"
              width="160"
              height="40"
              className="h-10 w-auto"
            />
            {brand.wordmark}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) =>
              item.dropdown ? (
                <DropdownMenu
                  key={item.name}
                  open={openDropdown === item.name}
                  onOpenChange={(o) => setOpenDropdown(o ? item.name : null)}
                >
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`link-underline text-sm font-medium hover:text-accent transition-colors flex items-center gap-1 ${
                        groupIsActive(item) ? "active" : ""
                      }`}
                      onMouseEnter={() => setOpenDropdown(item.name)}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className={`p-0 ${
                      item.dropdownCols === 3
                        ? "w-[800px]"
                        : item.dropdownCols === 2
                        ? "w-[560px]"
                        : "w-[380px]"
                    }`}
                    onMouseLeave={() => setOpenDropdown(null)}
                    align="center"
                  >
                    <div className="p-8">
                      <div className="mb-6">
                        <h3 className="font-display font-bold text-lg text-foreground mb-2">
                          {item.dropdownTitle ?? item.name}
                        </h3>
                        {item.dropdownSubtitle && (
                          <p className="text-sm text-muted-foreground">
                            {item.dropdownSubtitle}
                          </p>
                        )}
                      </div>

                      <div
                        className={`grid gap-3 ${
                          item.dropdownCols === 3
                            ? "grid-cols-2 lg:grid-cols-3"
                            : item.dropdownCols === 2
                            ? "grid-cols-2"
                            : "grid-cols-1"
                        }`}
                      >
                        {item.dropdown.map((subItem) => {
                          const IconComponent = subItem.icon;
                          return (
                            <DropdownMenuItem key={subItem.name} asChild className="p-0">
                              <Link
                                href={subItem.href}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors group cursor-pointer border border-transparent hover:border-accent/20"
                                data-testid={`dropdown-link-${subItem.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
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
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  onMouseEnter={() => setOpenDropdown(null)}
                  className={`link-underline text-sm font-medium hover:text-accent transition-colors ${
                    isActiveLink(item.href) ? "active" : ""
                  }`}
                  data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Mobile menu */}
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
                      <div className="text-lg font-semibold text-accent py-2">
                        {item.name}
                      </div>
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`text-base font-medium hover:text-accent transition-colors py-1 pl-4 block ${
                            isActiveLink(subItem.href) ? "text-accent" : ""
                          }`}
                          style={{
                            animationDelay: `${(index + subIndex) * 100}ms`,
                            animation: isMobileMenuOpen
                              ? "slideInFromRight 0.3s ease-out forwards"
                              : undefined,
                          }}
                          data-testid={`mobile-dropdown-link-${subItem.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-lg font-medium hover:text-accent transition-colors py-2 ${
                        isActiveLink(item.href) ? "text-accent" : ""
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: isMobileMenuOpen
                          ? "slideInFromRight 0.3s ease-out forwards"
                          : undefined,
                      }}
                      data-testid={`mobile-link-${item.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
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
