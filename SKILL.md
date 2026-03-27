---
name: cute-claude-hooks (可爱提示钩子)
description: 为 Claude Code 添加粉色中文工具提示。包含完整的自定义指南、实战经验和进阶开发教程，让用户能够根据自己的需求修改和完善。
---

# 🌸 Cute Claude Hooks - 完整指南

让 Claude Code 的工具操作显示可爱的中文提示！

---

## 📚 目录

1. [快速安装](#-快速安装)
2. [基础自定义](#-基础自定义)
3. [进阶自定义](#-进阶自定义)
4. [添加新功能](#-添加新功能)
5. [调试技巧](#-调试技巧)
6. [实战经验](#-实战经验)
7. [常见需求示例](#-常见需求示例)
8. [问题排查](#-问题排查)

---

## 🚀 快速安装

### 方式一：GitHub（推荐）

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/your-username/cute-claude-hooks/main/install.ps1 | iex
```

**macOS/Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/your-username/cute-claude-hooks/main/install.sh | bash
```

### 方式二：Gitee 镜像（国内用户推荐）

如果无法访问 GitHub，使用 Gitee 镜像：

**Windows (PowerShell):**
```powershell
irm https://gitee.com/your-username/cute-claude-hooks/raw/main/install-gitee.ps1 | iex
```

**macOS/Linux:**
```bash
curl -fsSL https://gitee.com/your-username/cute-claude-hooks/raw/main/install-gitee.sh | bash
```

### 方式三：手动安装

**步骤1：创建目录**
```bash
# Windows (PowerShell)
mkdir -Force "$env:USERPROFILE\.claude\hooks"

# macOS/Linux
mkdir -p ~/.claude/hooks
```

**步骤2：下载脚本**

从以下任一地址下载 `tool-tips-post.sh`：

| 镜像 | 地址 |
|------|------|
| GitHub | `https://raw.githubusercontent.com/your-username/cute-claude-hooks/main/tool-tips-post.sh` |
| Gitee | `https://gitee.com/your-username/cute-claude-hooks/raw/main/tool-tips-post.sh` |
| JsDelivr | `https://cdn.jsdelivr.net/gh/your-username/cute-claude-hooks@main/tool-tips-post.sh` |

**步骤3：添加配置**

在 `~/.claude/settings.json` 中添加：
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash|Read|Write|Edit|Glob|Grep|mcp__*",
        "hooks": [{ "type": "command", "command": "bash ~/.claude/hooks/tool-tips-post.sh" }]
      }
    ]
  }
}
```

### 🌐 可用的 CDN/镜像地址

| 镜像 | 速度 | 可用性 | 推荐场景 |
|------|------|--------|----------|
| **GitHub** | 国外快 | ⭐⭐⭐ | 海外用户 |
| **Gitee** | 国内快 | ⭐⭐⭐ | 国内用户首选 |
| **JsDelivr** | 全球CDN | ⭐⭐ | 备用方案 |
| **FastGit** | 较快 | ⭐ | GitHub镜像 |

**JsDelivr 格式：**
```
https://cdn.jsdelivr.net/gh/用户名/仓库名@分支/文件路径
```

---

## 🎨 基础自定义

安装后，编辑 `~/.claude/hooks/tool-tips-post.sh` 文件。

### 1. 修改颜色

找到脚本末尾的颜色代码：
```bash
printf '\033[38;5;206m🌸 小白提示：%s 🌸\033[0m\n' "$tip" >&2
```

**颜色代码对照表：**

| 代码 | 颜色 | 效果 |
|------|------|------|
| 196 | 🔴 红色 | 错误/警告 |
| 208 | 🟠 橙色 | 提醒 |
| 226 | 🟡 黄色 | 注意 |
| 46  | 🟢 绿色 | 成功 |
| 51  | 🔵 青色 | 信息 |
| 33  | 🔵 蓝色 | 链接 |
| 201 | 🟣 紫色 | 特殊 |
| 206 | 🩷 粉色 | 可爱（默认） |
| 255 | ⚪ 白色 | 简洁 |

**也可以使用基本颜色：**
```bash
# 使用基本 ANSI 颜色
\033[31m  # 红色
\033[32m  # 绿色
\033[33m  # 黄色
\033[34m  # 蓝色
\033[35m  # 紫色
\033[36m  # 青色
\033[37m  # 白色
\033[0m   # 重置
```

### 2. 修改 Emoji

在 `get_tip()` 函数的 `case` 语句中修改：

```bash
"Read")
    echo "📖 读取文件: $(short_path "$file_path")"
    ;;
```

**Emoji 速查表：**

| 工具 | 默认 | 备选1 | 备选2 | 备选3 |
|------|------|-------|-------|-------|
| Read | 📖 | 📚 | 📄 | 📑 |
| Write | 📝 | ✍️ | 📋 | 💾 |
| Edit | ✏️ | 🔧 | 🛠️ | ✂️ |
| Bash | 🖥️ | ⌨️ | 💻 | 🐚 |
| Glob | 🔍 | 📁 | 🗂️ | 📂 |
| Grep | 🔎 | 🔍 | 📊 | 🔬 |
| Agent | 🤖 | 🦾 | 🧠 | 👾 |
| Task | 📋 | ✅ | 🎯 | 📌 |

### 3. 修改提示文字

**多语言支持：**
```bash
"Read")
    # 中文（默认）
    echo "📖 读取文件: $(short_path "$file_path")"
    # 英文
    # echo "📖 Reading: $(short_path "$file_path")"
    # 日文
    # echo "📖 読み込み: $(short_path "$file_path")"
    # 韩文
    # echo "📖 읽기: $(short_path "$file_path")"
    ;;
```

**风格变化：**
```bash
# 详细版
echo "📖 正在读取文件: $(short_path "$file_path")"

# 简洁版
echo "📖 → $(short_path "$file_path")"

# 极简版
echo "📖 $(short_path "$file_path")"
```

### 4. 修改前缀/后缀

在脚本末尾找到输出行：

```bash
# 默认（带樱花装饰）
printf '\033[38;5;206m🌸 小白提示：%s 🌸\033[0m\n' "$tip" >&2

# 简洁版（无装饰）
printf '\033[38;5;206m%s\033[0m\n' "$tip" >&2

# 箭头版
printf '\033[38;5;206m→ %s\033[0m\n' "$tip" >&2

# 括号版
printf '\033[38;5;206m【%s】\033[0m\n' "$tip" >&2

# 时间戳版
printf '\033[38;5;206m[%s] %s\033[0m\n' "$(date '+%H:%M:%S')" "$tip" >&2

# 带日期版
printf '\033[38;5;206m[%s] %s\033[0m\n' "$(date '+%m-%d %H:%M')" "$tip" >&2
```

---

## 🔧 进阶自定义

### 1. 显示完整路径

找到 `short_path` 函数：

```bash
# 当前：只显示文件名
short_path() {
    echo "$1" | sed 's/.*[\\/]//' | head -c 50
}

# 改成：显示相对路径（用 ~ 替代 HOME）
short_path() {
    echo "$1" | sed "s|^$HOME|~|" | head -c 80
}

# 改成：显示完整路径（截断超长）
short_path() {
    echo "$1" | head -c 100
}

# 改成：只显示最后两级目录
short_path() {
    echo "$1" | sed 's/.*\/\([^/]*\/[^/]*\)$/\1/'
}
```

### 2. 区分成功/失败状态

在脚本开头的字段提取部分添加：

```bash
# 提取 tool_response（工具返回结果）
tool_response=$(echo "$input" | sed -n 's/.*"tool_response"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)
```

然后修改主逻辑：

```bash
# 主逻辑
if [ -n "$tool_name" ]; then
    tip=$(get_tip "$tool_name")

    # 检测是否包含错误关键词
    if echo "$tool_response" | grep -qiE "error|failed|exception|失败"; then
        printf '\033[38;5;196m❌ %s\033[0m\n' "$tip" >&2
    else
        printf '\033[38;5;206m🌸 %s 🌸\033[0m\n' "$tip" >&2
    fi
fi
```

### 3. 添加执行时间统计

```bash
# 在脚本开头记录开始时间
start_time=$(date +%s%N 2>/dev/null || date +%s)

# 在主逻辑中计算耗时
if [ -n "$tool_name" ]; then
    tip=$(get_tip "$tool_name")

    # 计算耗时（毫秒）
    end_time=$(date +%s%N 2>/dev/null || date +%s)
    if [ -n "$start_time" ] && [ -n "$end_time" ]; then
        duration=$(( (end_time - start_time) / 1000000 ))
        [ $duration -lt 0 ] && duration=0
        printf '\033[38;5;206m🌸 %s (%dms) 🌸\033[0m\n' "$tip" "$duration" >&2
    else
        printf '\033[38;5;206m🌸 %s 🌸\033[0m\n' "$tip" >&2
    fi
fi
```

### 4. 添加声音提示（可选）

```bash
# 在主逻辑末尾添加
if [ -n "$tool_name" ]; then
    tip=$(get_tip "$tool_name")
    printf '\033[38;5;206m🌸 %s 🌸\033[0m\n' "$tip" >&2

    # 只在特定情况下发声
    case "$tool_name" in
        "Agent"|"Skill")
            # macOS
            # afplay /System/Library/Sounds/Glass.aiff 2>/dev/null
            # Linux
            # paplay /usr/share/sounds/freedesktop/stereo/complete.oga 2>/dev/null
            # Windows（需要 PowerShell）
            # powershell -c "(New-Object Media.SoundPlayer 'C:\Windows\Media\notify.wav').PlaySync()" 2>/dev/null
            ;;
    esac
fi
```

---

## 🆕 添加新功能

### 1. 添加对新工具的支持

在 `case` 语句中添加新的分支：

```bash
# 添加对新工具的支持
"YourNewTool")
    echo "🆕 新工具完成"
    ;;

# 添加对带参数工具的支持
"CustomTool")
    # 如果需要提取额外参数
    local custom_param=$(echo "$input" | sed -n 's/.*"custom_param"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)
    if [ -n "$custom_param" ]; then
        echo "🔧 自定义: $custom_param"
    else
        echo "🔧 自定义工具完成"
    fi
    ;;
```

### 2. 添加对新的 MCP 服务支持

在 MCP 的 `case "$srv"` 中添加：

```bash
# 在 case "$srv" in 中添加
"your-mcp-service") echo "🎯 你的服务: $tool" ;;
```

**常见 MCP 服务配置：**

```bash
case "$srv" in
    # 文档类
    "context7") echo "📚 文档: $tool" ;;
    "deepwiki") echo "📖 Wiki: $tool" ;;

    # 搜索类
    "exa") echo "🔍 Exa: $tool" ;;
    "brave-search") echo "🔎 Brave: $tool" ;;

    # 浏览器类
    "Playwright") echo "🎭 浏览器: $tool" ;;
    "puppeteer") echo "🎭 Puppeteer: $tool" ;;

    # 记忆类
    "basic-memory") echo "🧠 记忆: $tool" ;;
    "mem0") echo "💾 Mem0: $tool" ;;

    # 协作类
    "lark-mcp") echo "📱 飞书: $tool" ;;
    "slack") echo "💬 Slack: $tool" ;;
    "discord") echo "🎮 Discord: $tool" ;;

    # 其他
    "web_reader") echo "📖 网页: $tool" ;;
    "filesystem") echo "📁 文件: $tool" ;;
    "github") echo "🐙 GitHub: $tool" ;;

    # 未知服务
    *) echo "🔌 $srv: $tool" ;;
