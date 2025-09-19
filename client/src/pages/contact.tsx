import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SEO } from "@/lib/seo";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";
import { Mail, Linkedin, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ContactFormData = {
  name: string;
  email: string;
  company?: string;
  mobile?: string;
  topic?: string;
  message: string;
};

const topicOptions = [
  { value: "customer-success", label: "Customer Success" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "digital-transformation", label: "Digital Transformation" },
  { value: "gtm-strategy", label: "GTM Strategy" },
  { value: "leadership-scaling", label: "Leadership Scaling" },
  { value: "cross-industry", label: "Cross-Industry Experience" },
  { value: "ai-innovation", label: "AI Innovation" },
  { value: "stakeholder-engagement", label: "Stakeholder Engagement" },
  { value: "other", label: "Other" },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      mobile: "",
      topic: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. We'll be in touch soon.",
      });
      // Invalidate contacts cache if needed
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error: any) => {
      const errorMessage = error.message || "Something went wrong. Please try again.";
      toast({
        title: "Failed to Send Message",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const handleTryAgain = () => {
    setIsSubmitted(false);
  };

  return (
    <>
      <SEO 
        title="Connect: Ignite Your NovaTransform | Varun Goel"
        description="Ready to unleash explosive business transformation? Connect with Varun Goel to explore the capability pillars and discover your edge potential."
      />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Connect: <span className="text-accent">Ignite Your Edge</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to unleash explosive business transformation? Let's explore which capability pillars 
              can drive your NovaTransform and discover the edge potential waiting to be unlocked.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pt-4 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeIn>
              <Card className="border border-border">
                <CardContent className="p-8">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="font-display font-bold text-2xl mb-6">Start Your NovaTransform</h2>
                        
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Name *</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="John Smith" 
                                        {...field} 
                                        data-testid="input-contact-name"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email *</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="email"
                                        placeholder="john@company.com" 
                                        {...field} 
                                        data-testid="input-contact-email"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Acme Corp" 
                                        {...field} 
                                        data-testid="input-contact-company"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="mobile"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Mobile</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="+1 (555) 123-4567" 
                                        {...field} 
                                        data-testid="input-contact-mobile"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={form.control}
                              name="topic"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Topic</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-contact-topic">
                                        <SelectValue placeholder="Select a topic" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {topicOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="message"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Message *</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="How can we help you?" 
                                      rows={4}
                                      {...field} 
                                      data-testid="textarea-contact-message"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button
                              type="submit"
                              disabled={contactMutation.isPending}
                              className="w-full magnetic-button bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3"
                              data-testid="button-submit-contact"
                            >
                              {contactMutation.isPending ? (
                                <span className="flex items-center gap-2">
                                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                  Sending...
                                </span>
                              ) : (
                                "Send Message"
                              )}
                            </Button>
                          </form>
                        </Form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="text-center py-8"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </motion.div>
                        
                        <h3 className="font-display font-bold text-2xl mb-4">Message Sent Successfully!</h3>
                        <p className="text-muted-foreground mb-6">
                          Thank you for reaching out. We'll review your message and get back to you within 24 hours.
                        </p>
                        
                        <Button
                          onClick={handleTryAgain}
                          variant="outline"
                          className="hover:bg-accent hover:text-accent-foreground"
                          data-testid="button-send-another-message"
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Contact Information */}
            <FadeIn delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-display font-bold text-2xl mb-6">Get in touch</h2>
                  <p className="text-muted-foreground mb-8">
                    Prefer to reach out directly? Choose your preferred method of communication.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Send us an email and we'll respond within 24 hours
                      </p>
                      <a 
                        href="mailto:hello@novatransform.com" 
                        className="text-accent hover:underline"
                        data-testid="link-contact-email"
                      >
                        hello@novatransform.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Linkedin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">LinkedIn</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Connect with us on LinkedIn for updates and insights
                      </p>
                      <a 
                        href="https://linkedin.com/company/novatransform" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                        data-testid="link-contact-linkedin"
                      >
                        @novatransform
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Based in Noida, India, serving clients globally
                      </p>
                      <span className="text-muted-foreground">Noida, India</span>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <Card className="border border-accent/20 bg-accent/5">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Response Time</h4>
                        <p className="text-sm text-muted-foreground">
                          We typically respond to all inquiries within 24 hours during business days. 
                          For urgent matters, please mention it in your message.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
