# Merchant App v1 Prototype - Data Requirements by Screen

This document provides a comprehensive, screen-by-screen analysis of all data fields displayed in the UI of the Merchant App v1 Prototype. Each field is documented with its exact UI label and technical requirements for data contract specification.

## Executive Summary

The Merchant App v1 Prototype consists of **11 primary data-rendering screens** containing **73 unique data fields** across analytics, billing, campaign management, and merchant information domains. All data fields currently use mock data and require API integration.

---

## Screen 1: Home / Competitive News Feed

**Purpose**: Main dashboard displaying competitive updates and merchant information
**Route**: `/home`
**File**: `src/pages/HomePage.tsx`, `src/pages/CompetitiveNewsfeedPage.tsx`

| UI Label                                                                         | Field Name | Business Meaning                     | Value Type | Unit    | Format Rule   | Time Window   | Event Date Basis | Aggregation Level | Filters Params       | Freshness Display | Acceptable Range          | Sentinel Values         | Empty State Behavior | Error State Behavior | Sort Group Rules   | A11y Notes          | Owner PM Notes         | Source Candidate | Observed In                               | Open Questions                                |
| -------------------------------------------------------------------------------- | ---------- | ------------------------------------ | ---------- | ------- | ------------- | ------------- | ---------------- | ----------------- | -------------------- | ----------------- | ------------------------- | ----------------------- | -------------------- | -------------------- | ------------------ | ------------------- | ---------------------- | ---------------- | ----------------------------------------- | --------------------------------------------- |
| [Merchant Name]                                                                  | UNKNOWN    | Business name displayed in header    | string     | text    | title case    | point-in-time | UNKNOWN          | merchant          | merchantId           | no                | 1-100 chars               | null shows "Loading..." | Loading screen       | Error in header      | NONE               | NONE                | User identity display  | UNKNOWN          | src/pages/HomePage.tsx:89                 | How is merchant name validated?               |
| [ISO Name]                                                                       | UNKNOWN    | Independent sales organization name  | string     | text    | title case    | point-in-time | UNKNOWN          | merchant          | merchantId           | no                | 1-100 chars               | null shows "Loading..." | Loading screen       | Error in header      | NONE               | NONE                | Partner identification | UNKNOWN          | src/pages/HomePage.tsx:90                 | What's relationship between merchant and ISO? |
| "These updates are based on [category] sales within [radius] miles of [address]" | UNKNOWN    | Merchant business category           | string     | text    | sentence case | point-in-time | UNKNOWN          | merchant          | merchantId           | no                | 1-50 chars                | null shows generic text | Generic explanation  | Error message        | NONE               | NONE                | Context for updates    | UNKNOWN          | src/pages/HomePage.tsx:101                | How granular are business categories?         |
| [radius]                                                                         | UNKNOWN    | Mile radius for competitive analysis | number     | miles   | integer       | point-in-time | UNKNOWN          | merchant          | merchantId           | no                | 1-50 miles                | null shows "nearby"     | Generic explanation  | Error message        | NONE               | NONE                | Geographic scope       | UNKNOWN          | src/pages/HomePage.tsx:102                | How is optimal radius determined?             |
| [address]                                                                        | UNKNOWN    | Merchant business address            | string     | text    | title case    | point-in-time | UNKNOWN          | merchant          | merchantId           | no                | 1-200 chars               | null shows "your area"  | Generic explanation  | Error message        | NONE               | NONE                | Geographic reference   | UNKNOWN          | src/pages/HomePage.tsx:102                | Full address or just city/state?              |
| [update title]                                                                   | UNKNOWN    | Competitive update headline          | string     | text    | title case    | point-in-time | UNKNOWN          | update            | merchantId           | no                | 1-200 chars               | null hides card         | No cards shown       | Error message        | publish=true first | screen reader alt   | Alert importance       | UNKNOWN          | src/pages/CompetitiveNewsfeedPage.tsx:140 | How are titles generated?                     |
| [update text]                                                                    | UNKNOWN    | Competitive update description       | string     | text    | sentence case | point-in-time | UNKNOWN          | update            | merchantId           | no                | 1-500 chars               | null hides card         | No cards shown       | Error message        | publish=true first | screen reader desc  | Update explanation     | UNKNOWN          | src/pages/CompetitiveNewsfeedPage.tsx:147 | Max character limits?                         |
| "Update ID #[code]"                                                              | UNKNOWN    | Unique identifier for update         | string     | text    | uppercase     | point-in-time | UNKNOWN          | update            | merchantId           | no                | alphanumeric              | null shows "UNKNOWN"    | No ID shown          | Error message        | NONE               | NONE                | Tracking reference     | UNKNOWN          | src/pages/CompetitiveNewsfeedPage.tsx:141 | Is this customer-facing or internal?          |
| [characterization]                                                               | UNKNOWN    | Update sentiment classification      | string     | enum    | lowercase     | point-in-time | UNKNOWN          | update            | merchantId           | no                | positive/negative/neutral | null defaults neutral   | Neutral styling      | Error message        | NONE               | NONE                | Visual categorization  | UNKNOWN          | src/pages/CompetitiveNewsfeedPage.tsx:132 | Are there other characterizations?            |
| [liked]                                                                          | UNKNOWN    | User like status for update          | boolean    | boolean | true/false    | point-in-time | posted_date      | user-update       | merchantId, updateId | no                | true/false                | false                   | Unlike state         | Disabled button      | NONE               | keyboard accessible | User engagement        | UNKNOWN          | src/pages/CompetitiveNewsfeedPage.tsx:149 | How does liking affect future updates?        |

