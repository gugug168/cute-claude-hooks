# 🌸 Cute Claude Hooks

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Compatible-orange.svg)](https://claude.ai/code)
[![npm version](https://img.shields.io/npm/v/cute-claude-hooks.svg)](https://www.npmjs.com/package/cute-claude-hooks)
[![Cross Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-green.svg)](https://github.com/gugug168/cute-claude-hooks)
[![GitHub Actions](https://github.com/gugug168/cute-claude-hooks/actions/workflows/test-localization.yml/badge.svg)](https://github.com/gugug168/cute-claude-hooks/actions/workflows/test-localization.yml)

> 🌸 让 Claude Code 拥有完整的中文体验！专为编程小白设计

## 📸 效果预览

### 🎯 工具提示效果

每个 Claude Code 执行的操作都会显示粉色中文提示，让你清楚知道它在做什么：

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

- 🎨 **粉色中文提示** - 每个操作都有详细的中文解释，小白也能看懂
- 🌸 **界面汉化** - 配置面板、命令说明、快捷键提示全中文
- 🖥️ **跨平台** - Windows/macOS/Linux 通用
- 📦 **轻量级** - 无依赖，秒级安装
- 🔧 **易自定义** - 完整的自定义指南
- 🇨🇳 **国内镜像** - 支持 Gitee 加速安装
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

### 方式二：一键脚本安装

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/gugug168/cute-claude-hooks/main/install.ps1 | iex
```

**macOS/Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/gugug168/cute-claude-hooks/main/install.sh | bash
```

### 方式三：Gitee 镜像（国内用户推荐）

**Windows (PowerShell):**
```powershell
irm https://gitee.com/gugug168/cute-claude-hooks/raw/main/install-gitee.ps1 | iex
```

**macOS/Linux:**
```bash
curl -fsSL https://gitee.com/gugug168/cute-claude-hooks/raw/main/install-gitee.sh | bash
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

安装后，Claude Code 每次执行操作都会显示粉色中文提示：

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

## 🔧 快速自定义

### 修改提示颜色

编辑 `~/.claude/hooks/tool-tips-post.sh` 最后一行：

```bash
# 修改颜色代码
printf '\033[38;5;206m...'  # 206=粉色
printf '\033[38;5;196m...'  # 196=红色
printf '\033[38;5;46m...'   # 46=绿色
printf '\033[38;5;33m...'   # 33=蓝色
```

### 添加新的汉化词条

编辑 `~/.claude/localize/keyword.conf`：

```bash
# 格式: 原文|译文
Your-english-text|你的中文翻译
```

---

## 📁 文件结构

```
cute-claude-hooks/
├── 📄 README.md              # 本文档
├── 📄 SKILL.md               # 完整自定义指南
├── 📄 LICENSE                # MIT 许可证
├── 🔧 tool-tips-post.sh      # 工具提示 Hook 脚本
├── 📦 install.ps1            # Windows 安装脚本
├── 📦 install.sh             # Linux/macOS 安装脚本
├── 📦 install-gitee.ps1      # Windows 安装脚本 (Gitee)
├── 📦 install-gitee.sh       # Linux/macOS 安装脚本 (Gitee)
├── 📁 localize/              # 界面汉化模块
│   ├── 📝 keyword.conf       # 关键词翻译配置 (135词条)
│   ├── 🔧 localize.js        # Node.js 安全汉化引擎 (首选)
│   ├── 🔧 localize.sh        # Linux/macOS 汉化脚本 (备选)
│   ├── 🔧 localize.ps1       # Windows PowerShell 汉化脚本 (备选)
│   ├── 🔧 localize.py        # Python 汉化脚本 (备选)
│   ├── 🔄 restore.sh         # Linux/macOS 恢复脚本
│   └── 🔄 restore.ps1        # Windows 恢复脚本
├── 📁 .github/
│   └── 📁 workflows/
│       └── 🧪 test-localize.yml  # 跨平台自动测试
└── 📁 screenshots/           # 截图目录
    └── 📸 (待添加截图)
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

- ✅ **工具提示测试** - 验证 Hook 脚本输出粉色中文提示
- ✅ **界面汉化测试** - 验证 cli.js 成功翻译 135 个词条
- ✅ **安全替换验证** - 仅替换 description:"..." 字段，不破坏代码逻辑
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
