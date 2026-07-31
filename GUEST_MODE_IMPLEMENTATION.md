# OptiFi Guest Mode Implementation

## Overview

OptiFi now supports a fully functional **Guest Mode** that allows users to explore the entire application without authentication. Guest Mode provides a frictionless experience with realistic demo data while protecting personalized features behind authentication.

## Key Features Implemented

### 1. **Guest Context System** (`lib/guest-context.tsx`)
- Global React Context for managing guest mode state
- Realistic demo data with 5 sample assets, 3 goals, and user profile
- Seamless switching between guest and authenticated modes
- Demo portfolio value: $185,359

**Demo Data Included:**
- **Assets**: VOO ETF, BND Bonds, AAPL Stock, Bitcoin, Savings Account
- **Goals**: Retirement ($1M target), Home Down Payment ($150K), Emergency Fund ($35K)
- **Profile**: 35-year-old, $95K income, moderate risk tolerance, 25-year horizon

### 2. **Guest Banner** (`components/guest-banner.tsx`)
- Subtle, dismissible banner indicating guest mode
- Clear call-to-action to sign in
- Non-intrusive amber color scheme
- Shows at top of all protected pages when in guest mode

### 3. **Authentication Upgrade Modal** (`components/auth-upgrade-modal.tsx`)
- Context-aware modals for different protected features
- Triggers when users attempt to:
  - Save portfolio changes
  - Save/sync goals
  - Export reports
  - Access profile settings
  - View personal history
- Shows OptiFi Plus benefits
- Easy navigation to sign-in or sign-up flows

### 4. **Authorization Hook** (`lib/use-auth.ts`)
- Combined hook checking both authentication status and guest mode
- Returns `isInDemoMode` for easy conditional rendering
- Handles loading states gracefully

### 5. **Updated Landing Page** (`app/page.tsx`)
- Added "Continue as Guest" button in header
- Changed "Watch Demo" to "Try Demo" (links to guest mode)
- Three authentication options clearly visible:
  - Continue as Guest
  - Sign In
  - Get Started

## Guest Mode Pages

All pages support full guest mode functionality with query parameter `?guest=true`:

### ✓ Dashboard (`/dashboard?guest=true`)
- Portfolio overview with demo data
- Key metrics (Portfolio Value, Total Assets, Active Goals, Risk Score)
- Portfolio allocation chart
- Recent holdings display
- Financial goals progress tracking
- Quick actions with auth upgrade modal for saves

### ✓ Portfolio (`/portfolio?guest=true`)
- Full portfolio management interface
- Asset listing with values and allocations
- Summary statistics
- Demo mode indication in description

### ✓ Goals (`/goals?guest=true`)
- Financial goals tracking
- Progress indicators for each goal
- Combined targets and savings
- Overall progress percentage
- Manage button protected with auth modal

### ✓ What-If Simulator (`/simulator?guest=true`)
- Real-time portfolio scenario analysis
- Interactive allocation sliders (Stocks, Bonds, Cash)
- Live return and risk calculations
- Current vs. adjusted allocation comparison
- All calculations fully functional in guest mode
- Demo mode label in description

### ✓ Insights (`/insights?guest=true`)
- AI Portfolio Summary (generates recommendations on load)
- Personalized recommendations based on demo portfolio
- Portfolio health indicators
- Diversification score
- Goal progress visualization
- Recommendations triggered by demo data analysis

## Guest Mode Logic

### Activation
```
URL parameter: ?guest=true
Client-side state management via React Context
Session-independent - no backend required for guest mode
```

### Features Accessible in Guest Mode
- ✅ View portfolio and holdings
- ✅ View financial goals
- ✅ Interactive what-if scenarios
- ✅ AI insights and recommendations
- ✅ Portfolio analysis and metrics
- ✅ Asset allocation visualization
- ✅ Goal progress tracking

### Features Requiring Authentication
- ❌ Save portfolio changes
- ❌ Save goals or recommendations
- ❌ Sync data across devices
- ❌ Access personal financial history
- ❌ Export reports
- ❌ Permanent profile customization

## Technical Architecture

### Component Updates

1. **All Page Components** - Converted from server components to client components
   - Use `useSearchParams()` to detect `?guest=true`
   - Use `useGuest()` hook for demo data
   - Use `useAuth()` hook for authentication state
   - Conditional rendering based on guest status