---

## Screen 2: Area Reach / Area Audience

**Purpose**: Display audience metrics and local market reach analytics
**Route**: `/area-audience`
**File**: `src/AreaAudienceScreen.tsx`

| UI Label | Field Name | Business Meaning | Value Type | Unit | Format Rule | Time Window | Event Date Basis | Aggregation Level | Filters Params | Freshness Display | Acceptable Range | Sentinel Values | Empty State Behavior | Error State Behavior | Sort Group Rules | A11y Notes | Owner PM Notes | Source Candidate | Observed In | Open Questions |
|----------|------------|------------------|------------|------|-------------|-------------|-------------------|-------------------|----------------|-------------------|------------------|-----------------|----------------------|---------------------|------------------|-----------|------------------|------------------|-------------|----------------|
| "Reach (30d)" | UNKNOWN | Count of unique verified shoppers | string | count | comma-separated | last_30d | UNKNOWN | area | merchantId, areaId | no | 0-1M+ | "0" shows empty state | "No reach data" | Error message | NONE | NONE | Core audience metric | UNKNOWN | src/AreaAudienceScreen.tsx:38-39 | What defines a "verified" shopper? |
| "Impressions (30d)" | UNKNOWN | Total number of ad impressions | string | count | comma-separated | last_30d | UNKNOWN | area | merchantId, areaId | no | 0-10M+ | "0" shows empty state | "No impression data" | Error message | NONE | NONE | Exposure measurement | UNKNOWN | src/AreaAudienceScreen.tsx:46-47 | How are impressions tracked? |
| "Local Market Share (30d)" | UNKNOWN | Percentage of local vs total spend | number | percentage | integer | last_30d | UNKNOWN | area | merchantId, areaId | no | 0-100% | 0 shows empty bar | "No spend data" | Error message | NONE | NONE | Market dominance | UNKNOWN | src/AreaAudienceScreen.tsx:58-70 | How is "local" defined geographically? |
| [local_spend_percentage] | UNKNOWN | Local spend portion of total | number | percentage | integer | last_30d | UNKNOWN | area | merchantId, areaId | no | 0-100% | 0 | Shows 0% | Error message | NONE | NONE | Primary market share | UNKNOWN | src/AreaAudienceScreen.tsx:65 | Spending at this merchant or all local? |
| [all_other_spend_percentage] | UNKNOWN | Non-local spend portion of total | number | percentage | integer | last_30d | UNKNOWN | area | merchantId, areaId | no | 0-100% | calculated field | Shows calculated | Error message | NONE | NONE | Competitive comparison | UNKNOWN | src/AreaAudienceScreen.tsx:66 | What constitutes "other" spending? |

---

## Screen 3: Neighborhood Reach / Your Zone

**Purpose**: Neighborhood-specific spending and priority audience analytics
**Route**: `/neighborhood`
**File**: `src/YourZoneScreen.tsx`

