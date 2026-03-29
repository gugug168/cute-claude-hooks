---
name: cute-claude-hooks (可爱提示钩子)
description: 为 Claude Code 提供完整的中文体验！包含工具提示、界面汉化、完整的自定义指南、实战经验和进阶开发教程, 让用户能够根据自己的需求修改和完善.
---

# 🌸 Cute Claude Hooks - 完整指南
让 Claude Code 显示可爱的中文提示和界面!
---

---

## 📚 目录
0. [⚠️ 重要警告 - 必读！](#️-重要警告---必读)
1. [功能介绍](#-功能介绍)
2. [快速安装](#-快速安装)
3. [界面汉化](#-界面汉化)
4. [基础自定义](#-基础自定义)
5. [进阶自定义](#-进阶自定义)
6. [添加新功能](#-添加新功能)
7. [调试技巧](#-调试技巧)
8. [实战经验](#-实战经验)
9. [常见需求示例](#-常见需求示例)
10. [问题排查](#-问题排查)
11. [文件位置速查](#-文件位置速查)
12. [恢复默认](#-恢复默认)
13. [相关资源](#-相关资源)
14. [汉化关键词表](#-汉化关键词表)
15. [常见问题](#-常见问题)
16. [技术说明](#-技术说明)
17. [更新日志](#-更新日志)
18. [贡献指南](#-贡献指南)
19. [许可证](#-许可证)

---

## ⚠️ 重要警告 - 必读！

### 🚫 不要随意修改的关键短语

在自定义钩子脚本时，**以下短语/格式千万不能随意修改**，否则可能导致 Claude Code 无法正常启动或运行：

| 类型 | 不能修改的内容 | 原因 |
|------|---------------|------|
| **JSON 结构** | `{"systemMessage":"..."}` 格式 | Claude Code 依赖此格式解析 hook 输出 |
| **特殊标记** | `<{{GUID}}>` 格式的标记 | 系统内部通信标识符 |
| **工具名称** | `Bash`, `Read`, `Write` 等工具名 | 与 Claude Code 内部工具对应 |
| **钩子字段** | `PreToolUse`, `PostToolUse` 等事件名 | 钩子系统核心字段 |
| **环境变量名** | `CLAUDE_CODE_*` 相关变量 | 系统运行时依赖 |

### 💡 修改时的安全原则

1. **只修改显示文本** - 例如工具提示的中文名
2. **保持 JSON 结构完整** - 不要删除或重命名字段
3. **测试后再使用** - 修改后先用简单命令测试
4. **保留备份** - 修改前备份原始文件

### 🔧 Claude Code 出错时的修复方法

如果修改后 Claude Code 无法正常启动或出错：

```bash
# 方法1: 重新安装 Claude Code
npm install -g @anthropic-ai/claude-code

# 方法2: 清除缓存后重装
npm cache clean --force
npm install -g @anthropic-ai/claude-code

# 方法3: 恢复钩子默认配置
# 删除自定义钩子，使用原始配置
rm -rf ~/.claude/hooks/
```

---

## 🎯 功能介绍

### 项目做了什么？

`cute-claude-hooks` 是一个为 **Claude Code** 设计的中文增强工具包，包含两大核心功能：

#### 1️⃣ 工具操作中文提示

每次 Claude Code 执行操作时，都会在界面上显示一条中文提示，告诉你它刚才做了什么：

```
🌸 📖 读取文件: package.json — 查看这个文件里写了什么 🌸
🌸 🖥️ 执行命令: git status — 查看代码仓库状态（有哪些文件被修改了） 🌸
🌸 ✏️ 编辑文件: index.js — 修改这个文件的部分内容 🌸
```

**支持的工具类型：**

| 工具 | 图标 | 说明 |
|------|------|------|
| `Read` | 📖 | 读取文件 |
| `Write` | 📝 | 写入文件 |
| `Edit` / `MultiEdit` | ✏️ | 编辑文件 |
| `Bash` | 🖥️ | 执行终端命令 |
| `Glob` | 🔍 | 搜索文件 |
| `Grep` | 🔎 | 搜索内容 |
| `Agent` | 🤖 | AI子任务 |
| MCP 工具 | 🔌 | 第三方扩展 |

**命令解释覆盖范围：**

- **Git**: status, log, diff, add, commit, push, pull, fetch, checkout, branch, merge, rebase, stash, clone, init, reset, revert, cherry-pick, remote, show, tag, rm, mv
- **npm/npx**: install, run, init, build, test, start
- **yarn**: add, install, run, build
- **pnpm**: add, install, run
- **pip/pip3**: install, uninstall, list, show, freeze
- **python/python3**: 运行 Python 程序
- **pytest**: 运行 Python 测试
- **文件操作**: ls, cat, head, tail, rm, mkdir, cp, mv, touch, chmod, chown, find, wc, sort, uniq, diff
- **网络**: curl, wget, ping, ssh, scp
- **Docker**: build, run, ps, stop, rm, images, compose
- **系统**: echo, which, env, export, source, cd, pwd, whoami, date
- **编译**: make, gcc, g++, cargo, go
- **编辑器**: code, vim, vi, nano
- **压缩**: tar, zip, unzip
- **进程**: ps, kill, top, htop

**多命令支持：** 当 Bash 工具执行多条命令（用 `&&`, `||`, `;` 连接）时，会逐条解释每一条命令。

#### 2️⃣ 界面汉化

将 Claude Code 的英文界面翻译为中文，包括：
- 配置面板（`/config`）
- 斜杠命令说明
- 快捷键提示
- 欢迎界面
- 状态信息

---

## 📦 快速安装

### 方式一：NPM 安装（推荐）

```bash
# 全局安装
npm install -g cute-claude-hooks

# 运行安装脚本
cute-claude-hooks-install
```

安装向导会提供四个选项：
1. **仅安装工具提示** — 适合只需要中文操作提示的用户
2. **仅安装界面汉化** — 适合只需要汉化界面的用户
3. **全部安装** — 完整中文体验（推荐）
4. **卸载** — 移除所有修改

### 方式二：npx 一键安装

```bash
npx cute-claude-hooks-install
```

无需全局安装，直接运行安装脚本。

### 方式三：手动安装

详见 README.md 中的「Windows 手动安装」章节。

---

## 🌐 界面汉化

### 工作原理

界面汉化通过 **关键词全局替换** 实现：

1. 备份 Claude Code 的 `cli.js` 为 `cli.bak.js`
2. 读取 `keyword.js` 中的翻译对照表（151条）
3. 在 `cli.js` 中执行全文替换
4. 每次替换都验证 JSON 结构完整性

### 支持的汉化范围

| 区域 | 示例原文 | 示例译文 |
|------|---------|---------|
| 配置面板 | `Theme` | `主题` |
| 斜杠命令 | `/help - Get help` | `/help - 获取帮助` |
| 快捷键提示 | `Esc to cancel` | `Esc 取消` |
| 欢迎界面 | `Welcome back!` | `欢迎回来!` |
| 状态信息 | `Auto-compact` | `自动压缩` |

### 汉化词条管理

所有翻译词条在 `localize/keyword.js` 中，格式为：

```javascript
module.exports = {
  'English text': '中文翻译',
  // ...
}
```

---

## 🔧 基础自定义

### 修改工具提示文本

编辑 `~/.claude/hooks/tool-tips-post.sh` 中的 `get_tip()` 函数：

```bash
get_tip() {
    case "$1" in
        "Read")
            echo "📖 正在读取文件 — 看看里面写了什么"
            ;;
        "Write")
            echo "📝 正在写入文件 — 创建或更新文件内容"
            ;;
        # ... 添加你自己的提示
    esac
}
```

### 修改命令解释

编辑 `explain_cmd()` 函数中的 `case` 语句：

```bash
git)
    local sub=$(echo "$rest" | awk '{print $1}')
    case "$sub" in
        status)  echo "查看仓库状态" ;;
        log)     echo "查看提交历史" ;;
        # 添加你自己的命令解释
    esac
    ;;
```

### 修改提示前缀和后缀

在主逻辑中修改 `🌸` 标记：

```bash
# 默认
escaped_tip=$(json_escape "🌸 ${tip} 🌸")

# 改为你想要的标记
escaped_tip=$(json_escape ">>> ${tip} <<<")
```

### 添加新的工具类型支持

在 `get_tip()` 函数中添加新的 `case` 分支：

```bash
# 添加对 NoteBookEdit 的支持
"NotebookEdit")
    echo "📓 编辑 Notebook — 修改 Jupyter 笔记本单元格"
    ;;
```

---

## 🚀 进阶自定义

### 修改 Hook 匹配规则

编辑 `~/.claude/settings.json` 中的 `matcher` 字段：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash|Read|Write|Edit|Glob|Grep|mcp__*",
        "hooks": [...]
      }
    ]
  }
}
```

**匹配规则说明：**

| 规则 | 匹配内容 |
|------|---------|
| `Bash` | 精确匹配 Bash 工具 |
| `Bash\|Read` | 匹配 Bash 或 Read（用 `\|` 分隔） |
| `mcp__*` | 匹配所有 MCP 工具（通配符） |
| `*` | 匹配所有工具 |

### 条件式提示

根据文件类型显示不同提示：

```bash
"Read")
    if [ -n "$file_path" ]; then
        ext="${file_path##*.}"
        case "$ext" in
            py)  echo "📖 读取 Python 文件: $(short_path "$file_path")" ;;
            js)  echo "📖 读取 JavaScript 文件: $(short_path "$file_path")" ;;
            *)   echo "📖 读取文件: $(short_path "$file_path")" ;;
        esac
    fi
    ;;
```

### 自定义 MCP 工具提示

在 `get_tip()` 的 MCP 分支中添加新的服务器：

```bash
case "$srv" in
    "context7")       echo "📚 查询文档: $tool" ;;
    "exa")            echo "🌐 网络搜索: $tool" ;;
    "basic-memory")   echo "🧠 记忆操作: $tool" ;;
    # 添加你自己的 MCP 服务器
    "my-server")      echo "🔧 我的工具: $tool" ;;
    *)                echo "🔌 $srv: $tool" ;;
esac
```

---

## 🆕 添加新功能

### 添加新的 Bash 命令解释

在 `explain_cmd()` 函数中添加新的命令组：

```bash
# 示例：添加 Kubernetes 命令
kubectl)
    local sub=$(echo "$rest" | awk '{print $1}')
    case "$sub" in
        get)          echo "查看 Kubernetes 资源" ;;
        apply)        echo "应用 Kubernetes 配置" ;;
        delete)       echo "删除 Kubernetes 资源" ;;
        logs)         echo "查看容器日志" ;;
        describe)     echo "查看资源详细信息" ;;
        *)            echo "Kubernetes 集群操作" ;;
    esac
    ;;
