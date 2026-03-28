#!/usr/bin/env node
/**
 * Unit tests for safe description-only replacement logic
 * Verifies that localization ONLY replaces description:"..." fields
 * and does NOT break === comparisons, ternary expressions, case statements, etc.
 */

const assert = require('assert');

// ========== Import safe_replace from localize.js ==========
// We inline the function since localize.js modifies files directly
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function safeReplace(src, keyword, translation) {
    let count = 0;
    const escaped = escapeRegex(keyword);
    const descDoubleRegex = new RegExp(`(description:")(${escaped})(")`, 'g');
    src = src.replace(descDoubleRegex, (match, prefix, content, suffix) => {
        count++;
        return `${prefix}${translation}${suffix}`;
    });
    const descTmplRegex = new RegExp(`(description:\`)(${escaped})(\`)`, 'g');
    src = src.replace(descTmplRegex, (match, prefix, content, suffix) => {
        count++;
        return `${prefix}${translation}${suffix}`;
    });
    return { src, count };
}

// ========== Test Cases ==========
let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        passed++;
        console.log(`  \x1b[32mPASS\x1b[0m ${name}`);
    } catch (err) {
        failed++;
        console.log(`  \x1b[31mFAIL\x1b[0m ${name}`);
        console.log(`       ${err.message}`);
    }
}

console.log('\n\x1b[95m=== Safe Replace Unit Tests ===\x1b[0m\n');

// ===== SHOULD replace (description fields) =====

test('Replaces description:"keyword" with translation', () => {
    const src = 'description:"Cancel"';
    const { src: result, count } = safeReplace(src, 'Cancel', '取消');
    assert.strictEqual(result, 'description:"取消"');
    assert.strictEqual(count, 1);
});

test('Replaces description:`keyword` (template literal)', () => {
    const src = 'description:`Cancel`';
    const { src: result, count } = safeReplace(src, 'Cancel', '取消');
    assert.strictEqual(result, 'description:`取消`');
    assert.strictEqual(count, 1);
});

test('Replaces multiple occurrences in description fields', () => {
    const src = 'description:"Cancel" other stuff description:"Cancel"';
    const { src: result, count } = safeReplace(src, 'Cancel', '取消');
    assert.strictEqual(result, 'description:"取消" other stuff description:"取消"');
    assert.strictEqual(count, 2);
});

test('Replaces long multi-word descriptions', () => {
    const src = 'description:"Enter to submit · Esc to cancel"';
    const { src: result, count } = safeReplace(src, 'Enter to submit · Esc to cancel', 'Enter 提交 · Esc 取消');
    assert.strictEqual(result, 'description:"Enter 提交 · Esc 取消"');
    assert.strictEqual(count, 1);
});

test('Replaces description with special regex chars', () => {
    const src = 'description:"Fast mode (${Ok} only)"';
    const { src: result, count } = safeReplace(src, 'Fast mode (${Ok} only)', '快速模式（仅限 ${Ok}）');
    assert.strictEqual(result, 'description:"快速模式（仅限 ${Ok}）"');
    assert.strictEqual(count, 1);
});

// ===== SHOULD NOT replace (code logic) =====

test('Does NOT replace === comparison', () => {
    const src = 'if(M6==="Language")return"en"';
    const { src: result, count } = safeReplace(src, 'Language', '语言');
    assert.strictEqual(result, 'if(M6==="Language")return"en"');
    assert.strictEqual(count, 0);
});

test('Does NOT replace ternary expression', () => {
    const src = 'C6==="enable"?"Enabled":"Disabled"';
    const { src: result, count } = safeReplace(src, 'Enabled', '已启用');
    assert.strictEqual(result, 'C6==="enable"?"Enabled":"Disabled"');
    assert.strictEqual(count, 0);
});

test('Does NOT replace standalone quoted string', () => {
    const src = 'label:"Cancel"';
    const { src: result, count } = safeReplace(src, 'Cancel', '取消');
    assert.strictEqual(result, 'label:"Cancel"');
    assert.strictEqual(count, 0);
});

test('Does NOT replace variable name', () => {
    const src = 'const Cancel = document.getElementById("cancel")';
    const { src: result, count } = safeReplace(src, 'Cancel', '取消');
    assert.strictEqual(result, 'const Cancel = document.getElementById("cancel")');
    assert.strictEqual(count, 0);
});

test('Does NOT replace string in array', () => {
    const src = '["Cancel","Back","Submit"]';
    const { src: result, count } = safeReplace(src, 'Cancel', '取消');
    assert.strictEqual(result, '["Cancel","Back","Submit"]');
    assert.strictEqual(count, 0);
});

test('Does NOT replace object key value', () => {
    const src = 'name:"Cancel",value:"cancel"';
    const { src: result, count } = safeReplace(src, 'Cancel', '取消');
    assert.strictEqual(result, 'name:"Cancel",value:"cancel"');
    assert.strictEqual(count, 0);
});

test('Does NOT replace in switch case', () => {
    const src = 'case"Cancel":handleCancel();break';
    const { src: result, count } = safeReplace(src, 'Cancel', '取消');
    assert.strictEqual(result, 'case"Cancel":handleCancel();break');
    assert.strictEqual(count, 0);
});

test('Does NOT replace in function call argument', () => {
    const src = 't("Cancel")';
    const { src: result, count } = safeReplace(src, 'Cancel', '取消');
    assert.strictEqual(result, 't("Cancel")');
    assert.strictEqual(count, 0);
});

test('Does NOT replace in property assignment', () => {
    const src = 'title="Cancel";';
    const { src: result, count } = safeReplace(src, 'Cancel', '取消');
    assert.strictEqual(result, 'title="Cancel";');
    assert.strictEqual(count, 0);
});

// ===== EDGE CASES =====

test('Empty input returns unchanged', () => {
    const { src: result, count } = safeReplace('', 'Cancel', '取消');
    assert.strictEqual(result, '');
    assert.strictEqual(count, 0);
});

test('No match returns unchanged', () => {
    const src = 'description:"Something Else"';
    const { src: result, count } = safeReplace(src, 'Cancel', '取消');
    assert.strictEqual(result, 'description:"Something Else"');
    assert.strictEqual(count, 0);
});

test('Similar prefix does not false match', () => {
    const src = 'description:"Cancel" description:"Cancel item"';
    const { src: result, count } = safeReplace(src, 'Cancel', '取消');
    assert.strictEqual(count, 1);
    assert(result.includes('description:"取消"'));
    assert(result.includes('description:"Cancel item"'));
});

// ===== REAL-WORLD CLUSTER TEST =====

test('Real minified code cluster: only description: gets replaced', () => {
    const src = `M6==="Language"?M6:void 0;description:"Language"===g6?g6:void 0;name:"Language"`;
    const { src: result, count } = safeReplace(src, 'Language', '语言');
    // Only description:"Language" should be replaced
    assert.strictEqual(count, 1);
    assert(result.includes('M6==="Language"'));       // NOT replaced
    assert(result.includes('description:"语言"'));      // replaced
    assert(result.includes('name:"Language"'));       // NOT replaced
});

// ========== Summary ==========
console.log(`\n\x1b[95m=== Results ===\x1b[0m`);
console.log(`  Passed: ${passed}`);
console.log(`  Failed: ${failed}`);

if (failed > 0) {
    console.log('\n\x1b[31mTESTS FAILED!\x1b[0m');
    process.exit(1);
} else {
    console.log('\n\x1b[32mAll tests passed!\x1b[0m\n');
}
