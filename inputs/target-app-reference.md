# Merchant App V0 Reference

## Overview
This file documents the location of the Merchant App V0 used for architecture reference during the compatibility phase.

## Repository Information
- **GitHub Repository**: `plink-mobile-app-v1` (original repo name)
- **Local Path**: `../Merchant-app-v0/`
- **Purpose**: READ-ONLY reference for architecture analysis and pattern matching

## Setup Instructions
1. Clone the target app repository as a sibling to this project:
   ```bash
   cd /path/to/your/projects/
   git clone [TARGET_REPO_URL] Merchant-app-v0
   ```

2. Open both repositories in a Cursor multi-root workspace:
   - Open `merchant-app-compatibility-v1.code-workspace`
   - This will load both repos in a single workspace

## Usage
- **Read from**: `../Merchant-app-v0/` for architecture reference
- **Write to**: This compatibility repo (`outputs/` directory only)
- **Never modify**: The Merchant App V0 - it remains a clean reference

## Architecture Benefits
- ✅ Clean separation of concerns
- ✅ Independent git histories  
- ✅ No filesystem coupling or symlinks
- ✅ Portable across different developer setups
- ✅ Tool-friendly (no git-in-git conflicts)

---
**Remember**: The target app is for reference only. All work happens in `/outputs/` of this repo.

