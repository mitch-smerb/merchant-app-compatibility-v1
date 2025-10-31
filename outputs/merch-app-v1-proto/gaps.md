# Missing Data Interface Elements in Merchant App v0

## Formatting Utilities - GAPS IDENTIFIED

### ❌ Missing Currency Formatters
- No `formatCurrency()` or equivalent found
- No locale-aware currency formatting
- **Recommendation**: Need standardized currency display for billing/revenue data

### ❌ Missing Percentage Formatters
- No `formatPercent()` utilities found
- **Recommendation**: Critical for analytics metrics (conversion rates, growth %)

### ❌ Missing Time Window Helpers
- No `MTD` (Month-to-Date) utilities
- No `last_30d` (Last 30 Days) helpers
- No date range standardization
- **Recommendation**: Essential for consistent analytics time periods

### ❌ Missing Number Scale Utilities
- Only basic `getPrettyNumber()` exists
- No large number formatting (K, M, B suffixes)
- **Recommendation**: Important for readability of large metrics

## Data Display Styling - GAPS IDENTIFIED

### ❌ Missing Standard Metric Classes
- No `text-stat-large` or equivalent CSS classes found
- Limited styling tokens for data displays
- **Recommendation**: Need consistent typography scale for metrics

### ❌ Missing Data Visualization Helpers
- No chart color schemes
- No standard metric card layouts beyond `bigNumber` iframe sizing
- **Recommendation**: Standardized component library for data presentation

## API Standards - GAPS IDENTIFIED

### ❌ Missing OpenAPI/Swagger Documentation
- No `openapi.yaml` or `swagger.json` found
- **Recommendation**: API documentation for v1 data endpoints

### ❌ Missing Standardized Error Handling
- Basic error shape exists but no centralized error utils
- No error code standardization
- **Recommendation**: Comprehensive error handling patterns

### ❌ Missing Data Validation
- No runtime type validation (e.g., zod, joi)
- **Recommendation**: API response validation for production safety

## Backend/Warehouse Integration - MAJOR GAPS

### ❌ No Warehouse Views Found
- No dbt models or SQL materialized views
- No `rpt_*` or `mv_*` naming patterns
- **Recommendation**: Need app-ready analytics views

### ❌ No Data Pipeline References
- No Airflow DAGs or cron job definitions
- No refresh schedules documented
- **Recommendation**: Data freshness management strategy

### ❌ No Data Naming Standards
- No stable column naming tokens (`*_amt_usd`, `*_cnt`)
- **Recommendation**: Consistent field naming conventions

## Time Zone Handling - GAPS IDENTIFIED

### ❌ Missing Timezone Utilities
- No timezone conversion helpers
- No merchant timezone context
- **Recommendation**: Merchant-specific timezone handling

## Caching Strategy - GAPS IDENTIFIED

### ❌ Missing Cache Patterns
- No cache invalidation strategies
- No stale-while-revalidate patterns
- **Recommendation**: Performance optimization for analytics data

## Data Transformation - GAPS IDENTIFIED

### ❌ Missing Business Logic Helpers
- No metric calculation utilities
- No KPI aggregation functions
- **Recommendation**: Standardized business metric calculations

## Critical Recommendations for V1

1. **Create Comprehensive Formatting Library** - Currency, percentage, date, number utilities
2. **Establish Data Display Component System** - Metric cards, charts, tables with consistent styling
3. **Design API-Ready Warehouse Views** - Replace PRESET dependency with direct data access
4. **Implement Data Validation Layer** - Runtime checking of API responses
5. **Create Time Window Standardization** - MTD, QTD, YTD, Last N days helpers
6. **Design Error Handling System** - Centralized error management and user feedback
7. **Document Data Pipeline Architecture** - How analytics data flows from warehouse to app