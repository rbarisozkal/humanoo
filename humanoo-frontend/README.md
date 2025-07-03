# Humanoo Frontend - Grocery Management System

This is a modern grocery management frontend built with Next.js 14, TypeScript, and React Query, following clean architecture principles and best practices.

## 🚀 Technologies Used

### Core Framework & Language

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library with modern hooks

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icons

### State Management & Data Fetching

- **TanStack React Query (v5)** - Server state management
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Development & Testing

- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities
- **ESLint** - Code linting
- **TypeScript** - Static type checking

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── custom/            # Custom shared components
│   │   ├── EmptyState.tsx
│   │   └── LoadingSpinner.tsx
│   └── ui/                # Shadcn/ui components
├── features/
│   └── grocery/           # Grocery feature module
│       ├── api/           # API layer
│       ├── components/    # Feature components
│       ├── constants/     # Constants & enums
│       ├── hooks/         # React Query hooks
│       └── types/         # TypeScript interfaces
├── lib/
│   ├── providers.tsx      # React Query provider
│   └── utils.ts           # Utility functions
└── store/                 # Global state (removed later)
```

## 🎯 Features Implemented

### Core Functionality

- ✅ **CRUD Operations** - Create, Read, Update, Delete groceries
- ✅ **Advanced Filtering** - Filter by category, price range, quantity
- ✅ **Real-time Search** - Search groceries by name/description
- ✅ **Low Stock Alerts** - Visual indicators for items running low
- ✅ **Responsive Design** - Mobile-first approach with Tailwind

### UI Components

- ✅ **GroceryManager** - Main container component
- ✅ **GroceryList** - Grid display of grocery items
- ✅ **GroceryCard** - Individual item display
- ✅ **GroceryForm** - Create/edit form with validation
- ✅ **GroceryFilterPopover** - Advanced filtering interface
- ✅ **GrocerySearchFilter** - Search and basic filters
- ✅ **Dialog Components** - Modal forms for CRUD operations

### Data Management

- ✅ **React Query Integration** - Caching, background updates, optimistic updates
- ✅ **Error Handling** - Toast notifications for success/error states
- ✅ **Loading States** - Skeleton loading and spinners
- ✅ **Cache Management** - Intelligent query invalidation

## 🎨 Design Principles

### Architecture

- **Feature-based structure** - Organized by business domains
- **Separation of concerns** - API, UI, and business logic separated
- **Composition over inheritance** - Reusable component patterns
- **Type safety** - Comprehensive TypeScript coverage

### UI/UX

- **Mobile-first responsive design**
- **Consistent spacing and typography**
- **Accessible components** - ARIA labels and keyboard navigation
- **Modern design system** - Using Shadcn/ui components
- **Intuitive user flows** - Clear actions and feedback

## 🔧 Development Struggles & Solutions

### 1. **API Filter Caching Issues**

**Problem**: React Query not triggering new requests when filters changed.
**Solution**: Updated query keys to include filter parameters: `[cacheKey, filters]`
**Lesson**: Query keys must include all variables that affect the query result.

### 2. **Form Input Edge Cases**

**Problem**: Price input field not accepting `0` values, sending `undefined` to API.
**Solution**: Changed validation logic from `value || undefined` to `value === "" ? undefined : parseFloat(value)`
**Lesson**: Be explicit about falsy value handling in form inputs.

### 3. **TypeScript Configuration Challenges**

**Problem**: Jest configuration conflicts between ES modules and CommonJS.
**Solution**: Used CommonJS format for Jest config while keeping ES modules for source code.
**Lesson**: Configuration files often need different module systems than application code.

### 4. **State Management Simplification**

**Problem**: User feedback indicated over-engineering with global state for simple UI states.
**Solution**: Completely removed Zustand store, moved to local `useState` for filters and search.
**Lesson**: Global state should only be used when truly needed across multiple components.

## 🧪 Testing Strategy

### What's Tested

- **API Layer** - HTTP requests, data transformation, error handling
- **Utility Functions** - Pure functions and helpers
- **Constants** - Configuration and enum values

### Testing Approach

- **Simple & Focused** - Avoid over-engineering test complexity
- **Mock External Dependencies** - Axios mocked for API tests
- **Data Validation** - Ensure correct request/response formats
- **Error Scenarios** - Basic error handling coverage

### Test Coverage

- 6 API tests covering all CRUD operations
- Utility function tests for shared helpers
- Constants validation tests

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Environment Setup

The frontend connects to the Spring Boot backend running on `http://localhost:8080`.
