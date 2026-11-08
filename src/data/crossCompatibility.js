/**
 * Архитектурная матрица кросс-совместимости экосистемы ИИ-агентов
 * Сравнение: Google Antigravity vs Claude Code vs Codex/OpenAI vs Custom Harness
 */

export const ECOSYSTEM_COMPARISON_MATRIX = [
  {
    feature: "Файлы правил (Rules)",
    antigravity: {
      location: "AGENTS.md, GEMINI.md, .agents/rules/*.md",
      discovery: "Иерархический обход (walk-up) от CWD до корня репозитория (.git). Правила объединяются и дедуплицируются.",
      syntax: "Стандартный Markdown без обязательного frontmatter для одиночных файлов. Поддерживает @[label](path) включения.",
      budget: "Лимит на файл: 24 КБ (24 000 байт). Общий бюджет правил: 20 000 токенов (defaultRulesBudget). При превышении преобразуются в ссылки-указатели.",
      badge: "AGY Native"
    },
    claudeCode: {
      location: "CLAUDE.md, .claude/rules/*.md (или ~/.claude/CLAUDE.md)",
      discovery: "Поиск в корне проекта CLAUDE.md и в домашней папке пользователя ~/.claude/. Автоматическая инъекция в системный контекст.",
      syntax: "Markdown с лаконичными инструкциями, правилами сборки и стилями кода. Frontmatter опционален.",
      budget: "Строгого байтового лимита нет, но не рекомендуется превышать 15 000 токенов во избежание просадки рассуждений (context bloat).",
      badge: "Claude Standard"
    },
    codex: {
      location: "AGENTS.md, prompt-инструкции в harness-конфигурациях",
      discovery: "Загружается через конфигурацию агента/рантайма (system_prompt / instructions). Нет стандартизированного авто-обхода папок.",
      syntax: "Системные инструкции в формате Plaintext / Markdown с жесткими JSON-схемами.",
      budget: "Ограничено размером системного контекста выбранной модели (128k - 200k токенов).",
      badge: "Harness Driven"
    },
    customHarness: {
      location: ".cursorrules, .windsurfrules, harness_config.json",
      discovery: "Зависит от реализации хардварного или софтверного harness-рантайма (сканирование корня репозитория).",
      syntax: "Смешанный Markdown / XML / JSON.",
      budget: "Задается разработчиком рантайма.",
      badge: "Flexible"
    }
  },
  {
    feature: "Пакеты навыков (Agent Skills)",
    antigravity: {
      location: ".agents/skills/<name>/SKILL.md (глобально: ~/.gemini/config/skills/)",
      discovery: "Авто-сканирование папки .agents/skills/ на один уровень вглубь. Полноценная поддержка открытого формата Agent Skills.",
      syntax: "Обязательный YAML-frontmatter: `name` (lowercase-kebab) и `description` (с фразой 'Use this skill when...'). Тело до 500 строк.",
      structure: "Папки: scripts/ (скрипты), references/ (справочники), examples/ (примеры), resources/ (ассеты).",
      badge: "Open Skill Spec"
    },
    claudeCode: {
      location: ".claude/skills/<name>/SKILL.md (или внутри .claude-plugin/)",
      discovery: "Поддерживается в современных релизах Claude Code CLI и Claude Desktop с аналогичным паттерном прогрессивного раскрытия.",
      syntax: "Идентичный YAML frontmatter (name, description). 100% бинарная и семантическая совместимость со спецификацией Antigravity.",
      structure: "Аналогичная модульная структура (SKILL.md + scripts/ + references/).",
      badge: "100% Совместим"
    },
    codex: {
      location: "Библиотека функций Tools / Custom Function Calling",
      discovery: "Регистрируется как декларации функций в API OpenAI (OpenAI Assistants API / Responses API).",
      syntax: "JSON Schema с описанием параметров и назначения функции вместо Markdown-файлов.",
      structure: "Исполняемый код на Python/Node.js, отдающий текстовый вывод в диалог.",
      badge: "Schema API"
    },
    customHarness: {
      location: "Каталог tools/ или skills/ в harness-репозитории",
      discovery: "Пользовательский лоадер парсит SKILL.md и регистрирует их в системном промпте или локальном MCP-сервере.",
      syntax: "YAML + Markdown или JSON-манифесты.",
      structure: "Произвольная.",
      badge: "Custom Loader"
    }
  },
  {
    feature: "Перехватчики жизненного цикла (Hooks)",
    antigravity: {
      location: ".agents/hooks.json (или внутри плагина plugin/hooks.json)",
      discovery: "Автоматическая загрузка из customization root. Исполняется в agy CLI (в текущих версиях IDE/Desktop хуки CLI-only).",
      syntax: "JSON-конфиг с событиями: PreToolUse, PostToolUse, SessionStart, PreInvocation, PostInvocation, Stop. Поддержка regex-матчеров и таймаутов.",
      budget: "Синхронное или асинхронное выполнение shell-скриптов с кодами возврата.",
      badge: "AGY Native"
    },
    claudeCode: {
      location: ".claude/settings.json или hooks конфигурации Claude CLI",
      discovery: "Загружается рантаймом Claude Code при старте сессии.",
      syntax: "Настройка команд pre-run, post-run линтеров и защитных скриптов (PreToolCall hooks).",
      budget: "Блокирует выполнение опасных команд при ненулевом коде возврата.",
      badge: "CLI Hooks"
    },
    codex: {
      location: "Harness Middleware / Python Event Listeners",
      discovery: "Реализуется программно в коде рантайма (LangChain, LlamaIndex, AutoGen, CrewAI).",
      syntax: "Python / TypeScript колбэки (on_tool_start, on_tool_end, on_llm_start).",
      budget: "Любая логика перехвата.",
      badge: "Code Middleware"
    },
    customHarness: {
      location: "config/hooks.yml или middleware хуки",
      discovery: "Оркестратор вызывает скрипты до/после вызова bash/edit инструментов.",
      syntax: "Shell скрипты с передачей JSON-контекста через STDIN.",
      budget: "Определяется таймаутом процесса.",
      badge: "Harness Native"
    }
  },
  {
    feature: "Протокол контекста модели (MCP Servers)",
    antigravity: {
      location: "mcp_config.json, .agents/mcp_config.json или внутри плагинов",
      discovery: "Нативная поддержка Model Context Protocol. В плагинах серверы автоматически получают префикс пространства имен `<plugin>_<server>`.",
      syntax: "Стандартный JSON: `mcpServers: { name: { command, args, env } }`. Поддержка stdio и sse транспортов.",
      budget: "Инструменты MCP регистрируются в системном каталоге и вызываются моделью на общих основаниях.",
      badge: "MCP Standard"
    },
    claudeCode: {
      location: ".claude/config.json, ~/.claude/mcp.json или Claude Desktop config",
      discovery: "Первоисточник стандарта MCP (создан Anthropic). Полная поддержка всех официальных и сторонних MCP-серверов.",
      syntax: "Идентичный формат mcpServers с command, args и переменными окружения env.",
      budget: "Прогрессивное раскрытие схем инструментов.",
      badge: "MCP Creator"
    },
    codex: {
      location: "Кастомные MCP-клиенты через SDK (mcp-python / mcp-typescript)",
      discovery: "Требует подключения MCP-клиента в коде вашего агента (по умолчанию Codex API не имеет встроенного MCP-клиента).",
      syntax: "Конвертация инструментов MCP в формат JSON Schema OpenAI tools.",
      budget: "Зависит от лимита инструментов модели.",
      badge: "Requires Bridge"
    },
    customHarness: {
      location: "mcp_servers.json",
      discovery: "Harness разворачивает фоновые подпроцессы MCP-серверов через JSON-RPC 2.0 по stdio.",
      syntax: "Стандартный MCP.",
      budget: "Прямой проброс инструментов.",
      badge: "Standardized"
    }
  },
  {
    feature: "Профиль безопасности и песочница",
    antigravity: {
      location: "settings.json (профили Turbo / Auto / Restricted)",
      discovery: "Принцип Deny > Ask > Allow. В режиме Turbo терминальная песочница отключена. В режиме Auto работает OS-level sandbox (Seatbelt / namespaces / AppContainer).",
      syntax: "JSON-матрица правил: allow, ask, deny с поддержкой command(regex:...), write_file(...), mcp(...).",
      budget: "Полная защита хоста даже при скоростном вайбкодинге в Turbo-режиме.",
      badge: "Deny>Ask>Allow"
    },
    claudeCode: {
      location: "Флаги запуска: --dangerously-skip-permissions или интерактивные подтверждения",
      discovery: "По умолчанию запрашивает подтверждение человека на выполнение shell-команд и запись критичных файлов.",
      syntax: "Белые списки разрешенных команд в настройках CLI.",
      budget: "Защита от случайных удалений rm -rf и утечки секретов.",
      badge: "Permission Gate"
    },
    codex: {
      location: "Внешний контейнер Docker / Firecracker microVM",
      discovery: "OpenAI Code Interpreter запускается в изолированной песочнице на серверах OpenAI (или в локальном Docker для кастомных систем).",
      syntax: "Настройки виртуализации и сетевых политик (iptables / cgroups).",
      budget: "Абсолютная изоляция от хост-машины.",
      badge: "Docker / VM"
    },
    customHarness: {
      location: "Docker Compose / Bubblewrap / gVisor",
      discovery: "Разработчик системы изолирует окружение исполнения агента на уровне ядра Linux.",
      syntax: "Конфигурация контейнера с монтированием только рабочей папки проекта.",
      budget: "Максимальный enterprise-уровень защиты.",
      badge: "Containerized"
    }
  },
  {
    feature: "Мультиагентность и фоновые процессы",
    antigravity: {
      location: "/teamwork (Sentinel + Orchestrator + Adversarial Checkers), /boost (worktrees), invoke_subagent tool",
      discovery: "Нативная поддержка роев субагентов. Эфемерные Git worktrees для изоляции черновой работы. Stop hooks для синхронизации.",
      syntax: "Декларация субагентов: role, prompt, model (Flash Lite, Flash, Pro), workspace mode (share, branch, inherit).",
      budget: "Раздельные контекстные окна, защита менеджера через смену агентов-преемников.",
      badge: "Advanced Swarm"
    },
    claudeCode: {
      location: "Встроенный инструмент Task / Subagent в CLI",
      discovery: "Claude Code способен порождать дочерние контексты для исследования кодовой базы или длительных вычислений.",
      syntax: "Инструкция в промпте или автоматический вызов субагента моделью при сложных запросах.",
      budget: "Сворачивание промежуточных результатов в компактное резюме для родительской сессии.",
      badge: "Task Subagent"
    },
    codex: {
      location: "Оркестраторы Multi-Agent (AutoGen, CrewAI, LangGraph)",
      discovery: "Полностью настраиваемая топология агентов: иерархическая, циклическая, дебаты (debates) или конвейер.",
      syntax: "Python-код с описанием узлов (Nodes) и ребер (Edges) графа состояний.",
      budget: "Определяется разработчиком графа агентов.",
      badge: "Graph Orchestrated"
    },
    customHarness: {
      location: "Кастомная шина событий (Event Bus / Redis / RabbitMQ)",
      discovery: "Параллельные процессы воркеров с централизованной очередью задач.",
      syntax: "REST / gRPC / WebSockets.",
      budget: "Enterprise масштабирование.",
      badge: "Distributed"
    }
  }
];