```

### 添加新的汉化词条

编辑 `localize/keyword.js`：

```javascript
module.exports = {
  // 现有词条...

  // 添加新词条
  'New English Text': '新的中文翻译',
};
```

然后重新运行汉化：
```bash
node ~/.claude/localize/localize.js
```

### 添加 PreToolUse Hook

除了 PostToolUse（执行后提示），还可以添加 PreToolUse（执行前提示）：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/pre-warning.sh"
          }
        ]
      }
    ]
  }
}
```

---

## 🔍 调试技巧

### 测试 Hook 脚本

手动模拟 Claude Code 的调用：

```bash
# 测试 Read 工具提示
echo '{"tool_name":"Read","file_path":"test.py"}' | bash ~/.claude/hooks/tool-tips-post.sh

# 测试 Bash 工具提示
echo '{"tool_name":"Bash","command":"git status"}' | bash ~/.claude/hooks/tool-tips-post.sh

# 测试 Glob 工具提示
echo '{"tool_name":"Glob","pattern":"**/*.js"}' | bash ~/.claude/hooks/tool-tips-post.sh

# 测试多命令提示
echo '{"tool_name":"Bash","command":"git status && npm install && npm run build"}' | bash ~/.claude/hooks/tool-tips-post.sh
```

**预期输出格式：**
```json
{"systemMessage":"🌸 🖥️ 共3条命令:\n  1. git status — 查看代码仓库状态（有哪些文件被修改了）\n  2. npm install — 安装项目依赖包\n  3. npm run build — 构建/编译项目 🌸"}
```

