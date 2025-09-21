# Plink Merchant App - Prototype Compatibility Phase

## Overview
This repository contains the complete compatibility phase workflow for refactoring AI-generated prototype features into the existing Plink Merchant App architecture.

## ⚠️ CRITICAL: Input Protection
**DO NOT MODIFY FILES IN `/inputs/` AFTER INITIAL SETUP**
- These are source materials for traceability
- All work happens in `/outputs/` only
- Original AI exports and target app must remain unchanged

## Repository Structure

### `/inputs/` (READ-ONLY after setup)
- `context/` - Project context and constraints
- `ai-exports/` - RAW, untouched AI prototype files
- `reference-screens/` - Visual references and screenshots  
- `target-app/` - Clone of production Merchant App (for analysis only)
- `env/` - Environment configuration templates
- `data/` - Sample data and schemas

### `/outputs/` (WORK AREA)
- `prototype-code/` - Refactored, compatible prototype code
- `prototype/` - Running local server and screenshots
- `reports/` - Gap reports and data reconciliation
- `handoff/` - Complete dev handoff package

## Workflow Phases
1. **Intake** - Get preview running; align build and styling
2. **Refactor** - Code agents refactor to running state locally
3. **Gap Analysis** - Compare data contracts; create Gap Report
4. **UI/UX Polish** - Close visual gaps; adhere to patterns
5. **Data Development** - Draft schemas, queries, mocks
6. **Dev Handoff** - Complete package for production integration

## Safety Measures
- Input directories are read-only after setup
- All changes tracked with diff markers
- Backups created before starting work
- Clear separation between source and work areas

---
**Goal**: Prove AI refactoring can convert fast-moving AI prototypes into production-ready, architecture-compatible code.

