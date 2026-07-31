# OptiFi - AI-Powered Financial Planning Platform

A premium financial planning application that combines advanced AI recommendations with sophisticated financial algorithms to help users optimize their portfolios and achieve their financial goals.

## LINK - https://v0.app/chat/optifi-rO5HsmkOwGW

## Features

### Core Functionality
- **User Authentication**: Secure email/password-based authentication with Better Auth
- **Portfolio Management**: Track and manage diverse asset holdings (stocks, bonds, crypto, real estate, etc.)
- **Financial Goal Tracking**: Set and monitor progress toward multiple financial objectives
- **Real-Time What-If Simulator**: Explore portfolio scenarios with live projections and risk calculations
- **AI-Powered Insights**: Get personalized financial recommendations powered by Claude AI
- **Dashboard Overview**: Real-time portfolio metrics and key performance indicators

### Key Pages

1. **Landing Page** (`/`) - Professional marketing site with feature highlights
2. **Dashboard** (`/dashboard`) - Quick overview of portfolio and recent holdings
3. **Portfolio** (`/portfolio`) - Detailed portfolio management and asset tracking
4. **Goals** (`/goals`) - Financial goal creation and progress tracking
5. **What-If Simulator** (`/simulator`) - Real-time scenario analysis with 5-year projections
6. **Insights** (`/insights`) - AI-generated recommendations and portfolio analysis
7. **Auth Pages** (`/sign-in`, `/sign-up`) - User authentication

## Technology Stack

### Backend
- **Framework**: Next.js 16 with App Router
- **Database**: PostgreSQL via Neon
- **ORM**: Drizzle ORM (type-safe database queries)
- **Authentication**: Better Auth (session-based, email/password)
- **AI**: Vercel AI SDK with Claude (OpenAI GPT models)

### Frontend
- **UI Framework**: React 19 with Next.js Server Components
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **State Management**: React hooks with Server Actions

### Data Models

**Users**: Email/password authentication with user profiles
- Financial profile (age, income, risk tolerance, investment horizon)

**Assets**: Investment holdings with allocation tracking
- Stock, Bond, ETF, Crypto, Cash, Real Estate, Other

**Financial Goals**: Structured goal planning with progress tracking
- Retirement, Education, Home, Vacation, Emergency Fund, Other

**Scenarios**: What-if analysis storage and calculations
- Baseline vs adjusted allocations with risk/return projections

**Recommendations**: AI-generated and algorithm-based suggestions
- Portfolio optimization, rebalancing, goal progress, tax strategies

## Financial Algorithms

### Portfolio Metrics
- **Expected Return Calculation**: Weighted average of asset class returns (Stocks: 10%, Bonds: 4%, Cash: 2%)
- **Risk Assessment**: Standard deviation calculation with correlation factors
- **Sharpe Ratio**: Risk-adjusted return measurement
- **Diversification Score**: Based on number of holdings and asset class spread

### 5-Year Projection
- Calculates compound annual growth rate (CAGR)
- Projects portfolio value with inflation considerations
- Visualizes growth trajectory year-over-year

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- PostgreSQL database (via Neon)
- OpenAI API key for Claude models

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
# Create .env.local with:
# DATABASE_URL=your_neon_postgres_url
# BETTER_AUTH_SECRET=your_secret_key (generate with: openssl rand -base64 32)
# OPENAI_API_KEY=your_openai_key

# Run migrations
# Database schema is automatically created via Neon MCP

# Start development server
pnpm dev
```

### Environment Variables

```
DATABASE_URL=postgresql://...           # Neon PostgreSQL connection
BETTER_AUTH_SECRET=...                   # Random 32+ char secret for sessions
BETTER_AUTH_URL=http://localhost:3000    # Override in production
OPENAI_API_KEY=...                       # For Claude AI recommendations
```

## Project Structure

```
app/
├── page.tsx                 # Landing page
├── dashboard/               # Dashboard page
├── portfolio/               # Portfolio management
├── goals/                   # Financial goals
├── simulator/               # What-if scenarios
├── insights/                # AI recommendations
├── sign-in/sign-up/         # Authentication
├── api/
│   ├── auth/[...all]/       # Better Auth handler
│   └── insights/            # AI insights streaming API
└── actions/                 # Server Actions

components/
├── dashboard-client.tsx     # Dashboard UI
├── portfolio-management.tsx # Portfolio table
├── scenario-simulator.tsx   # Real-time what-if
├── insights-client.tsx      # Recommendations display
├── auth-form.tsx            # Auth form
└── ui/                      # shadcn components

lib/
├── auth.ts                  # Better Auth config
├── auth-client.ts           # Client-side auth
└── db/
    ├── index.ts             # Drizzle client
    └── schema.ts            # Database schema
```

## Deployment

### To Vercel

```bash
# Connect your GitHub repository
vercel link

# Deploy
vercel deploy

# Set production env vars in Vercel dashboard:
# - DATABASE_URL
# - BETTER_AUTH_SECRET  
# - OPENAI_API_KEY
```

### Key Considerations
- Ensure BETTER_AUTH_SECRET is set before deploying
- Database must be accessible from deployment environment
- AI API keys required for insights generation
- Consider rate limiting for AI API calls

## Security

- Passwords hashed with Better Auth's built-in bcrypt
- Server-side session management (no JWT tokens)
- Per-user data scoping on all queries (no RLS on Neon)
- Input validation and sanitization on forms
- Environment variables for sensitive credentials

## Performance

- Server-side rendering for SEO and initial load
- Real-time calculations in What-If simulator
- Optimized database queries with Drizzle
- Streaming AI recommendations for perceived speed
- Image optimization with Next.js Image component

## Future Enhancements

- Real-time market data integration (Yahoo Finance, Alpha Vantage)
- Portfolio benchmarking against market indices
- Tax-loss harvesting recommendations
- Mobile app with React Native
- Multi-currency support
- Integration with brokerage APIs
- Advanced charting with Recharts
- Collaborative portfolios for couples/families
- Email notifications for goal milestones

## License

MIT

## Support

For issues or feature requests, please open an issue in the repository.
