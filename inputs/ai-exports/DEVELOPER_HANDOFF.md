# Plink Merchant App - Developer Handoff Guide

## 🎯 Quick Start for Database Integration

This guide helps developers quickly identify and replace all mock data with real database calls.

## 📋 Integration Checklist

### 1. LOCATION DATA (HIGH PRIORITY)
**File:** `/utils/location.ts`
**Current:** Hardcoded "Altamonte Springs"
**Action:** Replace with API call to get merchant's actual location

```typescript
// BEFORE (current mock):
export const locationData = {
  neighborhood: "Altamonte Springs", // 🔄 REPLACE
  city: "Altamonte Springs",         // 🔄 REPLACE
  state: "FL"                        // 🔄 REPLACE
};

// AFTER (with API):
export const getLocationData = async (merchantId: string) => {
  const response = await fetch(`/api/merchant/${merchantId}/location`);
  return response.json();
};
```

### 2. AREA REACH DATA
**File:** `/components/AreaAudienceScreen.tsx`
**API Endpoint:** `GET /api/analytics/area-reach?merchant_id={id}&period=30d`

**Mock Data to Replace:**
- `verified_shoppers_30d: "46,798"` → Database query for unique shoppers in area
- `verified_views_30d: "287,425"` → Database query for total impressions
- `local_spend_percentage: 38` → Calculated from spend analytics

### 3. NEIGHBORHOOD REACH DATA  
**File:** `/components/YourZoneScreen.tsx`
**API Endpoint:** `GET /api/analytics/neighborhood-reach?merchant_id={id}&period=30d`

**Mock Data to Replace:**
- `total_local_spend_30d: "$2,847,320"` → SUM of transactions in merchant's zone
- `avg_txn_per_shopper_30d: "4.2"` → Calculated average from analytics
- `txn_uplift_vs_nonpriority_30d: "23"` → Comparison metric vs non-priority audience

### 4. CURRENT SHOPPERS DATA
**File:** `/components/YourShoppersScreen.tsx`  
**API Endpoint:** `GET /api/analytics/current-shoppers?merchant_id={id}&period=30d`

**Mock Data to Replace:**
- `uniqueCount: 21` → COUNT of unique current customers
- `segmentSpend: 880` → SUM of spend by current shoppers
- Campaign metrics (recognizeRegulars, boostAvgSpend, etc.) → From campaigns table

### 5. BILLING DATA
**File:** `/components/BillingScreen.tsx`
**API Endpoint:** `GET /api/billing/current-month?merchant_id={id}`

**Mock Data to Replace:**
- `lastMonthTotal: 117.50` → From monthly_billing table
- `programSales: 1350.00` → SUM of attributed sales from program
- `tierBreakdown` → Generated from billing calculation logic

## 🔍 Finding Mock Data

### Search Keywords
- Search for `🔄 REPLACE:` comments to find all hardcoded values
- Look for variables ending in `Data` (e.g., `audienceData`, `zoneData`, `shoppersData`)
- Check `/utils/dataMapping.ts` for comprehensive data field documentation

### Data-ID Attributes
All components have `data-id` attributes for tracking:
```typescript
<StatCard 
  dataId="area.audience.unique_shoppers_30d"  // Maps to database field
  // ... other props
/>
```

## 🗄️ Required Database Tables

### Core Tables
```sql
-- Merchant information
merchants (id, name, location, service_area, created_at)

-- Analytics data  
analytics.area_reach (merchant_id, date, shoppers_count, impressions_count)
analytics.zone_performance (merchant_id, date, local_spend, avg_transactions)
analytics.shopper_behavior (merchant_id, date, frequency, spend_per_shopper)

-- Billing information
billing.monthly_fees (merchant_id, month, total_fee, program_sales)
billing.tier_calculations (merchant_id, month, tier_level, applied_amount, rate, fee)

-- Campaign performance
campaigns.performance (merchant_id, campaign_type, interactions_count, period)

-- Transaction data
transactions (id, merchant_id, customer_id, amount, date, customer_segment)
```

## 🔌 API Endpoints to Implement

1. **GET** `/api/merchant/{id}/location` - Get merchant location
2. **GET** `/api/analytics/area-reach` - Area-level metrics  
3. **GET** `/api/analytics/neighborhood-reach` - Neighborhood-level metrics
4. **GET** `/api/analytics/current-shoppers` - Customer behavior data
5. **GET** `/api/billing/current-month` - Billing and fees data

## 🚀 Implementation Priority

### Phase 1 (Critical)
1. Location data (`/utils/location.ts`)
2. Basic area reach metrics (AreaAudienceScreen)
3. Basic neighborhood metrics (YourZoneScreen)

### Phase 2 (Important)  
4. Current shoppers data (YourShoppersScreen)
5. Billing data (BillingScreen)

### Phase 3 (Enhancement)
6. Real-time data updates
7. Error handling and loading states
8. Data caching strategies

## 📊 Component Data Mapping

| Component | Data File | API Endpoint | Priority |
|-----------|-----------|--------------|----------|
| ScreenHeader | `locationData` | `/api/merchant/location` | HIGH |
| AreaAudienceScreen | `audienceData` | `/api/analytics/area-reach` | HIGH |
| YourZoneScreen | `zoneData` | `/api/analytics/neighborhood-reach` | HIGH |
| YourShoppersScreen | `shoppersData` | `/api/analytics/current-shoppers` | MEDIUM |
| BillingScreen | `billingData` | `/api/billing/current-month` | MEDIUM |

## 🔧 Code Example: Converting Mock to API

**Before (Mock Data):**
```typescript
const audienceData = {
  verified_shoppers_30d: "46,798",  // Hardcoded
  verified_views_30d: "287,425"     // Hardcoded
};
```

**After (API Integration):**
```typescript
const [audienceData, setAudienceData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchAudienceData = async () => {
    try {
      const response = await fetch(`/api/analytics/area-reach?merchant_id=${merchantId}&period=30d`);
      const data = await response.json();
      setAudienceData(data);
    } catch (error) {
      console.error('Failed to fetch audience data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  fetchAudienceData();
}, [merchantId]);
```

## 📝 Notes for Developers

1. **Data Privacy:** All customer names are anonymized (e.g., "A. Martinez")
2. **Responsive Design:** App works on mobile (390-430px) through desktop (1000px+)
3. **Theme Support:** Dark mode is fully implemented via ThemeProvider
4. **Component System:** Reusable components in `/components/common/`
5. **Type Safety:** All data structures have TypeScript interfaces in `/utils/dataMapping.ts`

## 🎨 Design System Compliance

- Colors: Primary #334bc1, Accent #30CCD5
- Typography: Montserrat (headings), Open Sans (body)
- Components follow Plink Guidelines in `/guidelines/Guidelines.md`
- All components use Tailwind v4 with custom CSS properties

## 🧪 Testing Data Endpoints

Use these sample merchant IDs for testing:
- Test Merchant: `merchant_123`
- Demo Merchant: `merchant_demo`

Each endpoint should return data in the format defined in `/utils/dataMapping.ts`.