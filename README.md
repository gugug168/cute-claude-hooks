# 🌸 Cute Claude Hooks

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Compatible-orange.svg)](https://claude.ai/code)
[![npm version](https://img.shields.io/npm/v/cute-claude-hooks.svg)](https://www.npmjs.com/package/cute-claude-hooks)
[![Cross Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-green.svg)](https://github.com/gugug168/cute-claude-hooks)
[![GitHub Actions](https://github.com/gugug168/cute-claude-hooks/actions/workflows/test-localization.yml/badge.svg)](https://github.com/gugug168/cute-claude-hooks/actions/workflows/test-localization.yml)

> 🌸 让 Claude Code 拥有完整的中文体验！中文提示 + 界面汉化，专为编程小白设计

## 📸 效果预览

### 🎯 工具提示效果

每个 Claude Code 执行的操作都会显示中文提示，让你清楚知道它在做什么：

![工具提示详细效果](./screenshots/03-tool-tips-detailed.png)

![工具提示带翻译效果](./screenshots/03-tool-tips-with-translation.png)

### 🌐 界面汉化效果

![配置面板中文效果](./screenshots/02-config-chinese.png)

![斜杠命令中文效果](./screenshots/04-slash-commands-chinese.png)

### 📝 汉化对照表

| 原文 (English) | 译文 (中文) |
|---------------|------------|
| Welcome back! | 欢迎回来! |
| Auto-compact | 自动压缩 |
| Thinking mode | 深度思考模式 |
| Esc to cancel | Esc 取消 |
| Enter to submit · Esc to cancel | Enter 提交 · Esc 取消 |
| Recent activity | 最近活动记录 |
| Tips for getting started | 入门技巧 |

### 📋 支持的命令解释

| 命令类型 | 示例命令 | 中文解释 |
|---------|---------|---------|
| **GitHub CLI** | `gh run list` | 🚀 列出 GitHub Actions 运行记录（查看自动化测试历史） |
| | `gh auth status` | 🔐 检查 GitHub 登录状态（看是否已登录、登录的是哪个账号） |
| | `gh repo create` | 📦 在 GitHub 上创建新仓库（新建一个代码存储库） |
| **Git** | `git push` | 📚 推送到远程仓库（上传代码到服务器） |
| | `git log` | 📜 查看提交日志（看所有修改记录） |
| | `git status` | 📊 查看工作区状态（哪些文件改了） |
| **npm** | `npm install` | 📦 安装依赖包（下载项目所需的库） |
| | `npm run build` | 🏗️ 构建项目（编译打包代码） |
| **pip** | `pip install` | 📦 安装 Python 包（下载 Python 库） |
| | `pip list` | 📋 列出已安装的包（查看 Python 库） |
| **网络** | `curl` | 🌐 获取网页内容（下载或查看网页数据） |
| | `ping` | 🌐 测试网络连接（检查能否连上某个地址） |
| **文件** | `cat` | 📖 查看文件内容（打开文本文件阅读） |
| | `mkdir` | 📁 创建新目录（新建文件夹） |

> 💡 支持 **100+** 常用命令的详细中文解释！

---

## ✨ 特性

- 📖 **中文操作提示** - 每个操作都有详细的中文解释，小白也能看懂
- 🌸 **界面汉化** - 配置面板、命令说明、快捷键提示全中文
- 🖥️ **跨平台** - Windows/macOS/Linux 通用
- 📦 **轻量级** - 无依赖，秒级安装
- 🔧 **易自定义** - 完整的自定义指南
- 🇨🇳 **国内加速** - 支持 npmmirror 镜像安装
- 🧪 **自动测试** - GitHub Actions 三平台自动测试

---

## 📦 安装

### 方式一：NPM 安装（推荐）

```bash
# 全局安装
npm install -g cute-claude-hooks

# 运行安装脚本
cute-claude-hooks-install

# 恢复英文界面
cute-claude-hooks-restore
```

**或者使用 npx（无需全局安装）：**
```bash
npx cute-claude-hooks-install
```

### 方式二：国内加速安装（推荐国内用户）

如果 npm 官方源速度慢，可以使用国内镜像：

```bash
# 使用 npmmirror 镜像安装
npm install -g cute-claude-hooks --registry=https://registry.npmmirror.com

# 运行安装脚本
cute-claude-hooks-install
```

**或者使用 npx：**
```bash
npx cute-claude-hooks-install
```

### 安装选项

```
╔════════════════════════════════════════╗
║     🌸 Cute Claude Hooks 安装向导 🌸   ║
╠════════════════════════════════════════╣
║  [1] 仅安装工具提示 (推荐新手)         ║
║  [2] 仅安装界面汉化                    ║
║  [3] 全部安装 (完整中文体验) ← 推荐    ║
║  [4] 卸载                              ║
╚════════════════════════════════════════╝
```

---

## 🎯 功能详解

### 1️⃣ 工具提示 (Tool Tips)

安装后，Claude Code 每次执行操作都会显示中文提示：

```
✅ 操作成功示例：

🌸 小白提示：🔐 检查 GitHub 登录状态（看是否已登录、登录的是哪个账号） 🌸
🌸 小白提示：🚀 列出 GitHub Actions 运行记录（查看自动化测试历史） 🌸
🌸 小白提示：📦 安装依赖包（下载项目所需的库） 🌸
```

### 2️⃣ 界面汉化 (Localization)

将 Claude Code 的英文界面翻译成中文：

- ✅ `/config` 配置面板汉化
- ✅ 斜杠命令说明汉化
- ✅ 快捷键提示汉化
- ✅ 欢迎界面汉化
- ✅ 状态信息汉化

### 3️⃣ 恢复功能 (Restore)

随时可以恢复到英文界面：

**Windows:**
```powershell
~/.claude/localize/restore.ps1
```

**macOS/Linux:**
```bash
~/.claude/localize/restore.sh
```

---

## 🪟 Windows 手动安装（自动安装失败时使用）

如果 `cute-claude-hooks-install` 运行后中文提示没有出现，按以下步骤手动安装：

### 前提条件
- 已安装 [Git for Windows](https://git-scm.com/downloads/win)
- 已安装 [Node.js](https://nodejs.org/) 14+

### 步骤一：复制 hook 脚本

```powershell
# 创建 hooks 目录
mkdir -Force "$env:USERPROFILE\.claude\hooks"

# 复制脚本（替换为你的 npm 全局目录）
$npmDir = (npm root -g).Trim()
copy "$npmDir\cute-claude-hooks\tool-tips-post.sh" "$env:USERPROFILE\.claude\hooks\"
```

### 步骤二：确认 bash 可用

```powershell
# 检查 bash 是否在 PATH 中
bash --version

# 如果找不到，设置环境变量指向你的 Git Bash
# 将下面的路径改为你实际的 Git Bash 安装路径
$env:CLAUDE_CODE_GIT_BASH_PATH = "C:\Program Files\Git\bin\bash.exe"
```

### 步骤三：手动编辑 settings.json

打开 `~/.claude/settings.json`，添加或修改 `hooks` 段：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash|Read|Write|Edit|Glob|Grep|mcp__*",
        "hooks": [
          {
            "type": "command",
            "command": "\"C:/Users/你的用户名/.claude/hooks/tool-tips-post.sh\""
          }
        ]
      }
    ]
  }
}
```

> **注意**：路径使用正斜杠 `/`，不要用反斜杠 `\`

### 步骤四：验证

```powershell
# 手动测试 hook 脚本
echo '{"tool_name":"Read","file_path":"test.py"}' | bash "$env:USERPROFILE\.claude\hooks\tool-tips-post.sh"
```

如果看到 `{"systemMessage":"🌸 📖 读取文件: test.py — 查看这个文件里写了什么 🌸"}`，说明脚本正常工作。

### 常见问题排查

| 问题 | 解决方案 |
|------|---------|
| `bash: command not found` | 安装 [Git for Windows](https://git-scm.com/downloads/win) 并确保在 PATH 中 |
| 脚本无输出 | 检查 .sh 文件换行符是否为 LF（非 CRLF） |
| 中文用户名路径乱码 | 确保系统编码为 UTF-8：设置 → 时间和语言 → 语言 → 管理语言设置 → 更改系统区域设置 → 勾选 Beta: 使用 Unicode UTF-8 |
| settings.json 格式错误 | 用 `node -e "JSON.parse(require('fs').readFileSync(require('path').join(require('os').homedir(),'.claude','settings.json'),'utf8'));console.log('OK')"` 验证 |

### Windows 五步深度自检

> Windows 用户遇到疑难问题？把下面这段粘贴给 Claude Code，让它帮你排查：
>
> ```
> "你现在是 Windows 专家级运维工程师。请深度扫描我的系统环境，找出导致 Claude Code Hooks 失效的问题。检查项：1) PowerShell 版本和执行策略 2) Node.js 路径是否含中文/空格 3) sh 是否可用（Git bin 是否在 PATH 中）4) git config core.autocrlf 值（必须是 input，true 会导致 CRLF 损坏脚本）5) 系统是否开启 UTF-8 编码支持。"
> ```

详细排查步骤见 [SKILL.md - Windows 环境深度自检](./SKILL.md#-windows-环境深度自检指南)。


## 🔧 快速自定义

### 修改提示文本

编辑 `~/.claude/hooks/tool-tips-post.sh` 中的 `get_tip()` 函数：

```bash
# 修改工具提示文本
"Read")
    echo "📖 正在读取文件 — 看看里面写了什么"
    ;;

# 修改命令解释
git)
    case "$sub" in
        status)  echo "查看仓库状态" ;;
        log)     echo "查看提交历史" ;;
    esac
    ;;