esac
```

### 3. 添加配置文件支持

创建配置文件 `~/.claude/hooks/tool-tips.conf`：

```bash
# tool-tips.conf - 配置文件
COLOR_CODE=206
PREFIX="🌸 小白提示："
SUFFIX="🌸"
SHOW_TIME=false
SHOW_DURATION=false
```

然后在脚本中读取配置：

```bash
# 读取配置文件
CONFIG_FILE="$HOME/.claude/hooks/tool-tips.conf"
if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
fi

# 使用配置变量
COLOR="${COLOR_CODE:-206}"
PRE="${PREFIX:-🌸 }"
SUF="${SUFFIX:- 🌸}"

# 输出
printf "\033[38;5;%sm%s%s%s\033[0m\n" "$COLOR" "$PRE" "$tip" "$SUF" >&2
```

---

## 🐛 调试技巧

### 1. 启用调试日志

在脚本开头添加：

```bash
# 调试开关（设为 true 启用）
DEBUG=true
DEBUG_LOG="/tmp/tool-tips-debug.log"

debug_log() {
    if [ "$DEBUG" = true ]; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$DEBUG_LOG" 2>/dev/null
    fi
}

# 记录输入
debug_log "收到输入: $(echo "$input" | head -c 200)"

# 记录提取结果
debug_log "tool_name=$tool_name, file_path=$file_path"
```

### 2. 单独测试脚本

```bash
# 测试 Read 工具
echo '{"tool_name": "Read", "file_path": "test.md"}' | bash ~/.claude/hooks/tool-tips-post.sh

