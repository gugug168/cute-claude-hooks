# localize.ps1 - Claude Code Interface Localization Script (Windows PowerShell)
# Source: Based on mine-auto-cli (https://github.com/biaov/mine-auto-cli)
# License: MIT

param(
    [switch]$Restore
)

$ErrorActionPreference = "Stop"
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# ========== Color Functions ==========
function Write-Pink { param($text) Write-Host $text -ForegroundColor Magenta }
function Write-Green { param($text) Write-Host $text -ForegroundColor Green }
function Write-Red { param($text) Write-Host $text -ForegroundColor Red }
function Write-Yellow { param($text) Write-Host $text -ForegroundColor Yellow }

# ========== Get Claude Code CLI Path ==========
function Get-CliPath {
    $pkgname = "@anthropic-ai/claude-code"
    $npmRoot = npm root -g 2>$null

    if (-not $npmRoot) {
        Write-Red "ERROR: Cannot get npm global directory"
        exit 1
    }

    $cliPath = Join-Path $npmRoot "$pkgname\cli.js"
    $cliBak = Join-Path $npmRoot "$pkgname\cli.bak.js"

    if (-not (Test-Path $cliPath)) {
        Write-Red "ERROR: Claude Code CLI not found. Please install: npm install -g @anthropic-ai/claude-code"
        exit 1
    }

    return @{ Path = $cliPath; Backup = $cliBak }
}

# ========== Create Backup ==========
function New-Backup {
    param($cliPath, $cliBak)

    if (-not (Test-Path $cliBak)) {
        Copy-Item $cliPath $cliBak
        Write-Green "OK: Backup created: cli.bak.js"
    } else {
        Write-Yellow "INFO: Backup already exists, skipping"
    }
}

# ========== Execute Localization (Safe: description-only replacement) ==========
function Invoke-Localize {
    param($cliPath, $keywordFile)

    $content = Get-Content $cliPath -Raw -Encoding UTF8
    $totalReplacements = 0
    $processedCount = 0

    Write-Pink "Starting safe localization (description-only)..."
    Write-Host ""

    # Read keyword configuration
    $keywords = Get-Content $keywordFile -Encoding UTF8 | Where-Object {
        $_ -and -not $_.StartsWith("#") -and $_.Contains("|")
    }

    foreach ($line in $keywords) {
        $pipeIdx = $line.IndexOf("|")
        if ($pipeIdx -lt 1) { continue }

        $keyword = $line.Substring(0, $pipeIdx).Trim()
        $translation = $line.Substring($pipeIdx + 1).Trim()

        if ([string]::IsNullOrEmpty($keyword)) { continue }

        # Escape regex special characters
        $escaped = [regex]::Escape($keyword)

        # SAFE: Only replace description:"keyword" and description:`keyword` patterns
        # This avoids breaking code logic (=== comparisons, ternary expressions, etc.)
        $matchCount = 0

        # Pattern 1: description:"keyword" (double-quoted description values)
        $patternDouble = "(description:`")(" + $escaped + ")(`")"
        $matches = [regex]::Matches($content, $patternDouble)
        $matchCount += $matches.Count
        $content = $content -replace $patternDouble, "`${1}$translation`${3}"

        # Pattern 2: description:`keyword` (template literal description values)
        $patternTmpl = "(description:`)(" + $escaped + ")(`)"
        $matches = [regex]::Matches($content, $patternTmpl)
        $matchCount += $matches.Count
        $content = $content -replace $patternTmpl, "`${1}$translation`${3}"

        if ($matchCount -gt 0) {
            $totalReplacements += $matchCount
            $processedCount++
            Write-Host "  " -NoNewline
            Write-Green "+" -NoNewline
            Write-Host " $keyword " -NoNewline
            Write-Yellow "->" -NoNewline
            Write-Host " $translation"
        }
    }

    # Save file with UTF8 without BOM
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($cliPath, $content, $utf8NoBom)

    Write-Host ""
    Write-Pink "Localization complete! $processedCount entries, $totalReplacements replacements"
    Write-Yellow "INFO: Restart Claude Code to take effect"
}

# ========== Restore English ==========
function Restore-English {
    param($cliPath, $cliBak)

    if (-not (Test-Path $cliBak)) {
        Write-Yellow "INFO: Backup not found, may not have been localized"
        return
    }

    Copy-Item $cliBak $cliPath -Force
    Write-Green "OK: English interface restored"
    Write-Yellow "INFO: Restart Claude Code to take effect"
}

# ========== Main Function ==========
function Main {
    Write-Pink "=============================================="
    Write-Pink "  Claude Code Interface Localization Tool"
    Write-Pink "=============================================="
    Write-Host ""

    # Use $PSScriptRoot or current directory
    $scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Get-Location }
    $keywordFile = Join-Path $scriptDir "keyword.conf"

    # Check keyword file
    if (-not (Test-Path $keywordFile)) {
        Write-Red "ERROR: Keyword config file not found: $keywordFile"
        exit 1
    }

    # Get CLI path
    $paths = Get-CliPath
    $cliPath = $paths.Path
    $cliBak = $paths.Backup

    Write-Green "Claude Code path: $cliPath"
    Write-Host ""

    if ($Restore) {
        Restore-English $cliPath $cliBak
    } else {
        New-Backup $cliPath $cliBak

        # Restore from backup then localize
        if (Test-Path $cliBak) {
            Copy-Item $cliBak $cliPath -Force
        }

        Invoke-Localize $cliPath $keywordFile
    }
}

Main
