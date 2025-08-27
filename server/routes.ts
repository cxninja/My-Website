import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { renderApp, getHTMLTemplate } from "./ssr";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Thank you for your message! We'll be in touch soon.",
        contact: {
          id: contact.id,
          name: contact.name,
          email: contact.email,
        }
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: "Please check your form data",
          errors: validationError.details,
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({
          success: false,
          message: "Something went wrong. Please try again later.",
        });
      }
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch contacts",
      });
    }
  });

  // SSR Routes - handle all non-API routes
  const ssrRoutes = ['/', '/services', '/case-studies', '/about', '/contact'];
  
  ssrRoutes.forEach(route => {
    app.get(route, (req: Request, res: Response) => {
      try {
        const { html } = renderApp(req.path);
        const fullHtml = getHTMLTemplate(html);
        res.setHeader('Content-Type', 'text/html');
        res.send(fullHtml);
      } catch (error) {
        console.error('SSR Error:', error);
        res.status(500).send('Internal Server Error');
      }
    });
  });

  // Handle dynamic case study routes
  app.get('/case-studies/:slug', (req: Request, res: Response) => {
    try {
      const { html } = renderApp(req.path);
      const fullHtml = getHTMLTemplate(html);
      res.setHeader('Content-Type', 'text/html');
      res.send(fullHtml);
    } catch (error) {
      console.error('SSR Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
