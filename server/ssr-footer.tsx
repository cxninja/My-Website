import React from "react";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { brand } from "../client/src/config/brand";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function SSRFooter() {
  return React.createElement(
    "footer",
    { className: "bg-secondary/30 border-t border-border mt-20" },
    React.createElement(
      "div",
      { className: "max-w-7xl mx-auto px-6 py-16" },
      React.createElement(
        "div",
        { className: "grid md:grid-cols-4 gap-8" },
        React.createElement(
          "div",
          { className: "md:col-span-2" },
          React.createElement(
            "h3",
            { className: "font-display font-bold text-xl mb-4" },
            brand.name
          ),
          React.createElement(
            "p",
            { className: "text-muted-foreground mb-6" },
            "Strategic consulting for transformative growth. We help ambitious companies scale through data-driven insights and proven methodologies."
          ),
          React.createElement(
            "div",
            { className: "flex space-x-4" },
            React.createElement(
              "a",
              {
                href: "https://linkedin.com",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-muted-foreground hover:text-accent transition-colors",
                "data-testid": "link-linkedin"
              },
              React.createElement(Linkedin, { className: "h-5 w-5" })
            ),
            React.createElement(
              "a",
              {
                href: "mailto:hello@astravantage.com",
                className: "text-muted-foreground hover:text-accent transition-colors",
                "data-testid": "link-email"
              },
              React.createElement(Mail, { className: "h-5 w-5" })
            )
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "h4",
            { className: "font-semibold mb-4" },
            "Quick Links"
          ),
          React.createElement(
            "ul",
            { className: "space-y-2" },
            quickLinks.map((link) =>
              React.createElement(
                "li",
                { key: link.name },
                React.createElement(
                  "a",
                  {
                    href: link.href,
                    className: "text-muted-foreground hover:text-accent transition-colors",
                    "data-testid": `footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`
                  },
                  link.name
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "h4",
            { className: "font-semibold mb-4" },
            "Contact"
          ),
          React.createElement(
            "div",
            { className: "space-y-2 text-muted-foreground" },
            React.createElement(
              "div",
              { className: "flex items-center space-x-2" },
              React.createElement(MapPin, { className: "h-4 w-4" }),
              React.createElement("span", null, "San Francisco, CA")
            ),
            React.createElement(
              "div",
              { className: "flex items-center space-x-2" },
              React.createElement(Mail, { className: "h-4 w-4" }),
              React.createElement("span", null, "hello@astravantage.com")
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "border-t border-border mt-12 pt-8 text-center text-muted-foreground" },
        React.createElement(
          "p",
          null,
          `© ${new Date().getFullYear()} ${brand.name}. All rights reserved.`
        )
      )
    )
  );
}