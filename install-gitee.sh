#!/bin/bash
# cute-claude-hooks 安装脚本 - Gitee 镜像 (国内用户)
# 使用方法: curl -fsSL https://gitee.com/你的用户名/cute-claude-hooks/raw/main/install.sh | bash

set -e

HOOKS_DIR="$HOME/.claude/hooks"
SETTINGS_FILE="$HOME/.claude/settings.json"
SCRIPT_URL="https://gitee.com/你的用户名/cute-claude-hooks/raw/main/tool-tips-post.sh"

echo "🌸 Cute Claude Hooks 安装程序 (Gitee 镜像)"
echo "============================================"

# 创建 hooks 目录
if [ ! -d "$HOOKS_DIR" ]; then
    mkdir -p "$HOOKS_DIR"
    echo "✅ 创建目录: $HOOKS_DIR"
fi

# 下载脚本
echo "📥 下载 Hook 脚本..."
if command -v curl &> /dev/null; then
    curl -fsSL "$SCRIPT_URL" -o "$HOOKS_DIR/tool-tips-post.sh"
elif command -v wget &> /dev/null; then
    wget -q "$SCRIPT_URL" -O "$HOOKS_DIR/tool-tips-post.sh"
else
    echo "❌ 需要 curl 或 wget"
    exit 1
fi

# 设置执行权限
chmod +x "$HOOKS_DIR/tool-tips-post.sh"
echo "✅ 安装脚本: $HOOKS_DIR/tool-tips-post.sh"

# 更新 settings.json
if [ -f "$SETTINGS_FILE" ]; then
    if grep -q "tool-tips-post.sh" "$SETTINGS_FILE"; then
        echo "ℹ️  Hook 已配置，跳过"
    else
        if command -v python3 &> /dev/null; then
            python3 << 'EOF'
import json
import os

settings_file = os.path.expanduser("~/.claude/settings.json")
with open(settings_file, 'r', encoding='utf-8') as f:
    settings = json.load(f)

if 'hooks' not in settings:
    settings['hooks'] = {}
if 'PostToolUse' not in settings['hooks']:
    settings['hooks']['PostToolUse'] = []

exists = any(h.get('matcher') == 'Bash|Read|Write|Edit|Glob|Grep|mcp__*'
             for h in settings['hooks']['PostToolUse'])

if not exists:
    settings['hooks']['PostToolUse'].append({
        "matcher": "Bash|Read|Write|Edit|Glob|Grep|mcp__*",
        "hooks": [{
            "type": "command",
            "command": f"bash {os.path.expanduser('~/.claude/hooks/tool-tips-post.sh')}"
        }]
    })
    with open(settings_file, 'w', encoding='utf-8') as f:
        json.dump(settings, f, indent=2, ensure_ascii=False)
    print("✅ 更新配置: settings.json")
else:
    print("ℹ️  配置已存在")
EOF
        else
            echo "⚠️  请手动添加配置到 settings.json"
        fi
    fi
else
    echo "⚠️  未找到 settings.json，请手动配置"
fi

echo ""
echo "🌸 安装完成！重启 Claude Code 即可生效"