### 查看 Claude Code 的 Hook 日志

Claude Code 的 hook 执行日志在终端中可见。如果提示没有出现：

1. 确认 hook 脚本路径正确（使用正斜杠 `/`）
2. 确认脚本有执行权限（Linux/macOS: `chmod +x`）
3. 确认脚本换行符为 LF（不是 CRLF）
4. 手动运行上面的测试命令检查输出

### 检查 settings.json 格式

```bash
# 验证 JSON 格式
node -e "JSON.parse(require('fs').readFileSync(require('path').join(require('os').homedir(),'.claude','settings.json'),'utf8'));console.log('OK')"
```

---

## 💡 实战经验

### 经验 1：Windows 路径问题

**问题：** Windows 上 hook 脚本路径包含反斜杠或中文用户名。

**解决：** settings.json 中的路径使用正斜杠：
```json
"command": "C:/Users/你的用户名/.claude/hooks/tool-tips-post.sh"
```

Claude Code 会自动通过 Git Bash 执行 `.sh` 脚本。

### 经验 2：CRLF 换行问题

**问题：** 在 Windows 上编辑 `.sh` 文件后，换行符变成 CRLF，导致 bash 报错。

**解决：** 确保使用 LF 换行符。在 VS Code 中，点击右下角的 `CRLF`，切换为 `LF`。