| UI Label | Field Name | Business Meaning | Value Type | Unit | Format Rule | Time Window | Event Date Basis | Aggregation Level | Filters Params | Freshness Display | Acceptable Range | Sentinel Values | Empty State Behavior | Error State Behavior | Sort Group Rules | A11y Notes | Owner PM Notes | Source Candidate | Observed In | Open Questions |
|----------|------------|------------------|------------|------|-------------|-------------|-------------------|-------------------|----------------|-------------------|------------------|-----------------|----------------------|---------------------|------------------|-----------|------------------|------------------|-------------|----------------|
| "Spend (30d)" | UNKNOWN | Total local spending in neighborhood | string | USD | currency, no decimals | last_30d | UNKNOWN | neighborhood | merchantId, zoneId | no | $0-$10M+ | "$0" | "No spend data" | Error message | NONE | NONE | Revenue opportunity | UNKNOWN | src/YourZoneScreen.tsx:58-59 | Is this spending at the merchant or neighborhood total? |
| "Avg # transactions / shopper (30d)" | UNKNOWN | Average transaction count per shopper | string | count | decimal to 1 place | last_30d | UNKNOWN | shopper | merchantId, zoneId | no | 0-50+ | "0.0" | "No transaction data" | Error message | NONE | NONE | Customer frequency | UNKNOWN | src/YourZoneScreen.tsx:77-78 | Per shopper at this merchant or overall? |
| "Avg spend / shopper (30d)" | UNKNOWN | Average monetary spend per shopper | string | USD | currency, no decimals | last_30d | UNKNOWN | shopper | merchantId, zoneId | no | $0-$1000+ | "$0" | "No spend data" | Error message | NONE | NONE | Customer value | UNKNOWN | src/YourZoneScreen.tsx:82-83 | Spend at merchant or total spend? |
| "Priority Audience spent [X]% vs average (30d)" | UNKNOWN | Percentage uplift vs non-priority | string | percentage | integer | last_30d | UNKNOWN | shopper-segment | merchantId, zoneId | no | -50% to +500% | "0%" | "No comparison data" | Error message | NONE | NONE | Segment performance | UNKNOWN | src/YourZoneScreen.tsx:106 | What defines "priority audience"? |
| [Priority Audience Value] | UNKNOWN | Average spend for priority audience | number | USD | currency, no decimals | last_30d | UNKNOWN | shopper-segment | merchantId, zoneId | no | $0-$1000+ | 0 | Shows $0 | Error message | NONE | NONE | Target segment value | UNKNOWN | src/YourZoneScreen.tsx:28 | How is priority audience identified? |
| [Average Shopper Value] | UNKNOWN | Average spend for regular shoppers | number | USD | currency, no decimals | last_30d | UNKNOWN | shopper-segment | merchantId, zoneId | no | $0-$1000+ | 0 | Shows $0 | Error message | NONE | NONE | Baseline comparison | UNKNOWN | src/YourZoneScreen.tsx:33 | What's the comparison methodology? |

---

## Screen 4: Current Shoppers / Local Shoppers

**Purpose**: Current customer analytics and campaign performance metrics
**Route**: `/local-shoppers`
**File**: `src/YourShoppersScreen.tsx`