```

> **注意：** Claude Code 的 hook 输出不支持自定义颜色，提示会以默认颜色显示。

### 添加新的汉化词条

编辑 `~/.claude/localize/keyword.js`：

```javascript
module.exports = {
  // 添加新的翻译条目
  'Your English text': '你的中文翻译',
  // ...
}
```

然后重新执行 `node ~/.claude/localize/localize.js` 即可。

---

## 📁 文件结构

```
cute-claude-hooks/
├── 📄 README.md              # 本文档
├── 📄 SKILL.md               # 完整自定义指南
├── 📄 LICENSE                # MIT 许可证
├── 🔧 tool-tips-post.sh      # 工具提示 Hook 脚本
├── 📁 bin/                   # 安装脚本
│   ├── 📦 install.js         # 统一安装器（hooks + 汉化）
│   └── 📦 restore.js         # 恢复英文界面
├── 📁 localize/              # 界面汉化模块
│   ├── 📝 keyword.js         # 关键词翻译字典 (151词条)
│   └── 🔧 localize.js        # Node.js 全局替换汉化引擎
├── 📁 .github/
│   └── 📁 workflows/
│       └── 🧪 test-localize.yml  # 跨平台自动测试
└── 📁 screenshots/           # 截图目录
```

---

## 🧪 自动测试

本项目使用 GitHub Actions 进行跨平台自动测试：

[![Test Claude Code Localization](https://github.com/gugug168/cute-claude-hooks/actions/workflows/test-localization.yml/badge.svg)](https://github.com/gugug168/cute-claude-hooks/actions/workflows/test-localization.yml)

| 平台 | 状态 | 测试内容 |
|-----|------|---------|
| 🐧 Linux (Ubuntu) | ✅ 通过 | Hook脚本语法 + 界面汉化 (135词条) |
| 🍎 macOS | ✅ 通过 | Hook脚本语法 + 界面汉化 (135词条) |
| 🪟 Windows | ✅ 通过 | Hook脚本语法 + 界面汉化 (135词条) |

### 测试覆盖

- ✅ **工具提示测试** - 验证 Hook 脚本输出中文提示
- ✅ **界面汉化测试** - 验证 cli.js 成功翻译 151 个词条
- ✅ **全局替换验证** - 匹配双引号/单引号/模板字符串中的所有键值
- ✅ **备份文件检查** - 确保 cli.bak.js 备份存在

---

## 📚 完整文档

查看 [SKILL.md](./SKILL.md) 获取：

- 🌸 界面汉化详细说明
- 🎨 颜色/Emoji 自定义
- 🔧 进阶自定义技巧
- 🆕 添加新功能
- 📖 实战经验和踩坑记录
- 💡 常见需求示例

---

## 🤝 贡献

欢迎提交 Issue 和 PR！特别是：

- 🌍 新的汉化词条
- 🔧 新的命令解释
- 📸 效果截图
- 📝 文档改进
- 🐛 Bug 修复

### 贡献截图

如果你使用了本项目，欢迎贡献效果截图：

1. Fork 本仓库
2. 将截图放入 `screenshots/` 目录
3. 提交 Pull Request

---

## 🌸 推荐搭配

如果你想要更完整的中文体验，可以搭配使用：

- **Claude Code** - Anthropic 官方 AI 编程助手

---

## 📄 许可证

[MIT License](./LICENSE) - 自由使用、修改和分发

---

<p align="center">
  Made with 🌸 by <a href="https://github.com/gugug168">gugug168</a>
</p>

<p align="center">
  如果这个项目对你有帮助，请给一个 ⭐ Star 支持一下！
</p>
