import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import {
  generateSitemapIndex,
  generatePagesSitemap,
  generateCaseStudiesSitemap,
  generateBlogSitemap,
} from "./sitemap";

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

  const sendXml = (res: Parameters<Parameters<typeof app.get>[1]>[1], xml: string) => {
    res.header("Content-Type", "application/xml; charset=utf-8");
    res.send(xml);
  };

  app.get("/sitemap.xml", async (req, res) => {
    try {
      const hostname = req.protocol + "://" + req.get("host");
      sendXml(res, await generateSitemapIndex(hostname));
    } catch (error) {
      console.error("Error generating sitemap index:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  app.get("/sitemap-pages.xml", async (req, res) => {
    try {
      const hostname = req.protocol + "://" + req.get("host");
      sendXml(res, await generatePagesSitemap(hostname));
    } catch (error) {
      console.error("Error generating pages sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  app.get("/sitemap-case-studies.xml", async (req, res) => {
    try {
      const hostname = req.protocol + "://" + req.get("host");
      sendXml(res, await generateCaseStudiesSitemap(hostname));
    } catch (error) {
      console.error("Error generating case studies sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  app.get("/sitemap-blog.xml", async (req, res) => {
    try {
      const hostname = req.protocol + "://" + req.get("host");
      sendXml(res, await generateBlogSitemap(hostname));
    } catch (error) {
      console.error("Error generating blog sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
