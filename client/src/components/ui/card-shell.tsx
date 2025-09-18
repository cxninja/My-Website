import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface CardShellProps {
  // Content
  title: string;
  description: string | React.ReactNode;
  meta?: string;
  ctaText?: string;
  
  // Visual elements
  icon?: LucideIcon;
  image?: string;
  imageAlt?: string;
  
  // Navigation/Action
  href?: string;
  onClick?: () => void;
  
  // Layout & Styling
  className?: string;
  delay?: number;
  
  // Accessibility
  dataTestId?: string;
  ariaLabel?: string;
  
  // Variants
  variant?: "default" | "compact" | "feature";
}

export function CardShell({
  title,
  description,
  meta,
  ctaText = "Learn More →",
  icon: Icon,
  image,
  imageAlt,
  href,
  onClick,
  className,
  delay = 0,
  dataTestId,
  ariaLabel,
  variant = "default"
}: CardShellProps) {
  
  const handleAction = () => {
    if (onClick) {
      onClick();
    } else if (href?.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cardContent = (
    <CardContent className={cn(
      "p-0 h-full flex flex-col",
      variant === "compact" && "p-6",
      variant === "feature" && "p-8"
    )}>
      {/* Image Section */}
      {image && (
        <div className="relative overflow-hidden">
          <img 
            src={image}
            alt={imageAlt || title}
            className={cn(
              "w-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500",
              variant === "compact" ? "h-32" : "h-48"
            )}
          />
        </div>
      )}
      
      <div className={cn(
        "flex flex-col flex-1 justify-between",
        image ? "p-6" : "p-6",
        variant === "feature" && "p-8"
      )}>
        {/* Header Section */}
        <div className="flex-1">
          {/* Icon & Meta */}
          <div className="flex items-center justify-between mb-4">
            {Icon && !image && (
              <div className={cn(
                "bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors",
                variant === "compact" ? "w-10 h-10" : "w-12 h-12"
              )}>
                <Icon className={cn(
                  "text-accent group-hover:text-white transition-colors",
                  variant === "compact" ? "w-5 h-5" : "w-6 h-6"
                )} />
              </div>
            )}
            {meta && (
              <span className="text-xs font-medium text-muted-foreground">
                {meta}
              </span>
            )}
          </div>

          {/* Title & Description */}
          <h3 className={cn(
            "font-display font-bold mb-3 group-hover:text-accent transition-colors",
            variant === "compact" ? "text-lg" : "text-xl"
          )}>
            {title}
          </h3>
          <div className="text-muted-foreground leading-relaxed">
            {typeof description === 'string' ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </div>
        </div>

        {/* CTA Section - Pinned to Bottom */}
        {ctaText && (
          <div className="mt-6 pt-2">
            <span 
              className="inline-flex items-center text-accent font-semibold group-hover:translate-x-1 transition-transform duration-200"
              aria-label={ariaLabel || `${ctaText.replace(' →', '')} for ${title}`}
            >
              <span>{ctaText}</span>
            </span>
          </div>
        )}
      </div>
    </CardContent>
  );

  return (
    <FadeIn delay={delay}>
      <Card 
        className={cn(
          "standard-card group relative overflow-hidden h-full",
          className
        )}
        data-testid={dataTestId}
      >
        {href && !href.startsWith("#") ? (
          <Link 
            href={href} 
            className="block h-full cursor-pointer"
            data-testid={`${dataTestId}-link`}
          >
            {cardContent}
          </Link>
        ) : (
          <div 
            className={cn(
              "h-full cursor-pointer",
              (onClick || href?.startsWith("#")) && "cursor-pointer"
            )}
            onClick={handleAction}
            role={onClick || href ? "button" : undefined}
            tabIndex={onClick || href ? 0 : undefined}
            onKeyDown={(e) => {
              if ((onClick || href) && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                handleAction();
              }
            }}
          >
            {cardContent}
          </div>
        )}
        
        {/* Hover Decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Card>
    </FadeIn>
  );
}