# Overview

This is a modern full-stack web application built as a professional consultancy website for Varun Goel's NovaTransform business. The application showcases expertise in digital marketing, manufacturing analytics, digital transformation, and customer success. It features a React TypeScript frontend with Tailwind CSS and shadcn/ui components, an Express.js backend, and PostgreSQL database with Drizzle ORM. The site includes dynamic pages for capabilities, case studies (called "edgy insights"), innovations, and a comprehensive toolkit section, along with a contact form and testimonials.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side uses React 18 with TypeScript, built with Vite for fast development and optimized builds. The UI framework is built on Tailwind CSS with shadcn/ui component library using Radix UI primitives. The application uses a modern design system with custom CSS variables for consistent theming and responsive design. Navigation is handled by Wouter for lightweight routing, and animations are powered by Framer Motion for smooth page transitions and interactions.

## Backend Architecture
The server is an Express.js application using TypeScript and ES modules. It follows a modular structure with separate route handlers, storage abstraction layer, and utility functions. The backend serves both API endpoints and static files, with development-specific Vite middleware for hot module replacement. The API includes endpoints for contact form submissions and an admin interface for viewing submissions.

## Data Storage Solutions
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. The database schema includes tables for users and contacts, with proper relationships and constraints. A memory storage implementation is provided as a fallback for development environments. Database migrations are managed through Drizzle Kit with configuration for Neon serverless PostgreSQL.

## Authentication and Authorization
The application uses session-based authentication with PostgreSQL session storage via connect-pg-simple. User management includes basic CRUD operations with password handling. The current implementation focuses on contact form functionality rather than full user authentication flows.

## Component Architecture
The frontend follows a component-driven architecture with reusable UI components from shadcn/ui. Custom components are organized by functionality (motion, form elements, layout components) with proper TypeScript interfaces. The application uses React Hook Form with Zod validation for form handling and TanStack Query for server state management.

## Content Management
The application uses a hybrid approach with JSON files for content like case studies, testimonials, and capabilities data, while dynamic data like contact submissions are stored in the database. This allows for easy content updates while maintaining database integrity for user-generated content.

# External Dependencies

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: React component library built on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility
- **Framer Motion**: Animation library for smooth interactions
- **Lucide React**: Icon library for consistent iconography

## Backend Services
- **PostgreSQL**: Primary database via DATABASE_URL environment variable
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **Session Storage**: PostgreSQL-based session management

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the entire application
- **ESLint/Prettier**: Code formatting and linting
- **Drizzle Kit**: Database migrations and schema management

## Form Handling and Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation for forms and API
- **@hookform/resolvers**: Integration between React Hook Form and Zod

## State Management
- **TanStack Query**: Server state management and caching
- **React Router**: Navigation via Wouter library

## Additional Integrations
- **React Helmet Async**: SEO and meta tag management
- **Date-fns**: Date manipulation utilities
- **React Icons**: Additional icon sets for brand logos
- **Sitemap Generation**: Automated sitemap creation for SEO