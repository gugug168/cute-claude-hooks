# 🌸 Cute Claude Hooks

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Compatible-orange.svg)](https://claude.ai/code)

让 Claude Code 工具操作更直观可爱的粉色中文提示！

## ✨ 特性

- 🎨 **粉色中文提示** - 操作一目了然
- 🖥️ **跨平台** - Windows/macOS/Linux 通用
- 📦 **轻量级** - 单文件，无依赖
- 🔧 **易自定义** - 完整的自定义指南
- 🇨🇳 **国内镜像** - 支持 Gitee 加速安装

## 📦 安装

### 方式一：GitHub（推荐）

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/your-username/cute-claude-hooks/main/install.ps1 | iex
```

**macOS/Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/your-username/cute-claude-hooks/main/install.sh | bash
```

### 方式二：Gitee 镜像（国内用户）

**Windows (PowerShell):**
```powershell
irm https://gitee.com/your-username/cute-claude-hooks/raw/main/install-gitee.ps1 | iex
```

**macOS/Linux:**
```bash
curl -fsSL https://gitee.com/your-username/cute-claude-hooks/raw/main/install-gitee.sh | bash
```

### 方式三：手动安装

1. 下载 `tool-tips-post.sh` 到 `~/.claude/hooks/`
2. 在 `~/.claude/settings.json` 中添加：
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

## 🎯 效果预览

| 工具 | 提示效果 |
|------|----------|
| Read | 🌸 小白提示：📖 读取文件: config.json 🌸 |
| Write | 🌸 小白提示：📝 写入文件: output.md 🌸 |
| Edit | 🌸 小白提示：✏️ 编辑文件: settings.json 🌸 |
| Bash | 🌸 小白提示：🖥️ 安装依赖包 🌸 |
| Glob | 🌸 小白提示：🔍 搜索文件: "*.md" 🌸 |
| Grep | 🌸 小白提示：🔎 搜索内容: "function" 🌸 |
| MCP | 🌸 小白提示：📚 文档: get-library-docs 🌸 |

## 📚 完整文档

查看 [SKILL.md](./SKILL.md) 获取：
- 🎨 颜色/Emoji 自定义
- 🔧 进阶自定义技巧
- 🆕 添加新功能
- 📖 实战经验和踩坑记录
- 💡 常见需求示例

## 🔧 快速自定义

编辑 `~/.claude/hooks/tool-tips-post.sh`：

```bash
# 修改颜色（最后一行）
printf '\033[38;5;206m...'  # 206=粉色，196=红色，46=绿色...

# 修改 Emoji（get_tip 函数中）
"Read") echo "📚 读取文件: ..." ;;  # 改成你喜欢的
```

## 📁 文件说明

| 文件 | 用途 |
|------|------|
| `tool-tips-post.sh` | 核心 Hook 脚本 |
| `install.ps1` | Windows 安装脚本 (GitHub) |
| `install.sh` | Linux/macOS 安装脚本 (GitHub) |
| `install-gitee.ps1` | Windows 安装脚本 (Gitee) |
| `install-gitee.sh` | Linux/macOS 安装脚本 (Gitee) |
| `SKILL.md` | 完整自定义指南 |

## 🤝 贡献

欢迎提交 Issue 和 PR！

## 📄 许可证

[MIT License](./LICENSE)
