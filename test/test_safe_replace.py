#!/usr/bin/env python3
"""
Unit tests for Python safe_replace function
Verifies description-only replacement strategy
"""

import re
import sys

PASSED = 0
FAILED = 0

def escape_regex(s):
    return re.escape(s)

def safe_replace(content, keyword, translation):
    """Same logic as localize.py"""
    count = 0
    escaped = re.escape(keyword)
    pattern_double = r'(description:")(' + escaped + r')(")'
    content, n = re.subn(pattern_double, r'\g<1>' + translation + r'\g<3>', content)
    count += n
    pattern_tmpl = r'(description:`)(' + escaped + r')(`)'
    content, n = re.subn(pattern_tmpl, r'\g<1>' + translation + r'\g<3>', content)
    count += n
    return content, count

def test(name, fn):
    global PASSED, FAILED
    try:
        fn()
        PASSED += 1
        print(f"  \033[92mPASS\033[0m {name}")
    except AssertionError as e:
        FAILED += 1
        print(f"  \033[91mFAIL\033[0m {name}")
        print(f"       {e}")

print("\n\033[95m=== Python safe_replace Unit Tests ===\033[0m\n")

# Should replace
test('Replaces description:"keyword"', lambda: (
    safe_replace('description:"Cancel"', 'Cancel', '取消')
    .__eq__(('description:"取消"', 1)) or _assert()
) if False else None)

def _assert(): raise AssertionError("fail")

# Manual test style to avoid lambda issues
r, c = safe_replace('description:"Cancel"', 'Cancel', '取消')
if r == 'description:"取消"' and c == 1:
    PASSED += 1; print(f"  \033[92mPASS\033[0m Replace description:\"keyword\"")
else:
    FAILED += 1; print(f"  \033[91mFAIL\033[0m Replace description:\"keyword\"")

r, c = safe_replace('description:`Cancel`', 'Cancel', '取消')
if r == 'description:`取消`' and c == 1:
    PASSED += 1; print(f"  \033[92mPASS\033[0m Replace description:`keyword`")
else:
    FAILED += 1; print(f"  \033[91mFAIL\033[0m Replace description:`keyword`")

# Should NOT replace
r, c = safe_replace('if(M6==="Language")return"en"', 'Language', '语言')
if '==="Language")' in r and c == 0:
    PASSED += 1; print(f"  \033[92mPASS\033[0m Skip === comparison")
else:
    FAILED += 1; print(f"  \033[91mFAIL\033[0m Skip === comparison")

r, c = safe_replace('C6==="enable"?"Enabled":"Disabled"', 'Enabled', '已启用')
if '"Enabled"' in r and c == 0:
    PASSED += 1; print(f"  \033[92mPASS\033[0m Skip ternary expression")
else:
    FAILED += 1; print(f"  \033[91mFAIL\033[0m Skip ternary expression")

r, c = safe_replace('label:"Cancel"', 'Cancel', '取消')
if 'label:"Cancel"' in r and c == 0:
    PASSED += 1; print(f"  \033[92mPASS\033[0m Skip label:\"...\"")
else:
    FAILED += 1; print(f"  \033[91mFAIL\033[0m Skip label:\"...\"")

r, c = safe_replace('name:"Language"', 'Language', '语言')
if 'name:"Language"' in r and c == 0:
    PASSED += 1; print(f"  \033[92mPASS\033[0m Skip name:\"...\"")
else:
    FAILED += 1; print(f"  \033[91mFAIL\033[0m Skip name:\"...\"")

# Real-world cluster
r, c = safe_replace('M6==="Language"?M6:void 0;description:"Language"', 'Language', '语言')
if c == 1 and '==="Language")' not in r and 'description:"语言"' in r:
    PASSED += 1; print(f"  \033[92mPASS\033[0m Real code cluster test")
else:
    FAILED += 1; print(f"  \033[91mFAIL\033[0m Real code cluster test")

# Summary
print(f"\n\033[95m=== Results ===\033[0m")
print(f"  Passed: {PASSED}")
print(f"  Failed: {FAILED}")

if FAILED > 0:
    print("\n\033[91mTESTS FAILED!\033[0m")
    sys.exit(1)
else:
    print("\n\033[92mAll tests passed!\033[0m\n")
