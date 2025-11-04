# Nomad Express Group - Website Structure

## Project Overview
A comprehensive Next.js 15 website for a U.S. trucking company with modern architecture, proper routing, and professional design patterns.

## Architecture

### Folder Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About Us page
│   ├── services/          # Services listing and detail pages
│   │   └── [slug]/       # Dynamic service detail pages
│   ├── fleet/            # Fleet showcase page
│   ├── coverage/         # Coverage map and routes
│   ├── careers/          # Careers/recruitment page
│   ├── apply/            # Driver application form
│   ├── gallery/          # Photo gallery with filters
│   ├── faq/              # Frequently asked questions
│   ├── contact/          # Contact page with form
│   ├── quote/            # Quote request page
│   ├── privacy-policy/   # Privacy policy
│   ├── terms/            # Terms and conditions
│   └── api/              # API routes
│       ├── quote/        # Quote form submission
│       ├── contact/      # Contact form submission
│       └── apply/         # Driver application submission
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── Navbar.jsx    # Navigation with Next.js routing
│   │   ├── Footer.jsx    # Footer with proper links
│   │   ├── Button.jsx    # Reusable button component
│   │   ├── Card.jsx      # Card container component
│   │   ├── Section.jsx   # Section wrapper component
│   │   ├── Container.jsx # Container component
│   │   ├── PageHeader.jsx # Page header component
│   │   └── Counter.jsx   # Animated counter component
│   └── sections/         # Page sections
│       ├── HeroSection.jsx
│       ├── StatsSection.jsx
│       ├── ServicesSection.jsx
│       ├── TeamSection.jsx
│       ├── DriverSection.jsx
│       ├── QuoteFormSection.jsx
│       └── ContactSection.jsx
├── utils/
│   └── constants.js      # Centralized constants and configuration
└── data/                  # Data files
    ├── servicesData.js
    ├── statsData.js
    └── teamData.js
```

## Pages Implemented

### 1. Home Page (/)
- Hero section with CTAs
- Stats section
- Services preview
- Team section
- Driver recruitment section
- Quote form section
- Contact section

### 2. About Us (/about)
- Company story
- Core values
- Timeline/milestones
- CTAs

### 3. Services (/services)
- Service listing page
- Individual service detail pages:
  - Full Truckload (FTL)
  - Less Than Truckload (LTL)
  - Expedited Services
  - Refrigerated Transport
  - Flatbed & Step Deck
  - Warehousing & Distribution

### 4. Fleet (/fleet)
- Equipment showcase
- Fleet types with specifications
- Technology & safety features

### 5. Coverage (/coverage)
- Nationwide coverage display
- Regional hubs
- Major shipping lanes

### 6. Careers (/careers)
- Benefits and perks
- Requirements
- Driver testimonials
- Application CTA

### 7. Apply (/apply)
- Driver application form
- CDL and experience fields
- Endorsements selection

### 8. Gallery (/gallery)
- Photo grid with categories
- Filter functionality
- Responsive image display

### 9. FAQ (/faq)
- Categorized questions
- Expandable answers
- Multiple categories:
  - Shipping & Services
  - Payment & Billing
  - Safety & Insurance
  - Driver Requirements

### 10. Contact (/contact)
- Contact information
- Contact form
- Office hours
- Map placeholder

### 11. Quote (/quote)
- Comprehensive quote form
- Freight details
- Pickup/delivery locations
- Special requirements

### 12. Legal Pages
- Privacy Policy (/privacy-policy)
- Terms and Conditions (/terms)

## Features

### Design Patterns
- **Component-based architecture**: Reusable UI components
- **Centralized constants**: All routes and company info in one place
- **Proper routing**: Next.js App Router with proper navigation
- **SEO optimization**: Metadata for all pages
- **Responsive design**: Mobile-first approach
- **Accessibility**: Semantic HTML and proper ARIA labels

### Technical Features
- Next.js 15 with App Router
- Server and Client Components separation
- API routes for form submissions
- Motion animations (Framer Motion)
- Tailwind CSS for styling
- TypeScript-ready structure

### Navigation
- Updated Navbar with Next.js Link components
- Active route highlighting
- Mobile-responsive menu
- Footer with proper links

### Forms
- Quote form with API integration
- Contact form with API integration
- Driver application form with API integration
- Form validation
- Success/error handling

## API Routes

All API routes are set up in `/app/api/`:
- `/api/quote` - Handles quote requests
- `/api/contact` - Handles contact form submissions
- `/api/apply` - Handles driver applications

**Note**: Currently, API routes log the data. You'll need to implement:
- Email sending (nodemailer)
- Database storage
- Form validation
- Rate limiting

## Next Steps

1. **Email Integration**: Set up nodemailer or similar service
2. **Database**: Store form submissions in database
3. **Map Integration**: Add Google Maps or Mapbox to contact/coverage pages
4. **Analytics**: Add Google Analytics or similar
5. **Content Management**: Consider CMS for easy content updates
6. **Testing**: Add unit and integration tests
7. **Performance**: Optimize images and implement lazy loading
8. **Security**: Add CSRF protection, rate limiting, input sanitization

## Constants Management

All routes, company info, and navigation items are centralized in `/src/utils/constants.js` for easy updates.

## Styling

- Uses Tailwind CSS v4
- Custom color scheme with red accent (#c3002e)
- Dark theme throughout
- Responsive breakpoints
- Custom animations

