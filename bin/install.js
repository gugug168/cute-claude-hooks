#!/usr/bin/env node

/**
 * Cute Claude Hooks - NPM 安装脚本
 * 安装中文提示钩子 + 界面汉化
 * 完整支持 Windows / macOS / Linux
 * License: MIT
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const MAGENTA = '\x1b[38;5;206m';
const GREEN = '\x1b[0;32m';
const YELLOW = '\x1b[0;33m';
const RED = '\x1b[0;31m';
const CYAN = '\x1b[0;36m';
const NC = '\x1b[0m';
const IS_WIN = process.platform === 'win32';

console.log(`\n${MAGENTA}==============================================${NC}`);
console.log(`${MAGENTA}     Cute Claude Hooks 安装器${NC}`);
console.log(`${MAGENTA}==============================================${NC}\n`);

// 路径常量
const homeDir = os.homedir();
const claudeDir = path.join(homeDir, '.claude');
const hooksDir = path.join(claudeDir, 'hooks');
const localizeDir = path.join(claudeDir, 'localize');
const settingsFile = path.join(claudeDir, 'settings.json');

// 获取 npm 包目录
let npmDir;
try {
  npmDir = path.dirname(require.resolve('cute-claude-hooks/package.json'));
} catch (e) {
  npmDir = path.resolve(__dirname, '..');
}

console.log(`${CYAN}包目录: ${npmDir}${NC}`);
console.log(`${CYAN}系统: ${IS_WIN ? 'Windows' : process.platform}${NC}`);
console.log(`${CYAN}目标: ${claudeDir}${NC}\n`);

// ========== 工具函数 ==========
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`${GREEN}已创建: ${dir}${NC}`);
  }
}

function copyFile(src, dest) {
  try {
    fs.copyFileSync(src, dest);
    console.log(`${GREEN}已复制: ${path.basename(dest)}${NC}`);
    return true;
  } catch (err) {
    console.log(`${RED}复制失败: ${path.basename(dest)} - ${err.message}${NC}`);
    return false;
  }
}

/**
 * 将文件内容确保为 LF 换行（bash 脚本必需）
 * npm install 在 Windows 上可能把 LF 转为 CRLF
 * 返回 true 表示文件是干净的（LF only）
 */
function ensureLfLineEndings(filePath) {
  try {
    // 读取原始 buffer，避免 Node.js 自动转换
    const buf = fs.readFileSync(filePath);
    const hasCR = buf.includes(Buffer.from('\r\n'));

    if (hasCR) {
      let content = buf.toString('utf8');
      content = content.replace(/\r\n/g, '\n');
      // 确保不以 \r\n 结尾
      if (content.endsWith('\r\n')) {
        content = content.slice(0, -2) + '\n';
      }
      fs.writeFileSync(filePath, content, 'utf8');

      // 二次确认：重新读取检查
      const recheck = fs.readFileSync(filePath);
      if (recheck.includes(Buffer.from('\r\n'))) {
        console.log(`${RED}换行符修复失败: ${path.basename(filePath)}${NC}`);
        return false;
      }
      console.log(`${GREEN}已修复换行符: ${path.basename(filePath)} (CRLF -> LF)${NC}`);
    }
    return true;
  } catch (err) {
    console.log(`${RED}换行符检查失败: ${err.message}${NC}`);
    return false;
  }
}

/**
 * 备份 settings.json
 */
function backupSettings() {
  if (!fs.existsSync(settingsFile)) return null;
  const backupFile = settingsFile + '.bak';
  try {
    fs.copyFileSync(settingsFile, backupFile);
    console.log(`${GREEN}已备份: settings.json.bak${NC}`);
    return backupFile;
  } catch (err) {
    console.log(`${YELLOW}备份失败: ${err.message}${NC}`);
    return null;
  }
}

/**
 * Windows 下查找 Git Bash 路径（与 Claude Code 的 cr8() 逻辑一致）
 */
