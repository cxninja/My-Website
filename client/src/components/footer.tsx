import { useState } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { brand } from "@/config/brand";
import { Linkedin, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    try {
      // Simulate newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our insights.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <div className="font-display font-bold text-xl mb-4">
              {brand.name.split(' ')[0]}
            </div>
            <p className="text-muted-foreground text-sm mb-4 max-w-md">
              Senior-led consulting across Digital Marketing, Manufacturing Analytics, 
              Digital Transformation, and Customer Success. Strategy. Systems. Scale.
            </p>
            
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-accent transition-colors"
                  data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Get insights on strategy and systems.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-r-none text-sm"
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="bg-accent text-accent-foreground rounded-l-none hover:bg-accent/90 text-sm px-4"
                data-testid="button-newsletter-subscribe"
              >
                {isSubscribing ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-border grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Mail className="w-6 h-6 mb-2 text-accent" />
            <div className="font-medium">Email</div>
            <div className="text-sm text-muted-foreground">hello@astravantage.com</div>
          </div>
          <div className="flex flex-col items-center">
            <Linkedin className="w-6 h-6 mb-2 text-accent" />
            <div className="font-medium">LinkedIn</div>
            <div className="text-sm text-muted-foreground">@astravantage</div>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="w-6 h-6 mb-2 text-accent" />
            <div className="font-medium">Location</div>
            <div className="text-sm text-muted-foreground">San Francisco, CA</div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