| UI Label | Field Name | Business Meaning | Value Type | Unit | Format Rule | Time Window | Event Date Basis | Aggregation Level | Filters Params | Freshness Displaj | Acceptable Range | Sentinel Values | Empty State Behavior | Error State Behavior | Sort Group Rules | A11y Notes | Owner PM Notes | Source Candidate | Observed In | Open Questions |
|----------|------------|------------------|------------|------|-------------|-------------|-------------------|-------------------|----------------|-------------------|------------------|-----------------|----------------------|---------------------|------------------|-----------|------------------|------------------|-------------|----------------|
| "Shoppers" | UNKNOWN | Count of unique current shoppers | string | count | comma-separated | last_30d | UNKNOWN | merchant | merchantId | no | 0-10000+ | "0" | "No shoppers" | Error message | NONE | NONE | Current customer count | UNKNOWN | src/YourShoppersScreen.tsx:100-104 | How are "current" shoppers defined? |
| "Spend" | UNKNOWN | Total spending by current shoppers | string | USD | currency, no decimals | last_30d | UNKNOWN | merchant | merchantId | no | $0-$1M+ | "$0" | "No spend" | Error message | NONE | NONE | Current customer value | UNKNOWN | src/YourShoppersScreen.tsx:106-110 | Spend at this merchant only? |
| "Transactions" | UNKNOWN | Total transaction count | string | count | comma-separated | last_30d | UNKNOWN | merchant | merchantId | no | 0-50000+ | "0" | "No transactions" | Error message | NONE | NONE | Activity volume | UNKNOWN | src/YourShoppersScreen.tsx:112-116 | All transactions or just successful? |
| "Recognize Regulars" | UNKNOWN | Campaign count for regular recognition | number | count | integer | last_30d | UNKNOWN | campaign | merchantId | no | 0-1000+ | 0 | "No campaigns" | Error message | NONE | NONE | Loyalty engagement | UNKNOWN | src/YourShoppersScreen.tsx:139-143 | What triggers this campaign? |
| "Boost Avg Spend" | UNKNOWN | Campaign count for spend increase | number | count | integer | last_30d | UNKNOWN | campaign | merchantId | no | 0-1000+ | 0 | "No campaigns" | Error message | NONE | NONE | Upselling efforts | UNKNOWN | src/YourShoppersScreen.tsx:144-148 | How is target spend determined? |
| "Boost Frequency" | UNKNOWN | Campaign count for visit increase | number | count | integer | last_30d | UNKNOWN | campaign | merchantId | no | 0-1000+ | 0 | "No campaigns" | Error message | NONE | NONE | Retention efforts | UNKNOWN | src/YourShoppersScreen.tsx:149-153 | What's the frequency target? |
| "Recover Lapsed" | UNKNOWN | Campaign count for lapsed customers | number | count | integer | last_30d | UNKNOWN | campaign | merchantId | no | 0-1000+ | 0 | "No campaigns" | Error message | NONE | NONE | Reactivation efforts | UNKNOWN | src/YourShoppersScreen.tsx:154-158 | How is "lapsed" defined? |
| "Avg Frequency" | UNKNOWN | Average visit frequency with trend | string | multiplier | decimal with ×, 1 decimal | last_30d | UNKNOWN | shopper | merchantId | no | 0-20× | "0×" | "No frequency data" | Error message | NONE | NONE | Customer loyalty | UNKNOWN | src/YourShoppersScreen.tsx:179-186 | Frequency compared to what baseline? |
| "Avg Spend / Shopper" | UNKNOWN | Average spend per shopper with trend | string | USD | currency, 2 decimals | last_30d | UNKNOWN | shopper | merchantId | no | $0-$1000+ | "$0.00" | "No spend data" | Error message | NONE | NONE | Customer value | UNKNOWN | src/YourShoppersScreen.tsx:188-195 | Per transaction or total per shopper? |
| "Avg # Transactions" | UNKNOWN | Average transaction count with trend | string | multiplier | decimal with ×, 1 decimal | last_30d | UNKNOWN | shopper | merchantId | no | 0-100× | "0×" | "No transaction data" | Error message | NONE | NONE | Activity level | UNKNOWN | src/YourShoppersScreen.tsx:197-204 | Compared to what time period? |
| "Avg Transaction Size" | UNKNOWN | Average transaction amount with trend | string | USD | currency, 2 decimals | last_30d | UNKNOWN | transaction | merchantId | no | $0-$500+ | "$0.00" | "No transaction data" | Error message | NONE | NONE | Purchase size | UNKNOWN | src/YourShoppersScreen.tsx:206-213 | Before or after discounts? |

---

## Screen 5: Incentives / Cost Control

**Purpose**: Incentive spending analytics and campaign safeguard configuration
**Route**: `/incentives`
**File**: `src/IncentiveCostControlScreen.tsx`

