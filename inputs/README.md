# Inputs Directory - READ ONLY

⚠️ **CRITICAL WARNING: DO NOT MODIFY ANY FILES IN THIS DIRECTORY** ⚠️

This directory contains source materials that must remain unchanged for traceability and comparison purposes.

## Directory Contents

### `ai-exports/`
- **Source**: Figma Make Export (AI-generated prototype)
- **Purpose**: Raw, untouched AI prototype for comparison
- **Status**: READ-ONLY - Protected by file permissions
- **Backup**: Available in `ai-exports-backup-YYYYMMDD-HHMM/`

### `target-app/`
- **Source**: Clone of plink-mobile-app-v1 GitHub repository
- **Purpose**: Understanding existing app architecture and patterns
- **Status**: READ-ONLY - Protected by file permissions + git push disabled
- **Backup**: Available in `target-app-backup-YYYYMMDD-HHMM/`

### Other Directories
- `context/` - Project documentation and constraints
- `reference-screens/` - Visual references and screenshots
- `env/` - Environment configuration templates
- `data/` - Sample data and schemas

## Safeguards Implemented
1. **File Permissions**: All input files set to read-only (555)
2. **Git Protection**: Push disabled on target-app clone
3. **Backups**: Timestamped backups created before work begins
4. **Documentation**: Clear warnings in README files
5. **Agent Instructions**: Explicit guardrails preventing input modification

## If You Need to Modify Inputs
1. This means starting a new compatibility phase iteration
2. Update the source materials (AI exports or GitHub repo)
3. Re-run the setup process with new inputs
4. Do NOT modify files in this directory

---
**Remember**: All work happens in `/outputs/` - inputs are for reference only!