或在安装脚本中自动处理：
```bash
# 将 CRLF 转为 LF
sed -i 's/\r$//' tool-tips-post.sh
```

### 经验 3：Hook 输出格式

**关键发现：** PostToolUse hook 的输出**必须**是以下格式才能在 UI 中显示：

```json
{"systemMessage":"你要显示的文本"}
```

- 必须是合法 JSON
- 字段名必须是 `systemMessage`
- exit code 必须为 0
- stderr 在 exit code 0 时会被静默丢弃

### 经验 4：命令解释的准确性

**原则：** 解释应该让完全不懂编程的人也能理解：
- ❌ `执行命令: git status`
- ✅ `执行命令: git status — 查看代码仓库状态（有哪些文件被修改了）`

每个解释都包含两部分：
1. **功能描述** — 这个命令做什么
2. **括号补充** — 用更通俗的话再解释一遍

### 经验 5：多命令处理

当 Bash 执行的命令包含多条语句时（用 `&&`, `||`, `;` 连接），脚本会：
1. 跳过注释行和空行
2. 按分隔符拆分命令
3. 逐条给出解释
4. 超过 3 条时折叠显示

---

## 📋 常见需求示例

### 需求 1：只显示 Bash 命令提示

修改 settings.json 的 matcher：

```json
"matcher": "Bash"
```

### 需求 2：添加时间戳

修改 `get_tip()` 中的输出：

```bash
"Bash")
    timestamp=$(date '+%H:%M:%S')
    echo "🖥️ [${timestamp}] 执行命令: $real_cmd — $(explain_cmd "$real_cmd")"
    ;;
```

### 需求 3：隐藏文件路径

修改 `get_tip()` 中的 Read/Write/Edit 分支，去掉文件名：

```bash
"Read")
    echo "📖 读取文件 — 查看文件内容"
    ;;
```

### 需求 4：添加声音提醒

```bash
"Bash")
    # macOS 声音提醒
    afplay /System/Library/Sounds/Ping.aiff &
    echo "🖥️ 执行命令: $real_cmd"
    ;;
```

### 需求 5：记录操作日志

在主逻辑中添加日志记录：

```bash
# 在输出 systemMessage 之前记录日志
log_file="$HOME/.claude/hooks/operation.log"
echo "$(date '+%Y-%m-%d %H:%M:%S') | $tool_name | $file_path" >> "$log_file"
```

---

## 🪟 Windows 环境深度自检指南

> **Windows 用户必读！** 90% 的 Hooks 失效问题都源于环境配置不当。请按以下五个阶段逐一排查。

### 快速自检命令

将以下内容直接粘贴给 Claude Code，让它帮你排查：

> "你现在是一个 Windows 专家级运维工程师。请针对以下五个维度，深度扫描我的系统路径、配置和环境变量，找出可能导致 Claude Code Hooks 失效、命令不识别或路径冲突的问题，并给出修复建议。"

---

### [第一阶段] 基础底座：Shell 与权限