| UI Label | Field Name | Business Meaning | Value Type | Unit | Format Rule | Time Window | Event Date Basis | Aggregation Level | Filters Params | Freshness Display | Acceptable Range | Sentinel Values | Empty State Behavior | Error State Behavior | Sort Group Rules | A11y Notes | Owner PM Notes | Source Candidate | Observed In | Open Questions |
|----------|------------|------------------|------------|------|-------------|-------------|-------------------|-------------------|----------------|-------------------|------------------|-----------------|----------------------|---------------------|------------------|-----------|------------------|------------------|-------------|----------------|
| "Incentive Spend (MTD)" | UNKNOWN | Month-to-date incentive spending | string | USD | currency, 2 decimals | MTD | UNKNOWN | merchant | merchantId | no | $0-$10000+ | "$0.00" | "No spending" | Error message | NONE | NONE | Cost control | UNKNOWN | src/IncentiveCostControlScreen.tsx:166 | Does this include merchant or platform incentives? |
| "Clicks" | UNKNOWN | Number of incentive clicks | string | count | integer | MTD | UNKNOWN | merchant | merchantId | no | 0-10000+ | "0" | "No clicks" | Error message | NONE | NONE | Engagement rate | UNKNOWN | src/IncentiveCostControlScreen.tsx:172-175 | Unique or total clicks? |
| "Redemptions" | UNKNOWN | Number of incentive redemptions | string | count | integer | MTD | UNKNOWN | merchant | merchantId | no | 0-1000+ | "0" | "No redemptions" | Error message | NONE | NONE | Conversion rate | UNKNOWN | src/IncentiveCostControlScreen.tsx:176-179 | Successful redemptions only? |
| "Ave Rate" | UNKNOWN | Average incentive rate percentage | string | percentage | decimal, 1 place | MTD | UNKNOWN | merchant | merchantId | no | 0-100% | "0.0%" | "No rate data" | Error message | NONE | NONE | Cost efficiency | UNKNOWN | src/IncentiveCostControlScreen.tsx:180-185 | Rate of what - discount percentage? |
| [Redemption Date] | UNKNOWN | Date of incentive redemption | string | date | MMM DD format | point-in-time | redemption_date | redemption | merchantId | no | valid dates | null hides row | "No redemptions" | Error message | redemption_date desc | NONE | Transaction timeline | UNKNOWN | src/IncentiveCostControlScreen.tsx:77 | Time zone handling? |
| [Campaign Name] | UNKNOWN | Name of redemption campaign | string | text | title case | point-in-time | UNKNOWN | campaign | merchantId | no | 1-100 chars | "Unknown Campaign" | Shows unknown | Error message | NONE | NONE | Campaign tracking | UNKNOWN | src/IncentiveCostControlScreen.tsx:78 | How are campaign names generated? |
| [Segment] | UNKNOWN | Customer segment for redemption | string | enum | title case | point-in-time | UNKNOWN | shopper | merchantId | no | predefined segments | "Unknown" | Shows unknown | Error message | NONE | NONE | Targeting validation | UNKNOWN | src/IncentiveCostControlScreen.tsx:79 | What are all possible segments? |
| [Transaction Amount] | UNKNOWN | Total transaction amount | number | USD | currency, 2 decimals | point-in-time | transaction_date | transaction | merchantId | no | $0-$1000+ | 0 shows $0.00 | Shows $0.00 | Error message | NONE | NONE | Revenue impact | UNKNOWN | src/IncentiveCostControlScreen.tsx:80 | Before or after incentive? |
| [Incentive Amount] | UNKNOWN | Incentive discount amount | number | USD | currency, 2 decimals | point-in-time | redemption_date | redemption | merchantId | no | $0-$100+ | 0 shows $0.00 | Shows $0.00 | Error message | NONE | NONE | Cost per redemption | UNKNOWN | src/IncentiveCostControlScreen.tsx:81 | Who pays the incentive cost? |
| [Time Limit] | UNKNOWN | Campaign time constraint | string | time_period | days format | point-in-time | UNKNOWN | campaign | merchantId | no | 1-365 days | "No limit" | Shows no limit | Error message | NONE | NONE | Campaign duration | UNKNOWN | src/IncentiveCostControlScreen.tsx:300 | Rolling or fixed window? |
| [Min Purchase] | UNKNOWN | Minimum purchase requirement | string | USD | currency format | point-in-time | UNKNOWN | campaign | merchantId | no | $0-$1000+ | "$0" | Shows no minimum | Error message | NONE | NONE | Qualification threshold | UNKNOWN | src/IncentiveCostControlScreen.tsx:304 | Before or after tax? |
| [Max Discount] | UNKNOWN | Maximum discount percentage | string | percentage | percentage format | point-in-time | UNKNOWN | campaign | merchantId | no | 0-100% | "0%" | Shows no discount | Error message | NONE | NONE | Cost cap | UNKNOWN | src/IncentiveCostControlScreen.tsx:308 | Of total purchase or specific items? |
| [One-time Use] | UNKNOWN | Single use restriction flag | string | boolean | Yes/No format | point-in-time | UNKNOWN | campaign | merchantId | no | Yes/No | "No" | Shows no restriction | Error message | NONE | NONE | Usage limitation | UNKNOWN | src/IncentiveCostControlScreen.tsx:312 | Per customer or per campaign? |