export const MIGRATION_RECIPES = [
  {
    title: "Миграция: Claude Code (.claude/ & CLAUDE.md) ➔ Antigravity (.agents/ & AGENTS.md)",
    from: "Claude Code",
    to: "Antigravity",
    difficulty: "Легкая (5 минут)",
    steps: [
      {
        step: 1,
        title: "Перенос файла правил проекта",
        action: "Создайте симлинк или скопируйте `CLAUDE.md` в корень проекта под именем `AGENTS.md` (или `GEMINI.md`). Antigravity сразу подхватит все архитектурные ограничения.",
        command: "cp CLAUDE.md AGENTS.md"
      },
      {
        step: 2,
        title: "Перенос пакетов навыков (Skills)",
        action: "Папка `.claude/skills/` полностью совместима со стандартом `.agents/skills/`. Достаточно создать символическую ссылку или переместить директории. Убедитесь, что в каждом `SKILL.md` присутствует YAML-заголовок `name` и `description`.",
        command: "mkdir -p .agents && ln -s $(pwd)/.claude/skills .agents/skills"
      },
      {
        step: 3,
        title: "Конвертация MCP-серверов",
        action: "Скопируйте блок `mcpServers` из `.claude/config.json` в `.agents/mcp_config.json` (или `mcp_config.json` в корне). Синтаксис ключей `command`, `args` и `env` идентичен на 100%.",
        command: "cp .claude/mcp.json .agents/mcp_config.json"
      },
      {
        step: 4,
        title: "Настройка хуков безопасности",
        action: "Если в Claude Code использовались pre-run проверки, перенесите их в `.agents/hooks.json` под секцию `PreToolUse` с матчером `run_command`."
      }
    ]
  },
  {
    title: "Миграция: Antigravity (.agents/) ➔ Claude Code (.claude/)",
    from: "Antigravity",
    to: "Claude Code",
    difficulty: "Легкая (5 минут)",
    steps: [
      {
        step: 1,
        title: "Синхронизация правил",
        action: "Создайте `CLAUDE.md` в корне репозитория со ссылкой на `AGENTS.md` или скопируйте содержимое. Рекомендуется вынести ключевые команды сборки и тестов в начало файла.",
        command: "cp AGENTS.md CLAUDE.md"
      },
      {
        step: 2,
        title: "Подключение навыков к Claude Code",
        action: "Claude Code читает навыки из `.claude/skills/`. Создайте симлинк на папку `.agents/skills/`.",
        command: "mkdir -p .claude && ln -s $(pwd)/.agents/skills .claude/skills"
      },
      {
        step: 3,
        title: "Импорт плагинов",
        action: "Если вы упаковали расширения в плагины Antigravity, Claude Code поддерживает импорт структуры через директорию `.claude-plugin/`."
      }
    ]
  },
  {
    title: "Экспорт: Antigravity / Claude Code ➔ Кастомный Harness на базе OpenAI Codex / Python",
    from: "Antigravity / Claude",
    to: "Codex & Custom Harness",
    difficulty: "Средняя (15 минут)",
    steps: [
      {
        step: 1,
        title: "Инъекция AGENTS.md в системный промпт",
        action: "Настройте ваш harness-скрипт на чтение файла `AGENTS.md` при инициализации сессии и добавление его содержимого в системный контекст модели.",
        codeSnippet: "with open('AGENTS.md') as f:\n    system_prompt += '\\n\\n=== WORKSPACE RULES ===\\n' + f.read()"
      },
      {
        step: 2,
        title: "Парсер прогрессивного раскрытия навыков",
        action: "Напишите легкий парсер, который при старте агента читает только frontmatter из `.agents/skills/*/SKILL.md` и внедряет краткий список возможностей в системный промпт. При выборе навыка моделью агент вызывает инструмент чтения полного текста файла.",
        codeSnippet: "# Загружаем метаданные skills: name + description\nskills_index = load_skills_frontmatter('.agents/skills')"
      },
      {
        step: 3,
        title: "Подключение MCP через SDK",
        action: "Используйте официальный Python SDK `@modelcontextprotocol/sdk` для запуска MCP-серверов из `mcp_config.json` и конвертации их инструментов в схему OpenAI Functions.",
        command: "pip install mcp openai"
      }
    ]
  }
];