function findGitBash() {
  if (!IS_WIN) return null;

  // 1. 环境变量
  if (process.env.CLAUDE_CODE_GIT_BASH_PATH) {
    if (fs.existsSync(process.env.CLAUDE_CODE_GIT_BASH_PATH)) {
      console.log(`${GREEN}使用环境变量 CLAUDE_CODE_GIT_BASH_PATH${NC}`);
      return process.env.CLAUDE_CODE_GIT_BASH_PATH;
    }
  }

  // 2. 通过 git.exe 推算
  try {
    const gitPath = execSync('where git.exe', { encoding: 'utf8', timeout: 5000 }).trim().split('\n')[0].trim();
    if (gitPath) {
      const gitDir = path.dirname(gitPath);
      const possibleBash = [
        path.join(gitDir, '..', 'bin', 'bash.exe'),
        path.join(gitDir, '..', '..', 'bin', 'bash.exe'),
        path.join(gitDir, 'bash.exe'),
      ];
      for (const p of possibleBash) {
        const resolved = path.resolve(p);
        if (fs.existsSync(resolved)) {
          console.log(`${GREEN}找到 Git Bash: ${resolved}${NC}`);
          return resolved;
        }
      }
    }
  } catch (e) { /* git not found */ }

  // 3. 常见安装路径
  const commonPaths = [
    'C:\\Program Files\\Git\\bin\\bash.exe',
    'C:\\Program Files (x86)\\Git\\bin\\bash.exe',
    path.join(os.homedir(), 'scoop', 'apps', 'git', 'current', 'bin', 'bash.exe'),
    'D:\\Git\\bin\\bash.exe',
  ];
  for (const p of commonPaths) {
    if (fs.existsSync(p)) {
      console.log(`${GREEN}找到 Git Bash: ${p}${NC}`);
      return p;
    }
  }

  return null;
}

/**
 * 验证 hook 脚本是否能正常执行
 * 使用 spawnSync 直接通过 stdin 管道传数据，避免 shell 转义问题
 */
function verifyHook(hookPath) {
  const { spawnSync } = require('child_process');
  const result = { ok: false, output: '', error: '' };

  try {
    const testInput = JSON.stringify({ tool_name: 'Read', file_path: 'test.py' });

    let shell, args;
    if (IS_WIN) {
      const bashPath = findGitBash();
      if (!bashPath) {
        result.error = '找不到 Git Bash，无法验证';
        return result;
      }
      shell = bashPath;
      args = [hookPath.replace(/\\/g, '/')];
    } else {
      shell = '/bin/bash';
      args = [hookPath];
    }

    const proc = spawnSync(shell, args, {
      input: testInput,
      encoding: 'utf8',
      timeout: 10000,
      windowsHide: true,
    });

    if (proc.error) {
      result.error = `执行失败: ${proc.error.message}`;
      return result;
    }

    if (proc.status !== 0) {
      result.error = `退出码 ${proc.status}: ${(proc.stderr || '').substring(0, 200)}`;
      return result;
    }

    const output = (proc.stdout || '').trim();
    result.output = output;

    // 检查输出是否包含 systemMessage
    if (output.includes('"systemMessage"') && output.includes('test.py')) {
      result.ok = true;
    } else {
      result.error = `输出格式不正确: ${output.substring(0, 200)}`;
    }
  } catch (err) {
    result.error = `执行失败: ${err.message}`;
  }

  return result;
}

