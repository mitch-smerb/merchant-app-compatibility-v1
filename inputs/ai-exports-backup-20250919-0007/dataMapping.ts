/**
 * PLINK DATA MAPPING FOR DATABASE INTEGRATION
 * 
 * This file documents all data fields that need to be replaced with actual API calls.
 * Developers should replace these mock values with real database queries or API endpoints.
 * 
 * Last Updated: Production Handoff
 */

// =============================================================================
// LOCATION/CONTEXT DATA
// =============================================================================

/**
 * PRIMARY LOCATION DATA - Replace with user's actual location
 * API Endpoint: GET /api/merchant/location
 * Database Tables: merchants.location, merchants.service_area
 */
export interface LocationData {
  neighborhood: string;        // e.g., "Altamonte Springs" - from user profile or geolocation
  city: string;               // e.g., "Altamonte Springs"
  state: string;              // e.g., "FL"
  zipCode?: string;           // Optional - for more precise targeting
}

export const locationData: LocationData = {
  neighborhood: "Altamonte Springs", // 🔄 REPLACE: API call to get merchant location
  city: "Altamonte Springs",         // 🔄 REPLACE: API call to get merchant location  
  state: "FL"                        // 🔄 REPLACE: API call to get merchant location
};

// =============================================================================
// AREA REACH SCREEN DATA (AreaAudienceScreen.tsx)
// =============================================================================

/**
 * AREA AUDIENCE DATA - Broad geographic reach metrics
 * API Endpoint: GET /api/analytics/area-reach?period=30d&location={merchantLocation}
 * Database Tables: analytics.area_reach, analytics.impressions, analytics.local_spend
 */
export interface AreaAudienceData {
  verified_shoppers_30d: string;     // Total unique verified shoppers in area (30 days)
  verified_views_30d: string;        // Total ad impressions in area (30 days)
  local_spend_percentage: number;    // % of spending that happens locally vs nationally
  all_other_spend_percentage: number; // % of spending outside local area
}

export const audienceData: AreaAudienceData = {
  verified_shoppers_30d: "46,798",   // 🔄 REPLACE: SELECT COUNT(DISTINCT shopper_id) FROM area_analytics WHERE date >= NOW() - 30 days
  verified_views_30d: "287,425",     // 🔄 REPLACE: SELECT SUM(impressions) FROM area_analytics WHERE date >= NOW() - 30 days
  local_spend_percentage: 38,        // 🔄 REPLACE: Calculated field from local vs total spend analytics
  all_other_spend_percentage: 62     // 🔄 REPLACE: 100 - local_spend_percentage
};

// =============================================================================
// NEIGHBORHOOD REACH SCREEN DATA (YourZoneScreen.tsx)  
// =============================================================================

/**
 * ZONE DATA - Focused neighborhood-level metrics
 * API Endpoint: GET /api/analytics/neighborhood-reach?merchant_id={merchantId}&period=30d
 * Database Tables: analytics.zone_performance, analytics.shopper_behavior
 */
export interface ZoneData {
  total_local_spend_30d: string;           // Total spending by priority shoppers in merchant's zone
  neighborhood: string;                    // Should match locationData.neighborhood
  priority_status: string;                 // Status of priority targeting ("Active", "Paused", etc.)
  avg_txn_per_shopper_30d: string;        // Average transactions per shopper
  avg_spend_per_shopper_30d: string;      // Average spend per shopper
  txn_uplift_vs_nonpriority_30d: string;  // % uplift vs non-priority audience
}

export const zoneData: ZoneData = {
  total_local_spend_30d: "$2,847,320",    // 🔄 REPLACE: SELECT SUM(amount) FROM transactions WHERE zone_id = {merchantZone} AND date >= NOW() - 30 days
  neighborhood: "Altamonte Springs",      // 🔄 REPLACE: Use locationData.neighborhood
  priority_status: "Active",              // 🔄 REPLACE: SELECT status FROM merchant_campaigns WHERE merchant_id = {merchantId}
  avg_txn_per_shopper_30d: "4.2",        // 🔄 REPLACE: Calculated average from shopper_analytics table
  avg_spend_per_shopper_30d: "$127",     // 🔄 REPLACE: Calculated average from shopper_analytics table
  txn_uplift_vs_nonpriority_30d: "23"    // 🔄 REPLACE: Calculated comparison metric from analytics tables
};

