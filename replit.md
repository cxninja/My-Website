# AstraVantage Consulting - Consultancy Website

## Overview

A modern consultancy website built for AstraVantage Consulting, offering services across Digital Marketing, Manufacturing Analytics, Digital Transformation, and Customer Success. The application features a clean, professional design with interactive elements, case study showcases, and a contact management system. Built with React and Express, it provides a complete full-stack solution for a consultancy business presence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Animations**: Framer Motion for smooth, performant animations
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation
- **SEO**: React Helmet Async for meta tag management

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints with structured error handling
- **Data Validation**: Zod schemas for type-safe data validation
- **Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Vite middleware integration for hot module replacement

### Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Type Safety**: Full TypeScript integration with Drizzle's type inference
- **Current Implementation**: In-memory storage for development with interface ready for database migration

### Authentication and Authorization
- **Current State**: Basic structure in place without active authentication
- **Prepared Infrastructure**: User schema and storage methods ready for implementation
- **Session Management**: Connect-pg-simple configured for PostgreSQL session storage

### Design System
- **Color Palette**: Monochrome design with crimson red accent (#E63946)
- **Typography**: Inter for UI text with display font options
- **Component Library**: Comprehensive shadcn/ui components with consistent styling
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: WCAG compliance considerations built into component structure

### Performance Optimizations
- **Code Splitting**: Vite's automatic code splitting and tree shaking
- **Animation Performance**: Framer Motion with GPU-accelerated transforms
- **Image Optimization**: Structured for next/image integration (placeholder ready)
- **Bundle Optimization**: ESBuild for production builds with external packages

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18 with React DOM, React Hook Form, React Helmet Async
- **Build Tools**: Vite with TypeScript, ESBuild for production builds
- **Development**: tsx for TypeScript execution, runtime error overlay for debugging

### UI and Styling Dependencies
- **Component Library**: Complete shadcn/ui suite with Radix UI primitives
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React for consistent iconography
- **Animation**: Framer Motion for smooth interactions
- **Utilities**: Class Variance Authority, clsx, and Tailwind Merge for styling utilities

### Backend Dependencies
- **Server**: Express.js with CORS and standard middleware
- **Database**: Drizzle ORM with PostgreSQL dialect, Neon Database serverless
- **Validation**: Zod for runtime type checking and schema validation
- **Session Management**: Express sessions with connect-pg-simple for PostgreSQL storage

### Data Management Dependencies
- **State Management**: TanStack React Query for server state caching and synchronization
- **Form Handling**: React Hook Form with Hookform Resolvers for Zod integration
- **Utilities**: Date-fns for date manipulation, nanoid for unique ID generation

### Development and Quality Dependencies
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint and Prettier integration ready
- **Testing Infrastructure**: Component structure prepared for testing implementation
- **Development Tools**: Replit-specific plugins for enhanced development experience