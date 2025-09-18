import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Pages
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import Home from "@/pages/home";
import About from "@/pages/about";
import Expertise from "@/pages/services"; // Reuse services page as expertise
import DigitalMarketing from "@/pages/digital-marketing";
import ManufacturingAnalytics from "@/pages/manufacturing-analytics";
import DigitalTransformation from "@/pages/digital-transformation";
import CustomerSuccess from "@/pages/customer-success";
import EdgyInsights from "@/pages/case-studies"; // Reuse case-studies as edgy-insights
import EdgyInsightDetail from "@/pages/case-study-detail";
import Leadership from "@/pages/leadership";
import Connect from "@/pages/contact"; // Reuse contact as connect
import CapabilityDetail from "@/pages/capability-detail";
import Innovations from "@/pages/innovations";
import Toolkit from "@/pages/toolkit";
import NotFound from "@/pages/not-found";

function Router() {
  useScrollToTop();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/expertise" component={Expertise} />
          
          {/* Capability detail routes - single dynamic page for all */}
          <Route path="/capability/:slug" component={CapabilityDetail} />
          
          <Route path="/edgy-insights" component={EdgyInsights} />
          <Route path="/edgy-insights/:slug" component={EdgyInsightDetail} />
          <Route path="/innovations" component={Innovations} />
          <Route path="/toolkit" component={Toolkit} />
          <Route path="/connect" component={Connect} />
          
          {/* Legacy redirects - keeping for backward compatibility */}
          <Route path="/services" component={Expertise} />
          <Route path="/service/digital-marketing" component={DigitalMarketing} />
          <Route path="/service/manufacturing-analytics" component={ManufacturingAnalytics} />
          <Route path="/service/digital-transformation" component={DigitalTransformation} />
          <Route path="/service/customer-success" component={CustomerSuccess} />
          <Route path="/case-studies" component={EdgyInsights} />
          <Route path="/case-studies/:slug" component={EdgyInsightDetail} />
          <Route path="/contact" component={Connect} />
          <Route path="/meet-varun" component={Leadership} />
          
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
