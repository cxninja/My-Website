import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { brand } from "../client/src/config/brand";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "https://google.com", external: true },
];

interface SSRHeaderProps {
  currentPath: string;
}

export function SSRHeader({ currentPath }: SSRHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActiveLink = (href: string) => {
    if (href === "/" && currentPath === "/") return true;
    if (href !== "/" && currentPath.startsWith(href)) return true;
    return false;
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return React.createElement(
    "header",
    { 
      className: "fixed top-0 w-full z-50 transition-all duration-300 bg-transparent",
      "data-testid": "header"
    },
    React.createElement(
      "div",
      { className: "max-w-7xl mx-auto px-6 py-4" },
      React.createElement(
        "nav",
        { className: "flex items-center justify-between" },
        React.createElement(
          "a",
          { 
            href: "/", 
            className: "font-display font-bold text-xl text-foreground", 
            "data-testid": "link-logo"
          },
          brand.name.split(' ')[0]
        ),
        React.createElement(
          "div",
          { className: "hidden md:flex items-center space-x-8" },
          navigation.map((item) =>
            React.createElement(
              "a",
              {
                key: item.name,
                href: item.href,
                target: item.external ? "_blank" : undefined,
                rel: item.external ? "noopener noreferrer" : undefined,
                className: `link-underline text-sm font-medium hover:text-accent transition-colors ${
                  isActiveLink(item.href) ? 'active' : ''
                }`,
                "data-testid": `link-${item.name.toLowerCase().replace(/\s+/g, '-')}`
              },
              item.name
            )
          )
        ),
        React.createElement(
          "div",
          { className: "md:hidden" },
          React.createElement(
            "button",
            {
              className: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10",
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
              "data-testid": "button-mobile-menu"
            },
            React.createElement(Menu, { className: "h-6 w-6" })
          )
        )
      )
    )
  );
}