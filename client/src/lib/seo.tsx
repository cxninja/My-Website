import React from "react";
import { brand } from "@/config/brand";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

// Simplified SEO component for SSR compatibility
export function SEO({ 
  title, 
  description = brand.meta.description,
  image = "/og-image.jpg",
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = "website"
}: SEOProps) {
  // For SSR, just return null since meta tags are handled in the HTML template
  return null;
}