2. **Dashboard Client** (`components/dashboard-client.tsx`)
   - Added `isGuest` prop
   - Integrated `AuthUpgradeModal` for save actions
   - Button labels update in guest mode ("Add Asset (Demo)")

3. **Insights Client** (`components/insights-client.tsx`)
   - Added `isGuest` prop
   - Auth upgrade modal for marking recommendations as read
   - Full recommendation generation works in guest mode

4. **All Navigation** - Updated links to preserve guest mode
   - Links include `?guest=true` when in guest mode
   - Seamless navigation between guest mode pages

### Guest Context Data Structure
```typescript
interface GuestData {
  profile: GuestProfile
  assets: GuestAsset[]
  goals: GuestGoal[]
}
```

## User Experience Flow

### New User Discovery
1. Lands on OptiFi homepage
2. Clicks "Continue as Guest" or "Try Demo"
3. Immediately sees dashboard with realistic demo data
4. Can explore all features without friction
5. When attempting to save, friendly auth upgrade modal appears
6. Easy conversion path to authenticated user

### Authenticated User
- All guest mode features work with real data
- No "guest mode" indicators shown
- Full save and sync capabilities
- Personal financial data

## Benefits

### For New Users
- **Frictionless Exploration**: Experience app immediately
- **Realistic Demo**: See actual functionality, not just screenshots
- **Build Confidence**: Understand value before committing
- **Low Friction Conversion**: Clear path to sign up

### For Product
- **Increased Conversion**: More qualified signups from demo exploration
- **Reduced Support Burden**: Self-guided product exploration
- **Differentiation**: Full interactive demo vs. static competitors
- **Analytics**: Track demo user behavior to optimize UX

### For Security
- **No Data Risk**: Demo data is separate from real user data
- **Session Independent**: No authentication cookies in guest mode
- **Client-Side State**: Guest data lives only in React Context
- **Protected APIs**: All write operations require authentication

## Testing

All pages have been tested in guest mode:
- ✅ Landing page with guest CTA
- ✅ Dashboard with demo data loading
- ✅ Portfolio page displaying sample assets
- ✅ Goals page showing sample goals
- ✅ What-If simulator with interactive calculations
- ✅ Insights page with recommendation generation
- ✅ Auth upgrade modal on protected actions
- ✅ Guest banner display and dismissal
- ✅ Navigation between guest mode pages

## Future Enhancements

1. **Demo Mode Analytics**
   - Track which features demo users interact with most
   - Measure demo-to-signup conversion rate
   - Identify friction points in onboarding

2. **Personalization in Demo**
   - Allow users to modify demo data
   - Show how changes affect recommendations
   - Demonstrate power of customization

3. **Feature Showcase Flows**
   - Interactive tutorial highlighting key features
   - Guided walkthroughs for power users
   - Feature discovery callouts

4. **Upgrade Incentives**
   - Time-based prompts after exploring
   - "See how this works with YOUR data" CTAs
   - Limited demo data hints at full potential

## Files Created/Modified

### New Files
- `lib/guest-context.tsx` - Guest mode provider and context
- `lib/use-auth.ts` - Auth + guest combined hook
- `components/guest-banner.tsx` - Guest mode indicator banner
- `components/auth-upgrade-modal.tsx` - Feature upgrade modal
- `GUEST_MODE_IMPLEMENTATION.md` - This file

### Modified Files
- `app/layout.tsx` - Added GuestProvider wrapper
- `app/page.tsx` - Added "Continue as Guest" button
- `app/dashboard/page.tsx` - Converted to client component with guest support
- `app/portfolio/page.tsx` - Converted to client component with guest support
- `app/goals/page.tsx` - Converted to client component with guest support
- `app/simulator/page.tsx` - Converted to client component with guest support
- `app/insights/page.tsx` - Converted to client component with guest support
- `components/dashboard-client.tsx` - Added guest prop and auth modal
- `components/insights-client.tsx` - Added guest prop and auth modal

## Accessing Guest Mode

1. **Via Landing Page**: Click "Continue as Guest" in header
2. **Direct URL**: Navigate to `/dashboard?guest=true` (or any page with `?guest=true`)
3. **Demo Button**: "Try Demo" button on landing page

## Conclusion

OptiFi now provides a complete, interactive demo experience that lets potential users explore the full power of AI-powered financial planning without barriers. This significantly reduces friction in the user acquisition funnel while maintaining security and data protection for authenticated users.
