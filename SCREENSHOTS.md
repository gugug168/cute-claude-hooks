# 📸 截图指南

本文档说明如何为本项目贡献截图。

## 🎯 需要的截图

请截取以下图片并放入 `screenshots/` 目录：

### 1. `01-welcome.png` - 欢迎界面

**截取方法：**
1. 打开 Claude Code
2. 等待欢迎界面显示
3. 截取整个终端窗口

**应该包含：**
- "欢迎回来!" 中文欢迎语
- 最近活动记录
- 入门技巧提示

---

### 2. `02-config-before.png` / `02-config-after.png` - 配置面板对比

**截取方法：**
1. 在 Claude Code 中输入 `/config`
2. 截取配置面板（汉化前后各一张）

**应该包含：**
- 配置选项列表
- 各项设置的中文说明

---

### 3. `03-tool-tips.png` - 工具提示效果

**截取方法：**
1. 让 Claude Code 执行一些操作（如读取文件、运行命令）
2. 截取显示粉色提示的部分

**应该包含：**
- 粉色的 "🌸 小白提示：" 文字
- 具体的命令解释（如 "🔐 检查 GitHub 登录状态"）

---

### 4. `04-slash-commands.png` - 斜杠命令列表

**截取方法：**
1. 在 Claude Code 中输入 `/help`
2. 截取命令列表

**应该包含：**
- 命令列表
- 中文命令说明

---

### 5. `05-install.png` - 安装过程

**截取方法：**
1. 运行安装命令
2. 截取安装过程中的选项界面

**应该包含：**
- 安装向导界面
- 选项列表

---

### 6. `06-actions-test.png` - GitHub Actions 测试结果

**截取方法：**
1. 打开 https://github.com/gugug168/cute-claude-hooks/actions
2. 截取最新测试结果

**应该包含：**
- 三个平台的测试状态（Linux/macOS/Windows）
- 绿色的 "✓" 通过标记

---

## 📐 截图要求

- **格式：** PNG 格式
- **分辨率：** 至少 1280x720
- **清晰度：** 文字清晰可读
- **内容：** 确保不包含敏感信息（密码、Token 等）

## 🔧 截图工具推荐

| 平台 | 推荐工具 |
|-----|---------|
| Windows | Snipaste, ShareX, Win+Shift+S |
| macOS | Command+Shift+4, CleanShot X |
| Linux | Flameshot, GNOME Screenshot |

## 📤 提交截图

1. Fork 本仓库
2. 将截图放入 `screenshots/` 目录
3. 创建 Pull Request

感谢你的贡献！🌸