# 测试 MCP 工具
echo '{"tool_name": "mcp__context7__get-docs"}' | bash ~/.claude/hooks/tool-tips-post.sh

# 测试 Bash 命令
echo '{"tool_name": "Bash", "description": "测试命令"}' | bash ~/.claude/hooks/tool-tips-post.sh
```

### 3. 检查语法错误

```bash
# 检查脚本语法
bash -n ~/.claude/hooks/tool-tips-post.sh

# 如果有错误，会显示行号
```

### 4. 查看实际输出

```bash
# 直接运行脚本，查看原始输出
echo '{"tool_name": "Read", "file_path": "test.md"}' | bash ~/.claude/hooks/tool-tips-post.sh 2>&1 | cat -A
```

---

## 📖 实战经验

### 我们尝试过的功能

#### ✅ 成功的实现

| 功能 | 实现方式 | 效果 |
|------|----------|------|
| 粉色中文提示 | `\033[38;5;206m` + stderr | 显示正常 |
| 路径简化 | `sed 's/.*[\\/]//'` | 只显示文件名 |
| Bash 描述 | 优先使用 description 字段 | 更友好的提示 |
| MCP 工具识别 | 解析 `mcp__服务名__工具名` | 显示具体服务 |
| Emoji 显示 | UTF-8 编码 | 各终端兼容 |

#### ❌ 尝试过但放弃的功能

| 功能 | 问题 | 原因 |
|------|------|------|
| **显示行数** | tool_response 是转义的 JSON | 格式多变，解析不稳定 |
| **显示文件数量** | Glob 返回纯文本，路径格式不统一 | Windows/Linux 路径不同 |
| **stdout + exit 0** | 输出不显示 | 必须用 stderr + exit 2 |
| **从响应提取匹配数** | JSON 转义导致 sed 失败 | 过于复杂 |
| **实时进度显示** | hook 只执行一次 | 无法持续更新 |

### 为什么选择 stderr + exit 2？

我们测试了多种方案：

```
方案1: stdout + exit 0   → ❌ 不显示
方案2: stdout + exit 1   → ⚠️ 显示但带 "blocking error"
方案3: stderr + exit 2   → ✅ 正常显示
方案4: stderr + exit 0   → ❌ 不显示
```

**结论**：`stderr + exit 2` 是唯一可靠的方案。

---

## 💡 常见需求示例

### 需求1：只在长时间操作时显示提示

```bash
# 在主逻辑中添加判断
if [ -n "$tool_name" ]; then
    case "$tool_name" in
        # 这些工具总是显示
        "Bash"|"Agent"|"Skill")
            tip=$(get_tip "$tool_name")
            printf '\033[38;5;206m🌸 %s 🌸\033[0m\n' "$tip" >&2
            ;;
        # 其他工具不显示
        *)
            # 静默
            ;;
    esac
