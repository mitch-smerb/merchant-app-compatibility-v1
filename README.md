# Merchant App V1 - Development Repository

## Overview
This repository contains the Merchant App V1 prototype, evolved from the AI prototype compatibility phase into the production development codebase.

**Current Phase:** Active Development
**Working Code:** `/outputs/merch-app-v1-proto/`
**Architecture:** Multi-root workspace (this repo + sibling Merchant-app-v0 reference)
**Target Production Date:** November 14, 2025

## ⚠️ CRITICAL: Input Protection
**DO NOT MODIFY FILES IN `/Inputs/` AFTER INITIAL SETUP**
- These are source materials for traceability
- All work happens in `/outputs/` only
- Original AI exports and Merchant App V0 must remain unchanged

## Repository Structure

### `/Inputs/` (READ-ONLY after setup)
- `context/` - Project context and constraints
- `ai-exports/` - RAW AI prototype source files (historical)
- `target-app-reference.md` - Multi-root workspace architecture
- `archive-docs/` - Archived historical documentation

### `/outputs/` (WORK AREA)
- `merch-app-v1-proto/` - **Main V1 application** (active development)
- `reports/` - Technical analysis and gap reports
- `archive-docs/` - Archived status documents from experimental phase

## Multi-Root Workspace Setup
This project uses a **multi-root workspace** for clean separation:
- **Merchant App Compatibility V1** (this repo) - Where all work happens
- **Merchant App V0 Reference** - Independent repo for architecture reference

**To get started:**
1. Clone V0 app as sibling: `git clone [TARGET_REPO_URL] ../Merchant-app-v0`
2. Open workspace: `merchant-app-compatibility-v1.code-workspace`
3. Both repos will be available in Cursor without filesystem coupling

## Development Approach
This project pioneered an **AI-native development workflow** where:
- Documentation serves as code (clear, non-conflicting docs = AI productivity)
- Rapid iteration cycles enable fast product-market fit
- Demo capability is a first-class feature for stakeholder validation
- Claude Code powers the entire development and iteration process

## Current Milestones
- **Nov 4, 2025:** Demo for Columbia Credit Union presentation
- **Nov 14, 2025:** V1 production launch (web-accessible to customers)

## Core Documentation (12 Files)
See procedural documentation in:
- **Project Standards:** CLAUDE.md, this README
- **Technical Specs:** `/outputs/architecture-analysis.md`, `/outputs/merch-app-v1-proto/gaps.md`
- **Product Requirements:** `/outputs/merch-app-v1-proto/PRODUCT_STORIES.md`, `REVISION_PLAN.md`
- **Development Guides:** `/outputs/merch-app-v1-proto/QA_TESTING_GUIDE.md`

---
**Mission**: Build a powerful productivity machine for rapid app iteration based on user feedback, driving fast cycles to product-market fit.