// =============================================================================
// CURRENT SHOPPERS SCREEN DATA (YourShoppersScreen.tsx)
// =============================================================================

/**
 * SHOPPERS DATA - Current customer behavior and campaign metrics
 * API Endpoint: GET /api/analytics/current-shoppers?merchant_id={merchantId}&period=30d
 * Database Tables: shoppers.current_customers, campaigns.performance, shopper_behavior.metrics
 */
export interface ShoppersData {
  uniqueCount: number;                    // Number of unique current shoppers
  segmentSpend: number;                   // Total spend by current shoppers segment
  segmentTransactions: number;            // Total transactions by current shoppers
  avgCLV: number;                        // Average Customer Lifetime Value
  topCustomer: {
    name: string;                        // Top customer identifier (anonymized)
    spendLast30d: number;               // Top customer's 30-day spend
  };
  campaigns: {
    recognizeRegulars: number;          // Count of "Recognize Regulars" campaign interactions
    boostAvgSpend: number;             // Count of "Boost Average Spend" campaign interactions
    boostFrequency: number;            // Count of "Boost Frequency" campaign interactions
    recoverLapsed: number;             // Count of "Recover Lapsed" campaign interactions
  };
  behavior: {
    avgFrequency: number;              // Average visit frequency
    avgSpendPerShopper: number;        // Average spend per shopper
    avgTransactionsPerShopper: number; // Average transactions per shopper
    avgTransactionSize: number;        // Average transaction amount
    deltas: {                          // Percentage changes vs previous period
      frequency: number;
      spendPerShopper: number;
      transactions: number;
      transactionSize: number;
    };
  };
}

export const shoppersData: ShoppersData = {
  uniqueCount: 21,                       // 🔄 REPLACE: SELECT COUNT(DISTINCT customer_id) FROM current_shoppers WHERE merchant_id = {merchantId}
  segmentSpend: 880,                     // 🔄 REPLACE: SELECT SUM(amount) FROM transactions WHERE customer_segment = 'current' AND merchant_id = {merchantId}
  segmentTransactions: 30,               // 🔄 REPLACE: SELECT COUNT(*) FROM transactions WHERE customer_segment = 'current' AND merchant_id = {merchantId}
  avgCLV: 585,                          // 🔄 REPLACE: Calculated CLV from customer_analytics table
  topCustomer: {
    name: "A. Martinez",                 // 🔄 REPLACE: Anonymized name from top_customers query
    spendLast30d: 348                   // 🔄 REPLACE: Top customer spend calculation
  },
  campaigns: {
    recognizeRegulars: 127,             // 🔄 REPLACE: Campaign performance metrics from campaigns table
    boostAvgSpend: 43,                  // 🔄 REPLACE: Campaign performance metrics
    boostFrequency: 28,                 // 🔄 REPLACE: Campaign performance metrics
    recoverLapsed: 15                   // 🔄 REPLACE: Campaign performance metrics
  },
  behavior: {
    avgFrequency: 2.5,                  // 🔄 REPLACE: Calculated from shopper_behavior_analytics table
    avgSpendPerShopper: 67.10,          // 🔄 REPLACE: Calculated average
    avgTransactionsPerShopper: 2.3,     // 🔄 REPLACE: Calculated average  
    avgTransactionSize: 26.74,          // 🔄 REPLACE: Calculated average
    deltas: {                           // 🔄 REPLACE: All calculated vs previous 30-day period
      frequency: 8,
      spendPerShopper: 5,
      transactions: 3,
      transactionSize: -4
    }
  }
};

// =============================================================================
// BILLING SCREEN DATA (BillingScreen.tsx)
// =============================================================================

/**
 * BILLING DATA - Service fees and program performance
 * API Endpoint: GET /api/billing/current-month?merchant_id={merchantId}
 * Database Tables: billing.monthly_fees, billing.tier_calculations, program_performance.metrics
 */