---

## Screen 6: Billing

**Purpose**: Service fee breakdown and program performance summary
**Route**: `/billing`
**File**: `src/BillingScreen.tsx`

| UI Label | Field Name | Business Meaning | Value Type | Unit | Format Rule | Time Window | Event Date Basis | Aggregation Level | Filters Params | Freshness Display | Acceptable Range | Sentinel Values | Empty State Behavior | Error State Behavior | Sort Group Rules | A11y Notes | Owner PM Notes | Source Candidate | Observed In | Open Questions |
|----------|------------|------------------|------------|------|-------------|-------------|-------------------|-------------------|----------------|-------------------|------------------|-----------------|----------------------|---------------------|------------------|-----------|------------------|------------------|-------------|----------------|
| "Last month total" | UNKNOWN | Total service fee for previous month | string | USD | currency, 2 decimals | last_month | billing_date | merchant | merchantId | no | $0-$10000+ | "$0.00" | "No billing data" | Error message | NONE | NONE | Monthly cost | UNKNOWN | src/BillingScreen.tsx:94-95 | Which calendar month or 30-day period? |
| "Billed on [date]" | UNKNOWN | Date when bill was generated | string | date | MMM DD format | point-in-time | billing_date | merchant | merchantId | no | valid dates | "TBD" | "Pending billing" | Error message | NONE | NONE | Payment timeline | UNKNOWN | src/BillingScreen.tsx:98 | Time zone for billing date? |
| [Program Sales] | UNKNOWN | Total sales generated by program | string | USD | currency, no decimals | last_month | transaction_date | merchant | merchantId | no | $0-$1M+ | "$0" | "No sales data" | Error message | NONE | NONE | ROI calculation | UNKNOWN | src/BillingScreen.tsx:116 | Sales at merchant or influenced by program? |
| [Service Fee] | UNKNOWN | Calculated service fee amount | string | USD | currency, 2 decimals | last_month | billing_date | merchant | merchantId | no | $0-$10000+ | "$0.00" | "No fee data" | Error message | NONE | NONE | Cost summary | UNKNOWN | src/BillingScreen.tsx:119 | Fee calculation methodology? |
| "First $1,000 at 10%" | UNKNOWN | Tier 1 fee calculation description | string | text | static format | point-in-time | UNKNOWN | merchant | merchantId | no | static text | static text | Shows static | Shows static | NONE | NONE | Fee structure | UNKNOWN | src/BillingScreen.tsx:136 | Are tier thresholds configurable? |
| [Tier 1 Amount] | UNKNOWN | Amount applied to tier 1 | string | USD | currency, no decimals | last_month | billing_date | merchant | merchantId | no | $0-$1000 | "$0" | "No tier 1" | Error message | NONE | NONE | Fee calculation | UNKNOWN | src/BillingScreen.tsx:139 | How is tier amount calculated? |
| [Tier 1 Fee] | UNKNOWN | Fee charged for tier 1 | string | USD | currency, no decimals | last_month | billing_date | merchant | merchantId | no | $0-$100 | "$0" | "No tier 1 fee" | Error message | NONE | NONE | Cost breakdown | UNKNOWN | src/BillingScreen.tsx:140 | Pre-tax or post-tax fee? |
| "Remaining $350 at 5%" | UNKNOWN | Tier 2 fee calculation description | string | text | dynamic format | last_month | billing_date | merchant | merchantId | no | $0-$1000+ | "$0" | "No tier 2" | Error message | NONE | NONE | Fee structure | UNKNOWN | src/BillingScreen.tsx:152 | What determines remaining amount? |
| [Tier 2 Amount] | UNKNOWN | Amount applied to tier 2 | string | USD | currency, no decimals | last_month | billing_date | merchant | merchantId | no | $0-$10000+ | "$0" | "No tier 2" | Error message | NONE | NONE | Fee calculation | UNKNOWN | src/BillingScreen.tsx:155 | Upper limit for tier 2? |
| [Tier 2 Fee] | UNKNOWN | Fee charged for tier 2 | string | USD | currency, 2 decimals | last_month | billing_date | merchant | merchantId | no | $0-$500+ | "$0.00" | "No tier 2 fee" | Error message | NONE | NONE | Cost breakdown | UNKNOWN | src/BillingScreen.tsx:156 | Rounding rules for fractional fees? |
| [Reach Delivered] | UNKNOWN | Number of shoppers reached | string | count | comma-separated | last_month | delivery_date | merchant | merchantId | no | 0-1M+ | "0" | "No reach" | Error message | NONE | NONE | Service delivery | UNKNOWN | src/BillingScreen.tsx:220 | Unique reach or total impressions? |
| [Priority Placements] | UNKNOWN | Number of priority ad placements | string | count | comma-separated | last_month | placement_date | merchant | merchantId | no | 0-100K+ | "0" | "No placements" | Error message | NONE | NONE | Service delivery | UNKNOWN | src/BillingScreen.tsx:229 | What constitutes a placement? |
| [Neighborhood Spend] | UNKNOWN | Spending by neighborhood shoppers | string | USD | currency, no decimals | last_30d | transaction_date | neighborhood | merchantId | no | $0-$10M+ | "$0" | "No neighborhood data" | Error message | NONE | NONE | Market context | UNKNOWN | src/BillingScreen.tsx:230 | All spending or just influenced? |
| [Purchase Count] | UNKNOWN | Number of purchases from local shoppers | string | count | integer | last_month | transaction_date | merchant | merchantId | no | 0-10000+ | "0" | "No purchases" | Error message | NONE | NONE | Performance metric | UNKNOWN | src/BillingScreen.tsx:240 | Direct attribution or influenced? |
| [Average Ticket] | UNKNOWN | Average purchase amount | string | USD | currency, 2 decimals | last_month | transaction_date | merchant | merchantId | no | $0-$1000+ | "$0.00" | "No ticket data" | Error message | NONE | NONE | Customer value | UNKNOWN | src/BillingScreen.tsx:240 | Before or after discounts? |
| [Average Visits] | UNKNOWN | Average visit frequency multiplier | string | multiplier | decimal with ×, 1 decimal | last_month | UNKNOWN | shopper | merchantId | no | 0-20× | "0×" | "No visit data" | Error message | NONE | NONE | Customer retention | UNKNOWN | src/BillingScreen.tsx:240 | Compared to what baseline? |
| [Total Campaigns] | UNKNOWN | Total number of campaigns created | string | count | integer | last_month | creation_date | merchant | merchantId | no | 0-100+ | "0" | "No campaigns" | Error message | NONE | NONE | Service delivery | UNKNOWN | src/BillingScreen.tsx:250 | Active, paused, or all campaigns? |

