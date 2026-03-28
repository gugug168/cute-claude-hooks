#!/bin/bash
# tool-tips-post.sh - 工具执行后粉色中文提示
# GitHub: https://github.com/your-username/cute-claude-hooks
# License: MIT

input=$(cat)

# 提取字段
tool_name=$(echo "$input" | sed -n 's/.*"tool_name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)
file_path=$(echo "$input" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1 | sed 's/\\\\/\\/g')
pattern=$(echo "$input" | sed -n 's/.*"pattern"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)
bash_desc=$(echo "$input" | sed -n 's/.*"description"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)
bash_cmd=$(echo "$input" | sed -n 's/.*"command"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)

# 路径简化：只显示文件名
short_path() {
    echo "$1" | sed 's/.*[\\/]//' | head -c 50
}

# 生成提示 - 可自定义 emoji 和文字
get_tip() {
    case "$1" in
        "Read")
            [ -n "$file_path" ] && echo "📖 读取文件: $(short_path "$file_path")" || echo "📖 读取完成"
            ;;
        "Write")
            [ -n "$file_path" ] && echo "📝 写入文件: $(short_path "$file_path")" || echo "📝 写入完成"
            ;;
        "Edit"|"MultiEdit")
            [ -n "$file_path" ] && echo "✏️ 编辑文件: $(short_path "$file_path")" || echo "✏️ 编辑完成"
            ;;
        "Bash")
            if [ -n "$bash_desc" ]; then
                echo "🖥️ $bash_desc"
            elif [ -n "$bash_cmd" ]; then
                c=$(echo "$bash_cmd" | head -c 25)
                [ ${#bash_cmd} -gt 25 ] && c="${c}..."
                echo "🖥️ 执行: $c"
            else
                echo "🖥️ 命令完成"
            fi
            ;;
        "Glob")
            [ -n "$pattern" ] && echo "🔍 搜索文件: \"$pattern\"" || echo "🔍 搜索完成"
            ;;
        "Grep")
            [ -n "$pattern" ] && echo "🔎 搜索内容: \"$pattern\"" || echo "🔎 搜索完成"
            ;;
        "Agent")
            echo "🤖 代理完成"
            ;;
        "Skill")
            echo "⚡ 技能完成"
            ;;
        "Task"|"TaskCreate"|"TaskUpdate"|"TaskGet"|"TaskList")
            echo "📋 任务完成"
            ;;
        "TodoWrite")
            echo "📋 待办更新"
            ;;
        *)
            if [[ "$1" == mcp__* ]]; then
                # 提取服务名和工具名
                local srv=$(echo "$1" | sed -n 's/mcp__\([^_]*\)__.*/\1/p')
                local tool=$(echo "$1" | sed 's/mcp__[^_]*__//')
                # 如果提取失败，显示原始名称
                if [ -z "$srv" ]; then
                    echo "🔌 $1"
                else
                    case "$srv" in
                        "context7") echo "📚 文档: $tool" ;;
                        "exa") echo "🔍 Exa: $tool" ;;
                        "basic-memory") echo "🧠 记忆: $tool" ;;
                        "Playwright") echo "🎭 浏览器: $tool" ;;
                        "lark-mcp") echo "📱 飞书: $tool" ;;
                        "web_reader") echo "📖 网页: $tool" ;;
                        *) echo "🔌 $srv: $tool" ;;
                    esac
                fi
            else
                echo "✅ $1 完成"
            fi
            ;;
    esac
}

# 主逻辑
if [ -n "$tool_name" ]; then
    tip=$(get_tip "$tool_name")
    printf '\033[38;5;206m🌸 小白提示：%s 🌸\033[0m\n' "$tip" >&2
fi

exit 2
