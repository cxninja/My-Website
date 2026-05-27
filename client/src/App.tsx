import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { MotionConfig } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useScrollToTop } from "./hooks/use-scroll-to-top";

// Home stays eager: it's the landing page and the LCP-critical entry point,
// so we don't want a lazy-chunk round trip before first paint.
import Home from "@/pages/home";

// Every other route is code-split into its own chunk via React.lazy, so the
// initial bundle no longer carries all 16 pages (and their unique deps like
// PortableText, charts, and per-page data) up front.
const About = lazy(() => import("@/pages/about"));
const Expertise = lazy(() => import("@/pages/services"));
const DigitalMarketing = lazy(() => import("@/pages/digital-marketing"));
const ManufacturingAnalytics = lazy(() => import("@/pages/manufacturing-analytics"));
const DigitalTransformation = lazy(() => import("@/pages/digital-transformation"));
const CustomerSuccess = lazy(() => import("@/pages/customer-success"));
const EdgyInsights = lazy(() => import("@/pages/case-studies"));
const EdgyInsightDetail = lazy(() => import("@/pages/case-study-detail"));
const Connect = lazy(() => import("@/pages/contact"));
const CapabilityDetail = lazy(() => import("@/pages/capability-detail"));
const Innovations = lazy(() => import("@/pages/innovations"));
const Toolkit = lazy(() => import("@/pages/toolkit"));
const Philosophy = lazy(() => import("@/pages/philosophy"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogPost = lazy(() => import("@/pages/blog-post"));
const BlogAuthor = lazy(() => import("@/pages/blog-author"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Minimal fallback while a route chunk loads. Reserves viewport height so the
// footer doesn't jump up during the brief fetch.
function RouteFallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center" aria-busy="true">
      <div
        className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

function Router() {
  useScrollToTop();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<RouteFallback />}>
        <Switch>
          <Route path="/" component={Home} />

          {/* About + Philosophy. Leadership is merged into /about; the old
              /leadership and /meet-varun URLs render About (canonical → /about). */}
          <Route path="/about" component={About} />
          <Route path="/philosophy" component={Philosophy} />
          <Route path="/leadership" component={About} />

          {/* Expertise (capabilities) */}
          <Route path="/expertise" component={Expertise} />
          <Route path="/expertise/:slug" component={CapabilityDetail} />

          {/* Case studies (renamed from edgy-insights) */}
          <Route path="/case-studies" component={EdgyInsights} />
          <Route path="/case-studies/:slug" component={EdgyInsightDetail} />

          {/* Resources cluster */}
          <Route path="/blog" component={Blog} />
          <Route path="/blog/author/:slug" component={BlogAuthor} />
          <Route path="/blog/:categorySlug/:slug" component={BlogPost} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/toolkit" component={Toolkit} />
          <Route path="/innovations" component={Innovations} />

          {/* Contact (renamed from connect) */}
          <Route path="/contact" component={Connect} />

          {/* Legacy URL fallbacks — SPA-side. Keep old paths working if anyone
              deep-links into the SPA; canonical tags point at the new URLs. */}
          <Route path="/practice" component={Expertise} />
          <Route path="/practice/:slug" component={CapabilityDetail} />
          <Route path="/capability/:slug" component={CapabilityDetail} />
          <Route path="/edgy-insights" component={EdgyInsights} />
          <Route path="/edgy-insights/:slug" component={EdgyInsightDetail} />
          <Route path="/connect" component={Connect} />
          <Route path="/services" component={Expertise} />
          <Route path="/service/digital-marketing" component={DigitalMarketing} />
          <Route path="/service/manufacturing-analytics" component={ManufacturingAnalytics} />
          <Route path="/service/digital-transformation" component={DigitalTransformation} />
          <Route path="/service/customer-success" component={CustomerSuccess} />
          <Route path="/meet-varun" component={About} />

          <Route component={NotFound} />
        </Switch>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        {/* reducedMotion="user" makes every framer-motion animation in the tree
            respect the user's OS-level "Reduce motion" preference automatically.
            One provider replaces having to guard each animation individually. */}
        <MotionConfig reducedMotion="user">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </MotionConfig>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
