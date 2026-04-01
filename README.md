# CVConverterPro

CVConverterPro is a country-aware resume conversion web app designed to help users adapt their CV/resume for different international job markets.

The idea is simple: upload your CV, choose a target country, and get a version aligned with that country’s expected format.

## Supported Countries

- Canada
- Germany
- Australia
- USA
- UK
- France

## Current Status

The project is in active development.

### Implemented

- Next.js 14 (App Router) setup
- TypeScript + Tailwind CSS
- Landing page + shared layout (header/footer)
- /convert page (main product UI)
- Country selector
- File upload system (PDF, DOCX)
- Client-side validation
- Server-side validation
- Conversion API route
- Centralized country rules
- PDF text extraction (pdf-parse)
- DOCX text extraction (mammoth)
- Text normalization
- Extraction preview (UI + API)
- Initial CV section mapping architecture

### In Progress / Next Steps

- Improve CV section detection
- Build structured CV data model
- AI prompt construction
- AI-powered CV rewriting (country-specific)
- PDF export/download
- Email delivery (Resend)
- SEO pages for traffic acquisition
- AdSense integration
- Freemium usage limits

## How It Works (Planned Flow)

1. Upload CV (PDF or DOCX)
2. Select target country
3. Extract text from file
4. Structure CV into sections
5. Apply country-specific formatting rules
6. Generate optimized CV
7. Download or receive via email

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- pdf-parse (PDF extraction)
- mammoth (DOCX extraction)

## Local Development

Requirements:
- Node.js 18+
- npm

Run locally:

npm install
npm run dev

Open:
http://localhost:3000

Useful commands:

npm run lint
npm run typecheck
npm run build

## Environment Variables

Create a `.env.local` file based on `.env.example`:

GEMINI_API_KEY=
GROQ_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000

## File Upload Rules

- Accepted formats: PDF, DOCX
- Max size: 5MB

## Notes

- AI conversion is not integrated yet
- No database or authentication yet
- No payment system yet
- Current focus is building a solid backend pipeline before AI

## Vision

CVConverterPro aims to become a practical SaaS tool for international job seekers by combining:

- Country-specific CV formatting
- ATS optimization
- AI-assisted rewriting
- SEO-driven growth
- Freemium monetization

## License

Private / Proprietary project