export const TEMPLATES_FOR_CONVERTER = {
  agentsRule: `# Архитектура и регламент разработки проекта (AGENTS.md)

> Единый источник архитектурных стандартов для Google Antigravity, Claude Code и Codex.

## 1. Фундаментальные инженерные принципы
- **Изоляция модулей**: Каждый функциональный модуль самодостаточен. Ошибки сторонних API и сети обязаны перехватываться внутри модуля.
- **SOLID & DRY**: Четкое разделение ответственности. Общие утилиты выносятся в src/shared/utils/.
- **Контрастность тем**: Поддержка светлой и тёмной темы с первого дня (WCAG AA: текст не менее 4.5:1).

## 2. Безопасность и секреты
- **Строгий запрет** на хардкод API-ключей, паролей и токенов в исходном коде.
- Все секреты читаются строго через переменные окружения (.env).

## 3. Регламент верификации
- Перед завершением любой задачи команда npm run build обязана завершаться с кодом 0.
`,
  skillExample: `---
name: run-e2e-tests
description: >-
  Use this skill when the user asks to run full end-to-end Playwright tests,
  verify cross-browser compatibility, or generate test reports.
---

# E2E Testing Protocol

Руководство по запуску и диагностике сквозных тестов.

## Пошаговый алгоритм
1. Убедитесь, что тестовый dev-сервер запущен:
   \`\`\`bash
   npm run test:e2e:prepare
   \`\`\`
2. Запустите Playwright в headless режиме:
   \`\`\`bash
   npx playwright test
   \`\`\`
3. При падении тестов изучите трассировку:
   \`\`\`bash
   npx playwright show-report
   \`\`\`

## Справочные материалы
- Детальные селекторы и правила моков: [selectors.md](./references/selectors.md)
`,
  hooksExample: `{
  "safety-gate": {
    "enabled": true,
    "PreToolUse": [
      {
        "matcher": "run_command",
        "hooks": [
          {
            "type": "command",
            "command": "./scripts/safety-check.sh",
            "timeout": 15
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "write_file",
        "hooks": [
          {
            "type": "command",
            "command": "npm run check-all"
          }
        ]
      }
    ]
  }
}`
};
