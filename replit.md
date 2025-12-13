# Smart Attendance System (نظام تسجيل الدوام الذكي)

## Overview

A bilingual (Arabic/English) employee attendance tracking web application designed with a desktop-like professional UI. The system allows employees to check in and check out with one-click actions, displaying real-time attendance logs with RTL (right-to-left) layout support for Arabic content.

The application tracks employee presence status, records timestamps for all check-in/check-out events, and provides a clean interface for managing workforce attendance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom teal/cyan primary color theme (#14b8a6)
- **Build Tool**: Vite with hot module replacement

The frontend follows a component-based architecture with:
- Page components in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`
- API utilities in `client/src/lib/`

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **HTTP Server**: Node.js native HTTP server
- **API Design**: RESTful JSON API endpoints under `/api/`
- **Development**: Vite middleware integration for HMR

Key API endpoints:
- `GET /api/employees` - Fetch all employees
- `POST /api/employees` - Create new employee
- `GET /api/attendance` - Fetch attendance records
- `POST /api/attendance/check-in` - Record check-in
- `POST /api/attendance/check-out` - Record check-out

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Validation**: Zod schemas generated via drizzle-zod
- **Current Storage**: In-memory storage implementation (MemStorage class)
- **Database Ready**: Schema defined for PostgreSQL migration via `drizzle-kit push`

### Schema Design
- **employees**: id, employeeNumber (unique), name, lastAction
- **attendanceRecords**: id, employeeId, employeeNumber, employeeName, actionType, timestamp
- **users**: id, username, password (for future authentication)

### Design System
- RTL layout support (`dir="rtl"` in HTML)
- Cairo + Inter fonts for Arabic/English typography
- Teal/cyan primary color with light/dark theme support
- Card-based employee display with status badges
- Font Awesome icons for actions

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)
- **Drizzle Kit**: Database migrations and schema pushing

### UI Libraries
- **Radix UI**: Accessible component primitives (dialog, dropdown, tabs, etc.)
- **shadcn/ui**: Pre-built component styling
- **Lucide React**: Icon library
- **Font Awesome**: Additional icons (CDN loaded)
- **Embla Carousel**: Carousel functionality

### Utilities
- **date-fns**: Date formatting with Arabic locale support
- **class-variance-authority**: Component variant management
- **clsx/tailwind-merge**: Conditional class handling
- **Zod**: Runtime type validation

### Development
- **Vite**: Build tooling with React plugin
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Production server bundling
- **Replit plugins**: Error overlay, cartographer, dev banner