export interface BillingData {
  lastMonthTotal: number;                // Total service fee for last month
  billedDate: string;                    // Date when bill was generated
  programSales: number;                  // Total sales generated through program
  tierBreakdown: Array<{                 // Tiered pricing breakdown
    tier: string;
    applied: number;
    rate: number;
    fee: number;
  }>;
  reachDelivered: number;               // Total reach delivered to shoppers
  priorityPlacements: number;           // Number of priority ad placements
  purchases: {
    count: number;                      // Number of purchases from program
    average: number;                    // Average purchase amount
    visitMultiplier: number;            // Average visit frequency multiplier
  };
  campaigns: {
    total: number;                      // Total campaigns created
    breakdown: Array<{                  // Campaign type breakdown
      name: string;
      count: number;
    }>;
  };
  neighborhoodSpend: number;            // Total neighborhood spending data
}

export const billingData: BillingData = {
  lastMonthTotal: 117.50,               // 🔄 REPLACE: SELECT total_fee FROM monthly_billing WHERE merchant_id = {merchantId} AND month = LAST_MONTH
  billedDate: "Aug 31",                 // 🔄 REPLACE: SELECT billing_date FROM monthly_billing
  programSales: 1350.00,                // 🔄 REPLACE: SELECT SUM(attributed_sales) FROM program_performance WHERE merchant_id = {merchantId}
  tierBreakdown: [                      // 🔄 REPLACE: Generated from billing calculation logic
    { tier: "1st $1,000 @ 10%", applied: 1000.00, rate: 10, fee: 100.00 },
    { tier: "Next $1,000 @ 5%", applied: 350.00, rate: 5, fee: 17.50 },
    { tier: "Next @ 2%", applied: 0.00, rate: 2, fee: 0.00 }
  ],
  reachDelivered: 67345,                // 🔄 REPLACE: SELECT SUM(unique_reach) FROM campaign_delivery WHERE merchant_id = {merchantId}
  priorityPlacements: 1365,             // 🔄 REPLACE: SELECT COUNT(*) FROM priority_placements WHERE merchant_id = {merchantId}
  purchases: {                          // 🔄 REPLACE: All from purchase_analytics table
    count: 82,
    average: 83.45,
    visitMultiplier: 1.6
  },
  campaigns: {                          // 🔄 REPLACE: From campaigns table
    total: 6,
    breakdown: [
      { name: "High-value", count: 2 },
      { name: "Booster", count: 2 },
      { name: "Lapsed", count: 1 },
      { name: "Recognize", count: 1 }
    ]
  },
  neighborhoodSpend: 2347882            // 🔄 REPLACE: SELECT SUM(amount) FROM neighborhood_analytics WHERE neighborhood = {merchantNeighborhood}
};

// =============================================================================
// DEVELOPER NOTES
// =============================================================================

/**
 * 🔧 INTEGRATION CHECKLIST FOR DEVELOPERS:
 * 
 * 1. LOCATION SETUP:
 *    - Replace locationData with API call to get merchant's actual location
 *    - Update getNeighborhood() function in /utils/location.ts
 * 
 * 2. API ENDPOINTS TO CREATE:
 *    - GET /api/merchant/location
 *    - GET /api/analytics/area-reach
 *    - GET /api/analytics/neighborhood-reach  
 *    - GET /api/analytics/current-shoppers
 *    - GET /api/billing/current-month
 * 
 * 3. DATABASE TABLES NEEDED:
 *    - merchants (location, service_area)
 *    - analytics (area_reach, zone_performance, shopper_behavior)
 *    - billing (monthly_fees, tier_calculations)
 *    - campaigns (performance, delivery_metrics)
 *    - transactions (amounts, dates, customer_segments)
 * 
 * 4. REPLACE MOCK DATA:
 *    - Import actual data interfaces from this file
 *    - Replace mock objects with API calls in each screen component
 *    - Add error handling and loading states
 * 
 * 5. DATA-ID ATTRIBUTES:
 *    - All StatCard, StatTile components have data-id attributes for analytics tracking
 *    - These IDs map to specific database fields for easy debugging
 */

/**
 * 🎯 QUICK FIND: Search for "🔄 REPLACE:" in codebase to find all hardcoded values
 * that need to be replaced with actual database calls.
 */