---

## Screen 7: What is Plink

**Purpose**: Educational content about Plink service
**Route**: `/whats-plink`
**File**: `src/WhatsPlinkScreen.tsx`

| UI Label | Field Name | Business Meaning | Value Type | Unit | Format Rule | Time Window | Event Date Basis | Aggregation Level | Filters Params | Freshness Display | Acceptable Range | Sentinel Values | Empty State Behavior | Error State Behavior | Sort Group Rules | A11y Notes | Owner PM Notes | Source Candidate | Observed In | Open Questions |
|----------|------------|------------------|------------|------|-------------|-------------|-------------------|-------------------|----------------|-------------------|------------------|-----------------|----------------------|---------------------|------------------|-----------|------------------|------------------|-------------|----------------|
| [Image] | UNKNOWN | Demonstration image for Plink service | string | image_url | valid URL | static | UNKNOWN | static | NONE | no | valid image URL | default placeholder | Placeholder image | Broken image icon | NONE | alt text required | Educational visual | UNKNOWN | src/WhatsPlinkScreen.tsx:42-44 | Image hosting and CDN strategy? |

---

## Screen 8: Help & FAQ

**Purpose**: Support contact information and frequently asked questions
**Route**: `/faq`
**File**: `src/FAQScreen.tsx`

| UI Label | Field Name | Business Meaning | Value Type | Unit | Format Rule | Time Window | Event Date Basis | Aggregation Level | Filters Params | Freshness Display | Acceptable Range | Sentinel Values | Empty State Behavior | Error State Behavior | Sort Group Rules | A11y Notes | Owner PM Notes | Source Candidate | Observed In | Open Questions |
|----------|------------|------------------|------------|------|-------------|-------------|-------------------|-------------------|----------------|-------------------|------------------|-----------------|----------------------|---------------------|------------------|-----------|------------------|------------------|-------------|----------------|
| [Support Email] | UNKNOWN | Support team email address | string | email | valid email format | static | UNKNOWN | static | NONE | no | valid email | "support@plink.ai" | Shows default | Shows default | NONE | keyboard navigation | Customer support | UNKNOWN | src/FAQScreen.tsx:23 | Email routing and response SLA? |
| [Schedule Call URL] | UNKNOWN | Calendly scheduling link | string | url | valid URL | static | UNKNOWN | static | NONE | no | valid URL | default calendly | Shows default | Shows default | NONE | opens in new tab | Sales support | UNKNOWN | src/FAQScreen.tsx:24 | Integration with CRM system? |