// ========== 安装钩子 ==========
function installHook() {
  console.log(`${MAGENTA}[1/2] 安装中文提示钩子...${NC}\n`);

  ensureDir(hooksDir);

  const hookSrc = path.join(npmDir, 'tool-tips-post.sh');
  const hookDest = path.join(hooksDir, 'tool-tips-post.sh');

  if (!fs.existsSync(hookSrc)) {
    console.log(`${RED}找不到钩子脚本: ${hookSrc}${NC}`);
    console.log(`${YELLOW}请确认 npm 包完整性${NC}`);
    return false;
  }

  // 复制 hook 脚本
  if (!copyFile(hookSrc, hookDest)) {
    return false;
  }

  // 关键：确保 LF 换行（Windows npm install 可能转为 CRLF）
  if (!ensureLfLineEndings(hookDest)) {
    console.log(`${YELLOW}警告: 换行符可能有问题，尝试强制修复...${NC}`);
    // 强制修复：直接从源文件写入
    try {
      const content = fs.readFileSync(hookSrc, 'utf8').replace(/\r\n/g, '\n');
      fs.writeFileSync(hookDest, content, { encoding: 'utf8' });
      console.log(`${GREEN}已强制修复换行符${NC}`);
    } catch (err) {
      console.log(`${RED}强制修复失败: ${err.message}${NC}`);
    }
  }

  // Unix 设置执行权限
  if (!IS_WIN) {
    try { fs.chmodSync(hookDest, '755'); } catch (err) {}
  }

  // Windows 特殊检查
  if (IS_WIN) {
    console.log('');
    const bashPath = findGitBash();
    if (!bashPath) {
      console.log(`${RED}${'='.repeat(50)}${NC}`);
      console.log(`${RED}  未找到 Git Bash!${NC}`);
      console.log(`${RED}  Claude Code hooks 在 Windows 上需要 Git Bash${NC}`);
      console.log(`${RED}  请安装 Git for Windows:${NC}`);
      console.log(`${RED}  https://git-scm.com/downloads/win${NC}`);
      console.log(`${RED}${'='.repeat(50)}${NC}\n`);
      return false;
    }
  }

  // 更新 settings.json
  if (!updateSettings(hookDest)) {
    return false;
  }

  // 验证 hook 是否能正常执行
  console.log(`\n${CYAN}验证钩子脚本...${NC}`);
  const verify = verifyHook(hookDest);
  if (verify.ok) {
    console.log(`${GREEN}验证通过! 钩子脚本正常工作${NC}`);
    console.log(`${CYAN}输出示例: ${verify.output.substring(0, 100)}...${NC}`);
  } else {
    console.log(`${RED}验证失败! 钩子脚本可能无法正常工作${NC}`);
    console.log(`${RED}原因: ${verify.error}${NC}`);
    console.log(`${YELLOW}建议: 请运行 cute-claude-hooks-install --verify 获取详细诊断${NC}`);
  }

  return true;
}

// ========== 更新 settings.json ==========
function updateSettings(hookPath) {
  // 备份原始配置
  backupSettings();

  let settings = {};

  if (fs.existsSync(settingsFile)) {
    try {
      const raw = fs.readFileSync(settingsFile, 'utf8');
      settings = JSON.parse(raw);
      console.log(`${GREEN}已读取现有配置: ${settingsFile}${NC}`);
    } catch (err) {
      console.log(`${RED}错误: settings.json 格式不正确 - ${err.message}${NC}`);
      console.log(`${YELLOW}请手动检查: ${settingsFile}${NC}`);
      console.log(`${YELLOW}备份已保存为: ${settingsFile}.bak${NC}`);
      return false;
    }
  }

  if (!settings.hooks) settings.hooks = {};
  if (!settings.hooks.PostToolUse) settings.hooks.PostToolUse = [];

  // 使用正斜杠路径（Claude Code 内部统一使用正斜杠）
  const normalizedPath = hookPath.replace(/\\/g, '/');

  // matcher 匹配所有常用工具 + MCP 工具
  const matcher = 'Bash|Read|Write|Edit|Glob|Grep|mcp__*';

  // 检查是否已存在同 matcher 的配置
  const existingIdx = settings.hooks.PostToolUse.findIndex(h => h.matcher === matcher);

  // hook command：直接用路径，不加 bash 前缀
  // Claude Code 的 hook 执行器会自动通过 cr8() 找到 bash 并包装执行
  const hookEntry = {
    type: 'command',
    command: normalizedPath,
  };

  const hookConfig = {
    matcher: matcher,
    hooks: [hookEntry]
  };

  if (existingIdx >= 0) {
    settings.hooks.PostToolUse[existingIdx] = hookConfig;
    console.log(`${GREEN}已更新: PostToolUse 钩子配置${NC}`);
  } else {
    settings.hooks.PostToolUse.push(hookConfig);
    console.log(`${GREEN}已添加: PostToolUse 钩子配置${NC}`);
  }

  console.log(`${CYAN}钩子命令: ${normalizedPath}${NC}`);
  console.log(`${CYAN}匹配模式: ${matcher}${NC}`);

  try {
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2), 'utf8');
    console.log(`${GREEN}已保存: ${settingsFile}${NC}`);
    return true;
  } catch (err) {
    console.log(`${RED}写入失败: ${err.message}${NC}`);
    console.log(`${YELLOW}请手动添加以下配置到 settings.json:${NC}`);
    console.log(JSON.stringify({ hooks: { PostToolUse: [hookConfig] } }, null, 2));
    return false;
  }
}