fi
```

### 需求2：不同工具用不同颜色

```bash
# 修改 get_tip 函数，返回颜色和提示
get_tip_with_color() {
    case "$1" in
        "Read"|"Write"|"Edit")
            echo "206|📖 文件操作: $(short_path "$file_path")"
            ;;
        "Bash")
            echo "226|🖥️ 命令: $bash_desc"
            ;;
        "Agent"|"Skill")
            echo "46|🤖 AI 操作完成"
            ;;
        "Glob"|"Grep")
            echo "51|🔍 搜索完成"
            ;;
        *)
            echo "206|✅ $1 完成"
            ;;
    esac
}

# 主逻辑
if [ -n "$tool_name" ]; then
    result=$(get_tip_with_color "$tool_name")
    color=$(echo "$result" | cut -d'|' -f1)
    tip=$(echo "$result" | cut -d'|' -f2-)
    printf '\033[38;5;%sm🌸 %s 🌸\033[0m\n' "$color" "$tip" >&2
fi
```

### 需求3：累计统计今日操作次数

```bash
# 统计文件路径
STATS_FILE="$HOME/.claude/hooks/tool-stats-$(date '+%Y-%m-%d').txt"

# 在主逻辑中添加
if [ -n "$tool_name" ]; then
    # 更新统计
    echo "$tool_name" >> "$STATS_FILE"
    count=$(grep -c "^$tool_name$" "$STATS_FILE" 2>/dev/null || echo "1")

    tip=$(get_tip "$tool_name")
    printf '\033[38;5;206m🌸 %s (今日第%d次) 🌸\033[0m\n' "$tip" "$count" >&2
fi
```

### 需求4：工作时间和休息时间不同提示

```bash
# 获取当前小时
hour=$(date '+%H')

# 根据时间选择前缀
get_prefix() {
    if [ "$hour" -ge 9 ] && [ "$hour" -lt 18 ]; then
        echo "💼 工作中"
    elif [ "$hour" -ge 18 ] && [ "$hour" -lt 22 ]; then
        echo "🌙 加班中"
    else
        echo "😴 休息时间"
    fi
}