| 检查项 | 命令 | 正确状态 |
|--------|------|---------|
| 终端版本 | `$PSVersionTable.PSVersion` | PowerShell 7+ (推荐) |
| 执行策略 | `Get-ExecutionPolicy` | `RemoteSigned` 或 `Unrestricted` |
| 管理员权限 | `([Security.Principal.WindowsPrincipal]::new([Security.Principal.WindowsIdentity]::GetCurrent())).IsInRole('Administrators')` | 按需判断 |

**常见问题：**

- **PowerShell 5.1 (蓝底)** → UTF-8 支持不完整，建议升级到 [PowerShell 7](https://aka.ms/PSWindows)
- **ExecutionPolicy = Restricted** → 所有脚本被静默拦截，运行 `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
- **非管理员终端** → 某些 npm 全局安装需要管理员权限

---

### [第二阶段] 核心动力：Node.js 与 NPM

| 检查项 | 命令 | 正确状态 |
|--------|------|---------|
| Node 版本 | `node --version` | v14.0.0+ |
| Node 路径 | `where node` | 路径无中文、无空格 |
| npm 全局前缀 | `npm config get prefix` | 非用户文档目录 |
| npm 全局包路径 | `npm root -g` | 路径无中文 |

**常见问题：**

- **路径含空格** (`C:\Program Files\nodejs`) → 通常没问题，但某些工具可能报错
- **路径含中文** (`C:\Users\小明\...`) → 会导致 npm 全局包安装失败，建议修改 npm prefix：
  ```powershell
  npm config set prefix "C:\npm-global"
  # 然后将 C:\npm-global 加入系统 PATH
  ```
- **nvm-windows 冲突** → 如果同时装了 nvm-windows 和 Node 官网包，可能路径冲突，建议只保留一个

---

### [第三阶段] 模拟环境：Git Bash 与 Unix 工具 ⚠️ 最关键

| 检查项 | 命令 | 正确状态 |
|--------|------|---------|
| Git 安装 | `git --version` | git version 2.x |
| sh 可用性 | `sh --version` | GNU Bash 4.x+ |
| Git\bin 在 PATH | `$env:Path -split ';' | Select-String 'Git\\bin'` | 存在 |
| Git\usr\bin 在 PATH | `$env:Path -split ';' | Select-String 'Git\\usr\\bin'` | 存在 |
| 换行符策略 | `git config --global core.autocrlf` | **`input`** (必须是这个!) |
| Hooks 路径 | `git config --global core.hooksPath` | 为空或未设置 |

**⚠️ 头号死穴：`core.autocrlf = true`**

这是 Windows 上 Hooks 失效的第一大原因！当 `core.autocrlf = true` 时：
1. Git 会在 checkout 时自动把 LF 转为 CRLF
2. `.sh` 脚本变成 CRLF 换行
3. bash 执行 CRLF 脚本报 `\r: command not found`

**修复：**
```bash
git config --global core.autocrlf input
```

> **为什么用 `input` 而不是 `false`？**
> - `input`：提交时 CRLF → LF，检出时不动。Windows 写代码没问题，脚本也不会被破坏
> - `false`：完全不管换行符。如果你用 Windows 编辑器写代码，可能会把 CRLF 提交到仓库

**验证 sh 可用：**
```powershell
# 应该输出 bash 版本信息
sh --version
# 如果报错，检查 PATH 是否包含 Git\bin
$env:Path -split ';' | Where-Object { $_ -match 'Git\\\\bin' }
```

---

### [第四阶段] 文件系统：字符编码与路径

| 检查项 | 命令 | 正确状态 |
|--------|------|---------|
| UTF-8 区域设置 | 打开: `intl.cpl` → 管理 → 更改系统区域设置 | 勾选 "Beta: 使用 Unicode UTF-8" |
| 长路径支持 | `Get-ItemProperty HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem -Name LongPathsEnabled` | `LongPathsEnabled = 1` |
| 用户名路径 | `echo $env:USERPROFILE` | 无中文字符 |

**常见问题：**

- **中文用户名** (`C:\Users\古古`) → 通常没问题，但某些老旧工具可能报错
- **项目路径含中文** (`D:\项目资料\AI工具`) → 极易出问题！建议改为英文路径
- **长路径** (`C:\Users\xxx\.claude\plugins\cache\...\node_modules\...`) → 超过 260 字符会导致 Node 报错

**开启长路径支持：**
```powershell
# 管理员 PowerShell 运行
Set-ItemProperty HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem -Name LongPathsEnabled -Value 1
# 需要重启生效
```

---

### [第五阶段] 网络与代理

| 检查项 | 命令 | 正确状态 |
|--------|------|---------|
| HTTP 代理 | `echo $env:HTTP_PROXY` | 按需设置 |
| HTTPS 代理 | `echo $env:HTTPS_PROXY` | 按需设置 |
| npm 代理 | `npm config get proxy` | 按需设置 |
| SSL 验证 | `npm config get strict-ssl` | `true` |

**国内用户特别注意：**

如果使用公司代理或 VPN：
```powershell
# 如果代理导致 SSL 错误（不推荐，仅调试用）
npm config set strict-ssl false

# 推荐方式：使用国内镜像
npm config set registry https://registry.npmmirror.com
```

---

### 一键自检脚本

将以下内容保存为 `check-env.ps1` 运行，或直接粘贴到 PowerShell：

```powershell
Write-Host "`n🌸 Cute Claude Hooks — Windows 环境自检 🌸`n" -ForegroundColor Magenta

$pass = "✅"; $fail = "❌"; $warn = "⚠️"

# Stage 1: Shell
Write-Host "[第一阶段] Shell 与权限" -ForegroundColor Cyan
$psVer = $PSVersionTable.PSVersion.Major
Write-Host ($psVer -ge 7 ? "$pass PowerShell $psVer" : "$warn PowerShell $psVer (建议升级到 7+)")
$policy = Get-ExecutionPolicy
Write-Host ($policy -ne 'Restricted' ? "$pass 执行策略: $policy" : "$fail 执行策略: $policy (需设为 RemoteSigned)")

# Stage 2: Node
Write-Host "`n[第二阶段] Node.js" -ForegroundColor Cyan
try { $n = node --version 2>$null; Write-Host "$pass Node $n" } catch { Write-Host "$fail Node 未安装" }
$prefix = npm config get prefix 2>$null
Write-Host ($prefix -match '[\u4e00-\u9fff]' ? "$fail npm prefix 含中文: $prefix" : "$pass npm prefix: $prefix")

# Stage 3: Git Bash (关键!)
Write-Host "`n[第三阶段] Git Bash (最关键)" -ForegroundColor Yellow
try { $g = git --version 2>$null; Write-Host "$pass $g" } catch { Write-Host "$fail Git 未安装" }
$autocrlf = git config --global core.autocrlf 2>$null
Write-Host ($autocrlf -eq 'input' ? "$pass core.autocrlf = input" : "$fail core.autocrlf = $autocrlf (必须改为 input!)")
$hookPath = git config --global core.hooksPath 2>$null
Write-Host ($hookPath ? "$warn core.hooksPath = $hookPath (可能拦截 Claude Hooks)" : "$pass 无全局 hooksPath 覆盖")

# Stage 4: Encoding
Write-Host "`n[第四阶段] 文件系统" -ForegroundColor Cyan
$userPath = $env:USERPROFILE
Write-Host ($userPath -match '[\u4e00-\u9fff]' ? "$warn 用户路径含中文: $userPath" : "$pass 用户路径: $userPath")

# Stage 5: Network
Write-Host "`n[第五阶段] 网络" -ForegroundColor Cyan
$reg = npm config get registry 2>$null
Write-Host ($reg -match 'npmmirror' ? "$pass npm 镜像: $reg" : "$pass npm 源: $reg")

Write-Host "`n🌸 自检完成！如有 ❌ 项请参考上方修复建议 🌸`n" -ForegroundColor Magenta
```

---

## 🐛 问题排查

### 提示不显示

**排查步骤：**

1. **检查 settings.json 格式**
   ```bash
   node -e "console.log(JSON.parse(require('fs').readFileSync(require('path').join(require('os').homedir(),'.claude','settings.json'),'utf8')).hooks)"
   ```

2. **手动测试 hook 脚本**
   ```bash
   echo '{"tool_name":"Read","file_path":"test.py"}' | bash ~/.claude/hooks/tool-tips-post.sh
   ```
   应该输出 `{"systemMessage":"..."}`

3. **检查脚本换行符**
   ```bash
   file ~/.claude/hooks/tool-tips-post.sh
   # 应该显示: ASCII text, not ASCII text, with CRLF line terminators
   ```

4. **检查脚本权限**（Linux/macOS）
   ```bash
   ls -la ~/.claude/hooks/tool-tips-post.sh
   # 应该有执行权限
   chmod +x ~/.claude/hooks/tool-tips-post.sh
   ```

### 中文乱码

确保系统编码为 UTF-8：
- Windows: 设置 → 时间和语言 → 语言 → 管理语言设置 → 更改系统区域设置 → 勾选 Beta: 使用 Unicode UTF-8
- Linux/macOS: 通常默认 UTF-8

### 安装脚本报错

```bash
# 查看详细错误
cute-claude-hooks-install 2>&1 | tee install.log
```

---

## 📁 文件位置速查

| 文件 | 位置 | 说明 |
|------|------|------|
| Hook 脚本 | `~/.claude/hooks/tool-tips-post.sh` | 工具提示脚本 |
| 用户配置 | `~/.claude/settings.json` | hooks 配置 |
| 汉化字典 | `~/.claude/localize/keyword.js` | 翻译词条 |
| 汉化引擎 | `~/.claude/localize/localize.js` | 替换脚本 |
| Claude Code 备份 | `~/.claude/localize/cli.bak.js` | 原始英文文件 |
| Claude Code 主体 | Claude Code 安装目录的 `cli.js` | 被汉化的目标文件 |

---

## 🔄 恢复默认

### 恢复英文界面

```bash
# 方式一：使用卸载命令
cute-claude-hooks-restore

# 方式二：手动恢复
node ~/.claude/localize/localize.js --restore
```

### 移除工具提示

编辑 `~/.claude/settings.json`，删除 `hooks` 段：

```json
{
  "hooks": {}
}
```

### 完全卸载

```bash
# 1. 恢复英文界面
cute-claude-hooks-restore

# 2. 删除 hook 文件
rm -rf ~/.claude/hooks/

# 3. 删除汉化文件
rm -rf ~/.claude/localize/

# 4. 卸载 npm 包
npm uninstall -g cute-claude-hooks
```

---

## 🔗 相关资源

| 资源 | 链接 |
|------|------|
| GitHub 仓库 | https://github.com/gugug168/cute-claude-hooks |
| npm 包 | https://www.npmjs.com/package/cute-claude-hooks |
| Claude Code 官方 | https://claude.ai/code |
| Claude Code 文档 | https://docs.anthropic.com/en/docs/claude-code |
| 问题反馈 | https://github.com/gugug168/cute-claude-hooks/issues |

---

## 📖 汉化关键词表

当前共有 **151** 条翻译词条，覆盖 Claude Code 界面的主要文本。

**主要分类：**

| 分类 | 词条数 | 示例 |
|------|--------|------|
| 配置面板 | 30+ | Theme → 主题, Model → 模型 |
| 斜杠命令 | 20+ | /help → 获取帮助 |
| 状态信息 | 25+ | Auto-compact → 自动压缩 |
| 快捷键 | 15+ | Esc to cancel → Esc 取消 |
| 欢迎界面 | 10+ | Welcome back → 欢迎回来 |
| 其他界面 | 50+ | 各类提示和说明文本 |

完整词条列表见 `localize/keyword.js` 文件。

---

## ❓ 常见问题

### Q: 支持 macOS 和 Linux 吗？
**A:** 完全支持！安装脚本自动检测操作系统。

### Q: 更新 Claude Code 后汉化会丢失吗？
**A:** 会的。Claude Code 更新会覆盖 cli.js。重新运行 `cute-claude-hooks-install` 选择「仅安装界面汉化」即可。

### Q: 工具提示支持哪些命令？
**A:** 支持 80+ 常用命令的中文解释，涵盖 git、npm、pip、docker、文件操作、网络命令等。

### Q: 可以只安装工具提示不汉化界面吗？
**A:** 可以。安装时选择「仅安装工具提示」。

### Q: 中文用户名路径会有问题吗？
**A:** 一般不会。如果遇到编码问题，确保系统编码为 UTF-8。

### Q: 修改 hook 脚本后需要重启 Claude Code 吗？
**A:** 不需要。每次工具执行都会调用 hook 脚本，修改立即生效。

### Q: 为什么提示没有显示颜色？
**A:** Claude Code 的 hook 系统通过 `systemMessage` 渲染文本，目前不支持 ANSI 颜色代码。提示会以默认颜色显示。

---

## 🔬 技术说明

### Hook 工作流程

```
Claude Code 执行工具
       ↓
触发 PostToolUse 事件
       ↓
匹配 matcher 规则
       ↓
执行 hook command (tool-tips-post.sh)
       ↓
从 stdin 读取工具信息 JSON
       ↓
提取 tool_name, file_path, pattern, command
       ↓
调用 get_tip() 生成中文提示
       ↓
输出 {"systemMessage":"..."} 到 stdout
       ↓
Claude Code 读取并显示在界面上
```

### JSON 输入格式（stdin）

Claude Code 通过 stdin 传递工具信息：

```json
{
  "tool_name": "Bash",
  "file_path": "src/index.js",
  "pattern": "**/*.js",
  "command": "git status && npm install"
}
```

### JSON 输出格式（stdout）

Hook 必须输出以下格式：

```json
{"systemMessage":"🌸 🖥️ 执行命令: git status — 查看代码仓库状态 🌸"}
```

**注意事项：**
- 必须是单行合法 JSON
- `systemMessage` 中的换行用 `\n` 表示
- 双引号用 `\"` 转义
- 反斜杠用 `\\` 转义

### 多命令解析逻辑

1. 从 `command` 字段提取 bash 命令
2. 将 JSON 转义的 `\n` 转为实际换行
3. 跳过注释行（`#` 开头）和空行
4. 按分隔符 `&&`, `||`, `;` 拆分
5. 对每条命令调用 `explain_cmd()` 生成解释
6. 超过 3 条时折叠为 `...(还有N条)`

---

## 📝 更新日志

### v1.0.6 (当前版本)
- 🔄 **重大更新**: Hook 输出改为 `systemMessage` JSON 格式
- 📖 **新增**: 80+ 命令的中文解释（小白友好）
- 📋 **新增**: 多命令场景的逐条解释
- 🧹 **移除**: 命令截断（`head -c`），现在显示完整命令
- 🔧 **修复**: 跳过 Bash 命令中的注释行
- 🔧 **修复**: JSON 转义换行符 `\n` 正确转换为实际换行

### v1.0.5
- 🌸 界面汉化引擎改为 Node.js 实现
- 📝 关键词字典改为 JavaScript 模块
- 🧹 移除 Python/Shell 版本的汉化脚本

### v1.0.4
- 🪟 Windows 兼容性改进
- 🔧 修复路径中的中文编码问题

### v1.0.0
- 🎉 初始版本发布
- 📖 基础工具中文提示
- 🌐 界面汉化支持

---

## 🤝 贡献指南

### 如何贡献

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交修改：`git commit -m 'feat: 添加某某功能'`
4. 推送分支：`git push origin feature/your-feature`
5. 创建 Pull Request

### 贡献方向

特别欢迎以下贡献：

- 🌍 **新的汉化词条** — 补充 keyword.js 中缺少的翻译
- 🔧 **新的命令解释** — 为 explain_cmd() 添加更多命令
- 📸 **效果截图** — 展示实际使用效果
- 📝 **文档改进** — 修正错误或补充说明
- 🐛 **Bug 修复** — 修复已知问题
- 🌐 **多语言支持** — 添加其他语言版本

### 提交规范

使用 Conventional Commits 格式：

```
feat: 添加 kubectl 命令解释
fix: 修复 Windows 中文路径编码问题
docs: 更新 SKILL.md 安装说明
refactor: 简化 get_tip() 函数逻辑
```

---

## 📄 许可证

MIT License - 自由使用、修改和分发

---

<p align="center">
  Made with 🌸 by <a href="https://github.com/gugug168">gugug168</a>
</p>
