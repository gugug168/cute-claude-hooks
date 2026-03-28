#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Claude Code Localization Tool - Safe Edition
Only replaces strings in description:"..." fields to avoid breaking code logic
License: MIT
"""

import os
import sys
import re
import shutil

# ========== Color Definitions (Cross-platform) ==========
import platform

# Windows ANSI support
if platform.system() == 'Windows':
    import ctypes
    kernel32 = ctypes.windll.kernel32
    kernel32.SetConsoleMode(kernel32.GetStdHandle(-11), 7)

RED = '\033[91m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
MAGENTA = '\033[95m'
NC = '\033[0m'

# ========== Constants ==========
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# ========== Get Claude Code CLI Path ==========
def get_cli_paths():
    """Get Claude Code CLI path"""
    if platform.system() == 'Windows':
        appdata = os.environ.get('APPDATA', '')
        if appdata:
            npm_modules = os.path.join(appdata, 'npm', 'node_modules')
        else:
            userprofile = os.environ.get('USERPROFILE', '')
            npm_modules = os.path.join(userprofile, 'AppData', 'Roaming', 'npm', 'node_modules')
    else:
        import subprocess
        result = subprocess.run(['npm', 'root', '-g'], capture_output=True, text=True)
        if result.returncode != 0:
            print(f"{RED}Error: Cannot find npm global directory{NC}")
            sys.exit(1)
        npm_modules = result.stdout.strip()

    cli_path = os.path.join(npm_modules, '@anthropic-ai', 'claude-code', 'cli.js')
    cli_bak = os.path.join(npm_modules, '@anthropic-ai', 'claude-code', 'cli.bak.js')

    if not os.path.exists(cli_path):
        print(f"{RED}Error: Claude Code CLI not found. Install: npm install -g @anthropic-ai/claude-code{NC}")
        sys.exit(1)

    return cli_path, cli_bak

# ========== Parse Keyword Config ==========
def load_keywords(keyword_file):
    """Load keyword configuration"""
    keywords = []
    if not os.path.exists(keyword_file):
        print(f"{RED}Error: Keyword config not found: {keyword_file}{NC}")
        sys.exit(1)

    with open(keyword_file, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            if '|' not in line:
                continue

            pipe_idx = line.index('|')
            keyword = line[:pipe_idx].strip()
            translation = line[pipe_idx + 1:].strip()

            if keyword and translation:
                keywords.append((keyword, translation))

    print(f"Loaded {len(keywords)} entries")
    return keywords

# ========== Safe Replacement ==========
# ONLY replace description:"keyword" and description:`keyword` patterns
# This is the ONLY safe way to localize - description fields are display-only text
def safe_replace(content, keyword, translation):
    """Replace ONLY description:'keyword' patterns (safe, won't break code)"""
    count = 0
    escaped = re.escape(keyword)

    # Replace description:"keyword" (double-quoted description values)
    pattern_double = r'(description:")(' + escaped + r')(")'
    content, n = re.subn(pattern_double, r'\g<1>' + translation + r'\g<3>', content)
    count += n

    # Replace description:`keyword` (template literal description values)
    pattern_tmpl = r'(description:`)(' + escaped + r')(`)'
    content, n = re.subn(pattern_tmpl, r'\g<1>' + translation + r'\g<3>', content)
    count += n

    return content, count

# ========== Create Backup ==========
def create_backup(cli_path, cli_bak):
    """Create backup of original CLI"""
    if not os.path.exists(cli_bak):
        shutil.copy(cli_path, cli_bak)
        print(f"{GREEN}OK: Backup created{NC}")
    else:
        print(f"{YELLOW}Info: Backup exists, skipping{NC}")

# ========== Execute Localization ==========
def do_localize(cli_path, cli_bak, keywords):
    """Execute safe localization"""
    # Restore from backup first
    if os.path.exists(cli_bak):
        shutil.copy(cli_bak, cli_path)
    else:
        print(f"{RED}Error: Backup not found{NC}")
        sys.exit(1)

    with open(cli_path, 'r', encoding='utf-8') as f:
        content = f.read()

    total_replacements = 0
    processed = 0
    print(f"\n{MAGENTA}Starting localization... ({len(keywords)} entries){NC}")
    print("")

    for keyword, translation in keywords:
        content, count = safe_replace(content, keyword, translation)
        if count > 0:
            total_replacements += count
            processed += 1
            print(f"  {GREEN}+{NC} {keyword} {YELLOW}->{NC} {translation}")

    with open(cli_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"\n{MAGENTA}Localization complete! {processed} entries, {total_replacements} replacements{NC}")
    print(f"{YELLOW}Info: Restart Claude Code to take effect{NC}")

# ========== Restore English ==========
def restore_english(cli_path, cli_bak):
    """Restore original English interface"""
    if not os.path.exists(cli_bak):
        print(f"{YELLOW}Info: Backup not found, may not have been localized{NC}")
        return

    shutil.copy(cli_bak, cli_path)
    print(f"{GREEN}OK: English interface restored{NC}")
    print(f"{YELLOW}Info: Restart Claude Code to take effect{NC}")

# ========== Main ==========
def main():
    print(f"{MAGENTA}=============================================={NC}")
    print(f"{MAGENTA}     Claude Code Localization Tool{NC}")
    print(f"{MAGENTA}=============================================={NC}")
    print("")

    keyword_file = os.path.join(SCRIPT_DIR, "keyword.conf")

    # Get CLI path
    cli_path, cli_bak = get_cli_paths()
    print(f"{GREEN}Path: {cli_path}{NC}")
    print("")

    # Check restore mode
    if len(sys.argv) > 1 and sys.argv[1] == '--restore':
        restore_english(cli_path, cli_bak)
        return

    # Create backup
    create_backup(cli_path, cli_bak)

    # Load keywords
    keywords = load_keywords(keyword_file)

    # Execute localization
    do_localize(cli_path, cli_bak, keywords)

if __name__ == "__main__":
    main()