# 主逻辑
if [ -n "$tool_name" ]; then
    tip=$(get_tip "$tool_name")
    prefix=$(get_prefix)
    printf '\033[38;5;206m[%s] 🌸 %s 🌸\033[0m\n' "$prefix" "$tip" >&2
fi
```

### 需求5：根据项目类型显示不同图标

```bash
# 检测项目类型
get_project_type() {
    local dir="${1%/*}"
    if [ -f "$dir/package.json" ]; then
        echo "📦 Node"
    elif [ -f "$dir/requirements.txt" ] || [ -f "$dir/pyproject.toml" ]; then
        echo "🐍 Python"
    elif [ -f "$dir/go.mod" ]; then
        echo "🐹 Go"
    elif [ -f "$dir/Cargo.toml" ]; then
        echo "🦀 Rust"
    else
        echo "📁 项目"
    fi
}

# 在 Read/Write/Edit 中使用
"Read")
    if [ -n "$file_path" ]; then
        ptype=$(get_project_type "$file_path")
        echo "📖 [$ptype] 读取: $(short_path "$file_path")"
    fi
    ;;
```

---

## ❓ 问题排查

### 问题1：提示完全不显示

**检查清单：**
```bash
# 1. 确认脚本存在
ls -la ~/.claude/hooks/tool-tips-post.sh

# 2. 确认有执行权限
chmod +x ~/.claude/hooks/tool-tips-post.sh

# 3. 检查语法
bash -n ~/.claude/hooks/tool-tips-post.sh

# 4. 手动测试
echo '{"tool_name": "Read"}' | bash ~/.claude/hooks/tool-tips-post.sh

# 5. 检查 settings.json 配置
cat ~/.claude/settings.json | grep -A10 "PostToolUse"
```

### 问题2：显示乱码

**解决方案：**
```bash
# 确保终端 UTF-8 编码
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# 在脚本开头添加
export LANG=en_US.UTF-8
```

### 问题3：部分工具没有提示

**检查 matcher 配置：**
```json
{
  "matcher": "Bash|Read|Write|Edit|Glob|Grep|mcp__*"
}
```

如果缺少某个工具，添加到 matcher 中，用 `|` 分隔。

### 问题4：修改后不生效

```bash
# 1. 确认修改已保存
cat ~/.claude/hooks/tool-tips-post.sh | grep "你的修改"

# 2. 重新测试
echo '{"tool_name": "Read"}' | bash ~/.claude/hooks/tool-tips-post.sh

# 3. 重启 Claude Code
# 退出当前会话，重新运行 claude
```

### 问题5：脚本执行很慢

**优化建议：**
```bash
# 1. 减少不必要的命令替换
# 慢：
result=$(echo "$input" | sed ... | grep ... | cut ...)

# 快：
result=$(echo "$input" | sed -n 's/.../p')

# 2. 避免重复计算
# 在脚本开头一次性提取所有字段

# 3. 使用内置字符串操作
# 慢：
echo "$str" | sed 's/old/new/'
# 快：
${str//old/new}
```

---

## 📁 文件位置速查

| 文件 | Windows | macOS/Linux |
|------|---------|-------------|
| Hook 脚本 | `%USERPROFILE%\.claude\hooks\tool-tips-post.sh` | `~/.claude/hooks/tool-tips-post.sh` |
| 配置文件 | `%USERPROFILE%\.claude\settings.json` | `~/.claude/settings.json` |
| 自定义配置 | `%USERPROFILE%\.claude\hooks\tool-tips.conf` | `~/.claude/hooks/tool-tips.conf` |
| 调试日志 | `%TEMP%\tool-tips-debug.log` | `/tmp/tool-tips-debug.log` |

---

## 🔄 恢复默认

如果改坏了，重新运行安装脚本：

```powershell
# Windows
irm https://raw.githubusercontent.com/your-username/cute-claude-hooks/main/install.ps1 | iex
```

```bash
# Linux/macOS
curl -fsSL https://raw.githubusercontent.com/your-username/cute-claude-hooks/main/install.sh | bash
```

---

## 📚 相关资源

- [GitHub 仓库](https://github.com/your-username/cute-claude-hooks)
- [问题反馈](https://github.com/your-username/cute-claude-hooks/issues)
- [Claude Code 文档](https://docs.anthropic.com/claude-code)
- [Bash 颜色参考](https://misc.flogisoft.com/bash/tip_colors_and_formatting)

---

**💡 最后建议**：保持简洁！我们尝试过添加行数统计、文件数量等复杂功能，但最终发现简单的提示反而更实用。过度复杂化会增加维护负担和出错概率。

**如果你有新的想法或改进，欢迎提交 PR！** 🌸
