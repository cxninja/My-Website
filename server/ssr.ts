import React from "react";
import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import your components
import Home from "../client/src/pages/home";
import Services from "../client/src/pages/services";
import CaseStudies from "../client/src/pages/case-studies";
import CaseStudyDetail from "../client/src/pages/case-study-detail";
import About from "../client/src/pages/about";
import Contact from "../client/src/pages/contact";
import NotFound from "../client/src/pages/not-found";
import { Toaster } from "../client/src/components/ui/toaster";
import { TooltipProvider } from "../client/src/components/ui/tooltip";
import { SSRHeader } from "./ssr-header";
import { SSRFooter } from "./ssr-footer";

interface SSRAppProps {
  location: string;
}

function getPageComponent(location: string) {
  if (location === "/") return Home;
  if (location === "/services") return Services;
  if (location === "/case-studies") return CaseStudies;
  if (location.startsWith("/case-studies/")) return CaseStudyDetail;
  if (location === "/about") return About;
  if (location === "/contact") return Contact;
  return NotFound;
}

function SSRApp({ location }: SSRAppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
      },
    },
  });

  const helmetContext = {};
  const PageComponent = getPageComponent(location);

  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    React.createElement(
      TooltipProvider,
      null,
      React.createElement(
        "div",
        { className: "min-h-screen flex flex-col" },
        React.createElement(SSRHeader, { currentPath: location }),
        React.createElement(
          "main",
          { className: "flex-1" },
          React.createElement(PageComponent)
        ),
        React.createElement(SSRFooter)
      ),
// React.createElement(Toaster) // Disabled for SSR compatibility
    )
  );
}

export function renderApp(url: string): { html: string } {
  const app = React.createElement(SSRApp, { location: url });
  const html = renderToString(app);
  
  return { html };
}

export function getHTMLTemplate(html: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AstraVantage — Strategy. Systems. Scale.</title>
        <meta name="description" content="Strategic consulting firm specializing in digital transformation, manufacturing analytics, and customer success solutions." />
      </head>
      <body>
        <div id="root">${html}</div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
  `;
}