// ========== 安装汉化 ==========
function installLocalize() {
  console.log(`\n${MAGENTA}[2/2] 安装界面汉化...${NC}\n`);

  ensureDir(localizeDir);

  // 核心文件
  const files = ['keyword.js', 'localize.js'];

  files.forEach(file => {
    const src = path.join(npmDir, 'localize', file);
    const dest = path.join(localizeDir, file);
    if (fs.existsSync(src)) {
      copyFile(src, dest);
    } else {
      console.log(`${YELLOW}缺少文件: ${file}${NC}`);
    }
  });

  // 执行汉化
  console.log(`\n${MAGENTA}执行汉化...${NC}`);

  try {
    const jsScript = path.join(localizeDir, 'localize.js');
    if (fs.existsSync(jsScript)) {
      execSync(`node "${jsScript}"`, { stdio: 'inherit' });
      return true; // 汉化成功
    }
  } catch (err) {
    // 汉化失败（可能是新版 Claude Code 不支持）
    console.log(`${YELLOW}警告: 汉化过程中遇到问题${NC}`);
    console.log(`${YELLOW}可手动执行: node ~/.claude/localize/localize.js 查看详情${NC}`);
  }
  return false; // 汉化失败
}

// ========== 诊断模式 ==========
function runDiagnostics() {
  console.log(`${MAGENTA}==============================================${NC}`);
  console.log(`${MAGENTA}     Cute Claude Hooks 诊断模式${NC}`);
  console.log(`${MAGENTA}==============================================${NC}\n`);

  let allOk = true;

  // 1. 检查 hook 脚本文件
  console.log(`${CYAN}[1/5] 检查钩子脚本文件...${NC}`);
  const hookFile = path.join(hooksDir, 'tool-tips-post.sh');
  if (fs.existsSync(hookFile)) {
    console.log(`${GREEN}  文件存在: ${hookFile}${NC}`);

    // 检查换行符
    const buf = fs.readFileSync(hookFile);
    if (buf.includes(Buffer.from('\r\n'))) {
      console.log(`${RED}  问题: 文件包含 CRLF 换行符! bash 无法正确执行${NC}`);
      console.log(`${YELLOW}  修复: 运行 cute-claude-hooks-install 自动修复${NC}`);
      allOk = false;
    } else {
      console.log(`${GREEN}  换行符: LF (正确)${NC}`);
    }

    // 检查文件大小
    const stat = fs.statSync(hookFile);
    if (stat.size < 100) {
      console.log(`${RED}  问题: 文件过小 (${stat.size} bytes)，可能不完整${NC}`);
      allOk = false;
    } else {
      console.log(`${GREEN}  文件大小: ${stat.size} bytes${NC}`);
    }

    // 检查 shebang
    const firstLine = fs.readFileSync(hookFile, 'utf8').split('\n')[0];
    if (firstLine.startsWith('#!/bin/bash') || firstLine.startsWith('#!/usr/bin/env bash')) {
      console.log(`${GREEN}  shebang: ${firstLine}${NC}`);
    } else {
      console.log(`${YELLOW}  警告: 第一行不是标准 shebang: ${firstLine}${NC}`);
    }
  } else {
    console.log(`${RED}  问题: 钩子脚本不存在!${NC}`);
    console.log(`${YELLOW}  修复: 运行 cute-claude-hooks-install${NC}`);
    allOk = false;
  }

  // 2. 检查 settings.json
  console.log(`\n${CYAN}[2/5] 检查 settings.json...${NC}`);
  if (fs.existsSync(settingsFile)) {
    console.log(`${GREEN}  文件存在: ${settingsFile}${NC}`);
    try {
      const settings = JSON.parse(fs.readFileSync(settingsFile, 'utf8'));

      if (settings.hooks && settings.hooks.PostToolUse) {
        const hookConfig = settings.hooks.PostToolUse.find(h =>
          h.matcher && h.matcher.includes('Bash')
        );
        if (hookConfig) {
          console.log(`${GREEN}  钩子配置已找到${NC}`);
          console.log(`${GREEN}  matcher: ${hookConfig.matcher}${NC}`);
          if (hookConfig.hooks && hookConfig.hooks[0]) {
            console.log(`${GREEN}  command: ${hookConfig.hooks[0].command}${NC}`);

            // 验证命令路径指向的文件是否存在
            const cmdPath = hookConfig.hooks[0].command.replace(/\//g, path.sep);
            if (fs.existsSync(cmdPath)) {
              console.log(`${GREEN}  命令路径有效${NC}`);
            } else {
              console.log(`${RED}  问题: 命令路径指向的文件不存在: ${cmdPath}${NC}`);
              allOk = false;
            }
          }
        } else {
          console.log(`${RED}  问题: 未找到包含 Bash 的 matcher 配置${NC}`);
          allOk = false;
        }
      } else {
        console.log(`${RED}  问题: settings.json 中没有 hooks.PostToolUse 配置${NC}`);
        allOk = false;
      }
    } catch (err) {
      console.log(`${RED}  问题: settings.json 格式不正确 - ${err.message}${NC}`);
      allOk = false;
    }
  } else {
    console.log(`${RED}  问题: settings.json 不存在${NC}`);
    allOk = false;
  }

  // 3. 检查 bash 可用性
  console.log(`\n${CYAN}[3/5] 检查 bash 环境...${NC}`);
  if (IS_WIN) {
    const bashPath = findGitBash();
    if (bashPath) {
      console.log(`${GREEN}  Git Bash: ${bashPath}${NC}`);
    } else {
      console.log(`${RED}  问题: 未找到 Git Bash${NC}`);
      console.log(`${YELLOW}  修复: 安装 Git for Windows (https://git-scm.com/downloads/win)${NC}`);
      allOk = false;
    }
  } else {
    try {
      const bashVer = execSync('bash --version', { encoding: 'utf8' }).split('\n')[0];
      console.log(`${GREEN}  ${bashVer}${NC}`);
    } catch (err) {
      console.log(`${RED}  问题: bash 不可用${NC}`);
      allOk = false;
    }
  }

  // 4. 运行 hook 验证
  console.log(`\n${CYAN}[4/5] 运行钩子验证测试...${NC}`);
  if (fs.existsSync(hookFile)) {
    const verify = verifyHook(hookFile);
    if (verify.ok) {
      console.log(`${GREEN}  验证通过!${NC}`);
      console.log(`${GREEN}  输出: ${verify.output.substring(0, 120)}${NC}`);
    } else {
      console.log(`${RED}  问题: ${verify.error}${NC}`);
      allOk = false;
    }
  } else {
    console.log(`${YELLOW}  跳过: 钩子文件不存在${NC}`);
    allOk = false;
  }

  // 5. Windows 特殊检查
  console.log(`\n${CYAN}[5/5] 系统环境检查...${NC}`);
  if (IS_WIN) {
    try {
      const autocrlf = execSync('git config --global core.autocrlf', { encoding: 'utf8' }).trim();
      if (autocrlf === 'input') {
        console.log(`${GREEN}  core.autocrlf = input (正确)${NC}`);
      } else {
        console.log(`${RED}  问题: core.autocrlf = ${autocrlf || '(未设置)'}${NC}`);
        console.log(`${YELLOW}  修复: git config --global core.autocrlf input${NC}`);
        console.log(`${YELLOW}  原因: true 会在 checkout 时把 LF 转为 CRLF，导致 .sh 脚本损坏${NC}`);
        allOk = false;
      }
    } catch (err) {
      console.log(`${YELLOW}  警告: 无法检查 git config${NC}`);
    }

    // 检查路径是否含中文
    if (homeDir.match(/[\u4e00-\u9fff]/)) {
      console.log(`${YELLOW}  注意: 用户路径含中文字符: ${homeDir}${NC}`);
      console.log(`${YELLOW}  通常没问题，但某些旧工具可能报错${NC}`);
    }
  }

  // 总结
  console.log(`\n${MAGENTA}${'='.repeat(50)}${NC}`);
  if (allOk) {
    console.log(`${GREEN}  所有检查通过! 钩子应该正常工作${NC}`);
    console.log(`${YELLOW}  如果仍然不显示提示，请重启 Claude Code${NC}`);
  } else {
    console.log(`${RED}  发现问题! 请根据上方提示修复${NC}`);
    console.log(`${YELLOW}  修复后运行: cute-claude-hooks-install --verify${NC}`);
  }
  console.log(`${MAGENTA}${'='.repeat(50)}${NC}\n`);

  return allOk;
}

// ========== 主流程 ==========
function main() {
  const args = process.argv.slice(2);

  // 诊断模式
  if (args.includes('--verify') || args.includes('-v') || args.includes('verify')) {
    runDiagnostics();
    return;
  }

  const mode = args[0] || 'all';
  let hookOk = false;
  let locOk = false;

  switch (mode) {
    case 'hook':
    case '1':
      hookOk = installHook();
      break;
    case 'localize':
    case '2':
      locOk = installLocalize();
      break;
    case 'all':
    default:
      hookOk = installHook();
      locOk = installLocalize();
      break;
  }

  // 最终总结
  console.log(`\n${MAGENTA}${'='.repeat(50)}${NC}`);
  console.log(`${MAGENTA}  安装完成!${NC}`);
  console.log(`${MAGENTA}${'='.repeat(50)}${NC}`);

  if (hookOk) {
    console.log(`${GREEN}  钩子: 已安装${NC}`);
  } else {
    console.log(`${RED}  钩子: 安装失败或有问题${NC}`);
    if (IS_WIN) {
      console.log(`${YELLOW}  运行诊断: cute-claude-hooks-install --verify${NC}`);
    }
  }

  if (locOk) {
    console.log(`${GREEN}  汉化: 已安装${NC}`);
  } else {
    console.log(`${YELLOW}  汉化: 不支持当前版本${NC}`);
  }

  console.log(`${YELLOW}  请重启 Claude Code 使所有更改生效${NC}`);

  if (IS_WIN) {
    console.log(`${CYAN}  如遇问题运行: cute-claude-hooks-install --verify${NC}`);
  }

  console.log(`${CYAN}  文档: https://github.com/gugug168/cute-claude-hooks${NC}\n`);
}

main();
