# 🧪 跨平台沙盒测试指南

## 方式一：GitHub Actions（推荐，免费）

### 📋 前提条件
1. 将代码推送到 GitHub 仓库
2. 仓库地址：`https://github.com/你的用户名/cute-claude-hooks`

### 🚀 使用方法

#### 自动触发
- 推送代码到 `main` 或 `master` 分支
- 修改 `localize/` 目录下的文件会自动触发测试

#### 手动触发
1. 打开 GitHub 仓库
2. 点击 **Actions** 标签
3. 选择 **🧪 跨平台沙盒测试**
4. 点击 **Run workflow** → **Run workflow**

### 📊 测试结果
测试完成后，可以在 Actions 页面查看三个环境的结果：

| 环境 | 运行系统 | 测试内容 |
|-----|---------|---------|
| 🐧 Linux | ubuntu-latest | Bash 脚本语法 + 沙盒汉化 |
| 🍎 macOS | macos-latest | Bash 脚本语法 + 沙盒汉化 |
| 🪟 Windows | windows-latest | PowerShell 语法 + 沙盒汉化 |

### 💰 费用
- **公开仓库：** 完全免费，无限制
- **私有仓库：** 每月 2000 分钟免费额度（足够用）

---

## 方式二：本地 Docker（适合离线测试）

### 📋 安装 Docker Desktop
- Windows/Mac: https://www.docker.com/products/docker-desktop/

### 🚀 测试命令

```bash
# Linux 环境测试
docker run --rm -v "$(pwd):/app" -w /app ubuntu:latest bash -c "
  apt-get update && apt-get install -y sed grep
  bash -n localize/localize.sh && echo '✅ Linux 测试通过'
"

# Alpine Linux 环境测试（更轻量）
docker run --rm -v "$(pwd):/app" -w /app alpine:latest sh -c "
  apk add bash
  bash -n localize/localize.sh && echo '✅ Alpine 测试通过'
"
```

---

## 方式三：虚拟机（最完整）

| 系统 | 工具 | 说明 |
|-----|-----|------|
| Windows | VirtualBox | 免费，但占用资源多 |
| macOS | UTM / Parallels | Mac 专用虚拟机 |
| Linux | WSL2 / VirtualBox | Windows 上运行 Linux |

### 🎯 推荐组合
- **日常开发：** GitHub Actions（自动）
- **离线测试：** Docker（快速）
- **完整测试：** 虚拟机（偶尔）

---

## 📁 文件结构

```
cute-claude-hooks/
├── .github/
│   └── workflows/
│       ├── test-localize.yml    # 跨平台测试工作流
│       └── README.md            # 本说明文件
├── localize/
│   ├── keyword.conf             # 关键词配置
│   ├── localize.sh              # Linux/macOS 汉化脚本
│   ├── localize.ps1             # Windows 汉化脚本
│   ├── restore.sh               # Linux/macOS 恢复脚本
│   └── restore.ps1              # Windows 恢复脚本
└── README.md
```

## ❓ 常见问题

### Q: GitHub Actions 多久运行一次？
A: 只有在推送代码或手动触发时运行，不会自动定期运行。

### Q: 测试失败怎么办？
A: 查看 Actions 页面的详细日志，会显示具体哪一步失败了。

### Q: 能否添加更多测试环境？
A: 可以！修改 `test-localize.yml`，添加更多 `runs-on` 配置，如：
- `ubuntu-22.04`（指定 Ubuntu 版本）
- `macos-13`（指定 macOS 版本）
- `windows-2019`（指定 Windows Server 版本）
