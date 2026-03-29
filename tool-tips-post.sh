#!/bin/bash
# tool-tips-post.sh - 工具执行后中文提示（带解释）
# GitHub: https://github.com/gugug168/cute-claude-hooks
# License: MIT

input=$(cat)

# 提取 JSON 字段（处理转义引号 \"）
extract_field() {
    local key="$1"
    # 将 \" 替换为占位符，避免 sed 的 [^"] 在引号处中断
    local clean
    clean=$(printf '%s' "$input" | sed 's/\\"/__DQ__/g')
    local val
    val=$(printf '%s' "$clean" | sed -n "s/.*\"${key}\"[[:space:]]*:[[:space:]]*\"\([^\"]*\)\".*/\1/p" | head -1)
    # 恢复转义: __DQ__ → ", \n → 换行
    val=$(printf '%s' "$val" | sed 's/__DQ__/"/g; s/\\n/\n/g')
    printf '%s' "$val"
}

tool_name=$(extract_field "tool_name")
file_path=$(extract_field "file_path")
pattern=$(extract_field "pattern")
bash_cmd=$(extract_field "command")

# 路径简化：只显示文件名
short_path() {
    echo "$1" | sed 's/.*[\\/]//' | head -c 50
}

# 翻译 Bash 命令为中文解释
explain_cmd() {
    local cmd="$1"
    # 取第一个关键词
    local first=$(echo "$cmd" | awk '{print $1}')
    local rest=$(echo "$cmd" | awk '{$1=""; print}' | sed 's/^ *//')

    case "$first" in
        # === Git 版本控制 ===
        git)
            local sub=$(echo "$rest" | awk '{print $1}')
            case "$sub" in
                status)       echo "查看代码仓库状态（有哪些文件被修改了）" ;;
                log)          echo "查看代码提交历史记录" ;;
                diff)         echo "查看代码的具体修改内容" ;;
                add)          echo "把修改的文件加入待提交列表" ;;
                commit)       echo "保存提交代码变更（写一条提交说明）" ;;
                push)         echo "把本地代码上传到远程仓库" ;;
                pull)         echo "从远程仓库下载最新代码" ;;
                fetch)        echo "获取远程仓库的最新信息" ;;
                checkout|switch) echo "切换到另一个代码分支" ;;
                branch)       echo "查看或管理代码分支" ;;
                merge)        echo "把不同分支的代码合并到一起" ;;
                rebase)       echo "整理提交历史（变基）" ;;
                stash)        echo "临时保存未提交的修改" ;;
                clone)        echo "从远程复制一份代码仓库" ;;
                init)         echo "初始化一个新的代码仓库" ;;
                reset)        echo "撤销提交或恢复文件" ;;
                revert)       echo "创建新提交来撤销之前的修改" ;;
                cherry-pick)  echo "把某个特定提交应用到当前分支" ;;
                remote)       echo "管理远程仓库地址" ;;
                show)         echo "查看提交的详细内容" ;;
                tag)          echo "管理代码版本标签" ;;
                rm)           echo "从仓库中删除文件" ;;
                mv)           echo "重命名仓库中的文件" ;;
                *)            echo "Git 版本控制操作" ;;
            esac
            ;;
        # === Node.js 包管理 ===
        npm|npx)
            local sub=$(echo "$rest" | awk '{print $1}')
            case "$sub" in
                install|i)    echo "安装项目依赖包" ;;
                run)          echo "运行项目脚本命令" ;;
                init)         echo "初始化新项目" ;;
                build)        echo "构建/编译项目" ;;
                test)         echo "运行项目测试" ;;
                start)        echo "启动项目" ;;
                *)            echo "Node.js 包管理操作" ;;
            esac
            ;;
        yarn)
            local sub=$(echo "$rest" | awk '{print $1}')
            case "$sub" in
                add)          echo "添加依赖包" ;;
                install)      echo "安装项目依赖" ;;
                run)          echo "运行项目脚本" ;;
                build)        echo "构建项目" ;;
                *)            echo "Yarn 包管理操作" ;;
            esac
            ;;
        pnpm)
            local sub=$(echo "$rest" | awk '{print $1}')
            case "$sub" in
                add)          echo "添加依赖包" ;;
                install)      echo "安装项目依赖" ;;
                run)          echo "运行项目脚本" ;;
                *)            echo "pnpm 包管理操作" ;;
            esac
            ;;
        # === Python ===
        pip|pip3)
            local sub=$(echo "$rest" | awk '{print $1}')
            case "$sub" in
                install)      echo "安装 Python 依赖包" ;;
                uninstall)    echo "卸载 Python 包" ;;
                list)         echo "列出已安装的 Python 包" ;;
                show)         echo "查看 Python 包的详细信息" ;;
                freeze)       echo "导出依赖包列表" ;;
                *)            echo "Python 包管理操作" ;;
            esac
            ;;
        python|python3)
            echo "运行 Python 程序"
            ;;
        pytest)
            echo "运行 Python 单元测试"
            ;;
        # === 文件操作 ===
        ls|dir)
            echo "查看目录中的文件列表" ;;
        cat|bat)
            echo "查看文件内容" ;;
        head)
            echo "查看文件开头几行" ;;
        tail)
            echo "查看文件末尾几行" ;;
        less|more)
            echo "分页查看文件内容" ;;
        rm)
            echo "删除文件或目录" ;;
        mkdir)
            echo "创建新文件夹" ;;
        cp)
            echo "复制文件" ;;
        mv)
            echo "移动或重命名文件" ;;
        touch)
            echo "创建空文件或更新时间戳" ;;
        chmod)
            echo "修改文件权限" ;;
        chown)
            echo "修改文件所有者" ;;
        find)
            echo "搜索文件或目录" ;;
        wc)
            echo "统计文件的行数/字数" ;;
        sort)
            echo "对文本内容排序" ;;
        uniq)
            echo "去除重复行" ;;
        diff)
            echo "比较两个文件的差异" ;;
        # === 网络 ===
        curl)
            echo "请求网络资源" ;;
        wget)
            echo "从网络下载文件" ;;
        ping)
            echo "测试网络连通性" ;;
        ssh)
            echo "远程连接服务器" ;;
        scp)
            echo "远程复制文件" ;;
        # === Docker ===
        docker)
            local sub=$(echo "$rest" | awk '{print $1}')
            case "$sub" in
                build)        echo "构建 Docker 镜像" ;;
                run)          echo "运行 Docker 容器" ;;
                ps)           echo "查看运行中的容器" ;;
                stop)         echo "停止 Docker 容器" ;;
                rm)           echo "删除 Docker 容器" ;;
                images)       echo "查看 Docker 镜像列表" ;;
                compose|up)   echo "启动多容器应用" ;;
                *)            echo "Docker 容器操作" ;;
            esac
            ;;
        # === 系统 ===
        echo)
            echo "输出文本信息" ;;
        which|where|command)
            echo "查找命令的安装位置" ;;
        env|printenv)
            echo "查看环境变量" ;;
        export)
            echo "设置环境变量" ;;
        source|\.)
            echo "加载配置文件到当前环境" ;;
        cd)
            echo "切换工作目录" ;;
        pwd)
            echo "显示当前目录路径" ;;
        whoami)
            echo "查看当前用户名" ;;
        date)
            echo "显示当前日期时间" ;;
        # === 编译/构建 ===
        make)
            echo "编译构建项目" ;;
        gcc|g\+\+|cc)
            echo "编译 C/C++ 程序" ;;
        cargo)
            local sub=$(echo "$rest" | awk '{print $1}')
            case "$sub" in
                build)        echo "编译 Rust 项目" ;;
                run)          echo "运行 Rust 程序" ;;
                test)         echo "运行 Rust 测试" ;;
                *)            echo "Rust 构建操作" ;;
            esac
            ;;
        go)
            local sub=$(echo "$rest" | awk '{print $1}')
            case "$sub" in
                build)        echo "编译 Go 程序" ;;
                run)          echo "运行 Go 程序" ;;
                test)         echo "运行 Go 测试" ;;
                mod)          echo "管理 Go 模块" ;;
                *)            echo "Go 语言操作" ;;
            esac
            ;;
        # === 编辑器 ===
        code)
            echo "用 VS Code 打开文件" ;;
        vim|vi|nano)
            echo "用终端编辑器打开文件" ;;
        # === 压缩 ===
        tar)
            echo "打包或解压文件" ;;
        zip)
            echo "压缩文件" ;;
        unzip)
            echo "解压 ZIP 文件" ;;
        # === 进程 ===
        ps)
            echo "查看运行中的进程" ;;
        kill)
            echo "终止进程" ;;
        top|htop)
            echo "查看系统资源使用情况" ;;
        # === 默认 ===
        *)
            # 如果命令较短直接显示
            if [ ${#cmd} -le 20 ]; then
                echo "执行系统命令: $cmd"
            else
                echo "执行系统命令"
            fi
            ;;
    esac
}

# 生成提示 - 每条都带小白解释
get_tip() {
    case "$1" in
        "Read")
            if [ -n "$file_path" ]; then
                echo "📖 读取文件: $(short_path "$file_path") — 查看这个文件里写了什么"
            else
                echo "📖 读取完成 — 刚才查看了文件内容"
            fi
            ;;
        "Write")
            if [ -n "$file_path" ]; then
                echo "📝 写入文件: $(short_path "$file_path") — 创建或覆盖这个文件的全部内容"
            else
                echo "📝 写入完成 — 刚才创建/覆盖了文件"
            fi
            ;;
        "Edit"|"MultiEdit")
            if [ -n "$file_path" ]; then
                echo "✏️ 编辑文件: $(short_path "$file_path") — 修改这个文件的部分内容"
            else
                echo "✏️ 编辑完成 — 刚才修改了文件内容"
            fi
            ;;
        "Bash")
            if [ -n "$bash_cmd" ]; then
                # 跳过注释行和空行，取第一条真正的命令
                real_cmd=$(echo "$bash_cmd" | grep -v '^[[:space:]]*#' | grep -v '^[[:space:]]*$' | head -1)
                if [ -z "$real_cmd" ]; then
                    echo "🖥️ 命令执行完成"
                else
                    # 按分隔符拆分多条命令（&&, ||, ;）
                    split_cmd=$(echo "$real_cmd" | sed 's/ && /\n/g; s/ || /\n/g; s/; /\n/g')
                    # 过滤空行
                    split_cmd=$(echo "$split_cmd" | grep -v '^[[:space:]]*$')
                    cmd_count=$(echo "$split_cmd" | grep -c .)
                    if [ "$cmd_count" -le 1 ]; then
                        explain=$(explain_cmd "$real_cmd")
                        echo "🖥️ 执行命令: $real_cmd — $explain"
                    else
                        echo "🖥️ 共${cmd_count}条命令:"
                        idx=1
                        while IFS= read -r line; do
                            [ -z "$line" ] && continue
                            [ "$idx" -gt 3 ] && break
                            explain=$(explain_cmd "$line")
                            echo "  $idx. $line — $explain"
                            idx=$((idx+1))
                        done <<< "$split_cmd"
                        [ "$cmd_count" -gt 3 ] && echo "  ...(还有$((cmd_count-3))条)"
                    fi
                fi
            else
                echo "🖥️ 命令执行完成"
            fi
            ;;
        "Glob")
            if [ -n "$pattern" ]; then
                echo "🔍 搜索文件: \"$pattern\" — 按名称模式查找文件"
            else
                echo "🔍 文件搜索完成"
            fi
            ;;
        "Grep")
            if [ -n "$pattern" ]; then
                echo "🔎 搜索内容: \"$pattern\" — 在文件中搜索包含这段文字的地方"
            else
                echo "🔎 内容搜索完成"
            fi
            ;;
        "Agent")
            echo "🤖 AI助手完成任务 — 派了一个AI小助手去独立处理任务"
            ;;
        "Skill")
            echo "⚡ 技能执行完成 — 使用了一个预设的专业技能"
            ;;
        "Task"|"TaskCreate"|"TaskUpdate"|"TaskGet"|"TaskList")
            echo "📋 任务管理 — 管理和跟踪工作进度"
            ;;
        "TodoWrite")
            echo "📋 待办更新 — 更新工作待办清单"
            ;;
        "EnterPlanMode")
            echo "🤔 进入规划模式 — AI正在仔细思考解决方案"
            ;;
        "ExitPlanMode")
            echo "✅ 规划完成 — AI想好了方案，准备开始执行"
            ;;
        *)
            if [[ "$1" == mcp__* ]]; then
                srv=$(echo "$1" | sed -n 's/mcp__\([^_]*\)__.*/\1/p')
                tool=$(echo "$1" | sed 's/mcp__[^_]*__//')
                if [ -z "$srv" ]; then
                    echo "🔌 外部工具: $1 — 调用了第三方扩展功能"
                else
                    case "$srv" in
                        "context7")       echo "📚 查询文档: $tool — 从官方文档中查找最新资料" ;;
                        "exa")            echo "🌐 网络搜索: $tool — 在互联网上搜索信息" ;;
                        "basic-memory")   echo "🧠 记忆操作: $tool — 读写AI的长期记忆" ;;
                        "Playwright")     echo "🎭 浏览器: $tool — 自动操控网页浏览器" ;;
                        "lark-mcp")       echo "📱 飞书操作: $tool — 操作飞书办公软件" ;;
                        "web_reader")     echo "📖 网页阅读: $tool — 读取网页内容" ;;
                        "4_5v-mcp")       echo "🖼️ 图像处理: $tool — 分析或生成图片" ;;
                        "zai-mcp-server") echo "🤖 AI视觉: $tool — AI图像分析能力" ;;
                        *)                echo "🔌 $srv: $tool — 调用了第三方工具服务" ;;
                    esac
                fi
            else
                echo "✅ $1 — 操作完成"
            fi
            ;;
    esac
}

# JSON 转义
json_escape() {
    local s="$1"
    s="${s//\\/\\\\}"
    s="${s//\"/\\\"}"
    s="${s//$'\n'/\\n}"
    s="${s//$'\t'/\\t}"
    s="${s//$'\r'/\\r}"
    echo "$s"
}

# 主逻辑
if [ -n "$tool_name" ]; then
    tip=$(get_tip "$tool_name")
    if [ -n "$tip" ]; then
        escaped_tip=$(json_escape "🌸 ${tip} 🌸")
        printf '{"systemMessage":"%s"}\n' "$escaped_tip"
    fi
fi

exit 0