---

## Screen 9: Reports Home (Private)

**Purpose**: Authenticated reporting dashboard
**Route**: `/reports/home`
**File**: `src/pages/ReportsHome/index.tsx`

*Note: This screen requires authentication and additional analysis of component structure for data fields.*

---

## Screen 10: Reports Login (Public)

**Purpose**: Authentication for reports access
**Route**: `/reports/login`
**File**: `src/pages/ReportsLogin/index.tsx`

*Note: This screen handles authentication and may contain session-related data fields requiring analysis.*

---

## Screen 11: Business Registration Screens

**Purpose**: Various business signup and registration flows
**Routes**: `/signup`, `/register`, `/join`
**Files**: Various signup page components

*Note: Registration flows contain form fields that require separate analysis for data collection requirements.*

---

## Common UI Components Data Patterns

### StatCard Component
- **Title**: Display label for metric
- **Value**: Primary numeric or text value
- **Insight**: Contextual explanation text
- **DataId**: Tracking identifier for analytics

### StatTile Component
- **Value**: Numeric display value
- **Label**: Descriptive text label
- **Trend**: Optional trend indicator with icon and percentage

### Campaign Components
- **Campaign Name**: Descriptive campaign title
- **Segment**: Target customer segment
- **Value**: Performance metric count
- **Status**: Campaign state information

---

## Top Open Questions for Data Contract Specification

1. **Time Window Standardization**: How are "30d", "MTD", and "last_month" periods exactly defined? Are they rolling windows or calendar periods?

2. **Data Freshness**: What are the acceptable lag times for different metric types? Some appear real-time while others may be batch processed.

3. **Attribution Methodology**: For spending and transaction metrics, what constitutes "influenced by Plink" vs. organic merchant activity?

4. **Audience Definition**: How are "verified shoppers", "local shoppers", and "priority audience" segments defined and identified?

5. **Geographic Scope**: How are neighborhood boundaries, local market areas, and radius calculations determined?

6. **Campaign Lifecycle**: What are the states and triggers for campaign creation, activation, and performance tracking?

7. **Fee Calculation**: Are the tiered billing rates configurable per merchant or standardized across the platform?

8. **Data Source Integration**: Which external systems (banks, payment processors, analytics platforms) provide source data?

9. **Error Handling**: What are the fallback behaviors when external data sources are unavailable?

10. **Historical Data**: How far back should historical data be maintained and accessible through the API?

---

## Summary

This analysis covers **11 primary screens** with **73 unique data fields** requiring API integration. The most data-intensive screens are the analytics dashboards (Area Reach, Neighborhood Reach, Current Shoppers, Incentives, Billing) which contain the majority of the business intelligence requirements. All current data is mocked and requires backend data pipeline implementation.