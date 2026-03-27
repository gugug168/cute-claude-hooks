# cute-claude-hooks 安装脚本 - Gitee 镜像 (Windows PowerShell)
# 使用方法: irm https://gitee.com/你的用户名/cute-claude-hooks/raw/main/install-gitee.ps1 | iex

$HooksDir = "$env:USERPROFILE\.claude\hooks"
$SettingsFile = "$env:USERPROFILE\.claude\settings.json"
$ScriptURL = "https://gitee.com/你的用户名/cute-claude-hooks/raw/main/tool-tips-post.sh"

Write-Host "🌸 Cute Claude Hooks 安装程序 (Gitee 镜像)" -ForegroundColor Magenta
Write-Host "============================================"

# 创建 hooks 目录
if (-not (Test-Path $HooksDir)) {
    New-Item -ItemType Directory -Path $HooksDir -Force | Out-Null
    Write-Host "✅ 创建目录: $HooksDir" -ForegroundColor Green
}

# 下载脚本
Write-Host "📥 下载 Hook 脚本..."
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $ScriptURL -OutFile "$HooksDir\tool-tips-post.sh" -UseBasicParsing
    Write-Host "✅ 下载完成" -ForegroundColor Green
} catch {
    Write-Host "❌ 下载失败: $_" -ForegroundColor Red
    exit 1
}

# 更新 settings.json
if (Test-Path $SettingsFile) {
    $settings = Get-Content $SettingsFile | ConvertFrom-Json

    if (-not $settings.hooks) {
        $settings | Add-Member -MemberType NoteProperty -Name "hooks" -Value @{} -Force
    }
    if (-not $settings.hooks.PostToolUse) {
        $settings.hooks | Add-Member -MemberType NoteProperty -Name "PostToolUse" -Value @() -Force
    }

    $exists = $settings.hooks.PostToolUse | Where-Object { $_.matcher -eq "Bash|Read|Write|Edit|Glob|Grep|mcp__*" }
    if (-not $exists) {
        $settings.hooks.PostToolUse += @{
            matcher = "Bash|Read|Write|Edit|Glob|Grep|mcp__*"
            hooks = @(
                @{
                    type = "command"
                    command = "bash $HooksDir\tool-tips-post.sh"
                }
            )
        }
        $settings | ConvertTo-Json -Depth 10 | Set-Content $SettingsFile -Encoding utf8
        Write-Host "✅ 更新配置: settings.json" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  Hook 已存在，跳过配置" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  未找到 settings.json" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🌸 安装完成！重启 Claude Code 即可生效" -ForegroundColor Magenta
