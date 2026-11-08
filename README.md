# ⚡ ProAgent Guide (Git: pro-agent-guide)

> **Интерактивный SPA-справочник вайбкодера и ультимативный хаб ИИ-агентов.**  
> Полное руководство по архитектуре слеш-команд Google Antigravity, перехватчикам остановки (Stop Hooks), глубоким резонерам (/boost, /teamwork) и кросс-совместимости экосистемы (Antigravity `.agents/` + `AGENTS.md`, Claude Code `.claude/` + `CLAUDE.md`, OpenAI Codex и кастомные harness-рантаймы).

![Neo-Brutalism & Y2K Pop](https://image.thum.io/get/width/1280/crop/800/https://neobrutalism.dev)

---

## 🌟 Ключевые возможности приложения

1. **Интерактивный справочник слеш-команд Google Antigravity:**
   - 11 нативных директив: `/plan`, `/grill-me`, `/goal`, `/teamwork`, `/boost`, `/btw`, `/compact`, `/schedule`, `/browser`, `/learn`, `/plugin`.
   - 5 системных навыков: `/generative_ui`, `/automation`, `/antigravity-guide`, `/agy-customizations`, `/migrate-workflows`.
   - Интерактивный **Конструктор стекинга команд** (объединение `/plan /grill-me`, `/goal + stop hook criteria`, `/plan /generative_ui`).
   - Анализ внутренних механизмов: Stop Hooks, Ephemeral Git worktrees, Progressive Disclosure (лимит 500 строк на `SKILL.md`).
   - Анти-паттерны и Pro-советы для каждой команды.

2. **Кросс-совместимость экосистемы ИИ-агентов:**
   - Детальная матрица сравнения по 8 инженерным измерениям: **Antigravity** vs **Claude Code** vs **OpenAI Codex** vs **Custom Harnesses**.
   - Пошаговые сценарии миграции:
     - Claude Code (`.claude/` & `CLAUDE.md`) ➔ Antigravity (`.agents/` & `AGENTS.md`)
     - Antigravity ➔ Claude Code
     - Antigravity / Claude ➔ Кастомный Harness на базе OpenAI Codex
   - **Интерактивный Live-конвертер и линтер правил/навыков:**
     - Валидация байтового лимита (24 КБ для правил Antigravity).
     - Контроль длины `SKILL.md` (до 500 строк, вынос справочников в `references/`).
     - Мгновенная генерация эквивалентных файлов для выбранного агента в 1 клик.

3. **Каталог боевых промптов вайбкодера:**
   - Откалиброванные формулировки для старта фичи (`/plan /grill-me`), доказательного аудита (`/goal`), дебага гонок данных (`/boost`), эстафетной передачи контекста (Baton Pass) и состязательного ревью (Challenger & Auditor).
   - Интерактивная персонализация переменных прямо в карточке промпта.

4. **Инженерные скрипты и автоматизация:**
   - Готовые скрипты для предотвращения регрессий: `check-all.js`, `sync-version.js`, `pack.js`, `hooks.json`.

5. **Методология структурного вайбкодинга:**
   - 3-фазный жизненный цикл фичи (Discovery ➔ Execution ➔ Hygiene & QA).
   - Калибровка безопасности: как приручить скоростной режим **Turbo** через закон `Deny > Ask > Allow`.
   - 5 жестких правил защиты от AI Slop.

6. **Фирменный дизайн Neo-Brutalism & Y2K Pop:**
   - Палитра: холст `#F4F0EA`, контрастные карточки с границей `3px solid #000000`, жесткие тени `box-shadow: 5px 5px 0px #000000`, акценты `#FFE600`, `#FF59B3`, `#38E54D`, `#00F0FF`.
   - Полная поддержка светлой и тёмной темы (WCAG AA).
   - Шрифты: *Space Grotesk* для заголовков, *Plus Jakarta Sans* для текста, *Geist Mono* для кода.

---

## 🚀 Быстрый старт

### Требования
- Node.js v18+ (рекомендуется v20+)
- npm v9+

### Установка и запуск в режиме разработки
```bash
# 1. Установка зависимостей (если еще не установлены)
npm install

# 2. Запуск локального dev-сервера Vite
npm run dev
```
Откройте браузер по адресу: `http://localhost:3000` (или порт, указанный в терминале).

---

## 🛠️ Сборка и контроль качества

```bash
# Сборка production-бандла в dist/ (HTML, CSS, JS)
npm run build

# Комплексный контроль качества (проверка версий, синтаксис JS, unit-тесты)
npm run check-all

# Синхронизация версий из version.json
npm run sync-version

# Сборка релизного ZIP-архива
npm run pack

# Локальный релиз с коммитом и тегом
npm run release

# Полный релиз с автоматической отправкой в GitHub
npm run release -- --push
```

---

## 📁 Структура проекта

```
pro-agent-guide/
├── .agents/                    # Спецификации и правила для Google Antigravity
│   └── rules/                  # Модульные правила
├── .github/
│   └── workflows/              # CI/CD пайплайн релизов GitHub Actions
├── dist/                       # Собранное SPA-приложение и релизные ZIP-архивы
├── scripts/
│   ├── check-all.js            # Комплексный валидатор предрелизной проверки
│   ├── sync-version.js         # Автоматическая синхронизация SemVer
│   ├── pack.js                 # Zero-dependency упаковка ZIP-дистрибутива
│   └── release.js              # 1-click релиз и тегирование
├── src/
│   ├── components/             # Модульные UI-компоненты Neo-Brutalism
│   │   ├── Header.jsx          # Навигация, темы, поиск, выбор режимов
│   │   ├── SlashCommandsSection.jsx # Реестр слеш-команд и конструктор стекинга
│   │   ├── CrossCompatibilitySection.jsx # Матрица экосистем и рецепты миграции
│   │   ├── MigratorTool.jsx    # Live-конвертер и линтер правил/навыков
│   │   ├── PromptsSection.jsx  # Каталог боевых промптов с переменными
│   │   ├── ScriptsSection.jsx  # Автоматизация и harness-скрипты
│   │   ├── MethodologySection.jsx # Манифест вайбкодинга и Turbo-безопасность
│   │   └── Footer.jsx          # Футер с индикаторами версий и GitHub
│   ├── data/                   # Данные и справочные реестры
│   │   ├── slashCommands.js    # База знаний по слеш-командам и навыкам
│   │   ├── crossCompatibility.js # Матрица сравнения экосистем и шаблоны
│   │   ├── promptsCatalog.js   # Боевые промпты для вайбкодинга
│   │   └── scriptsCatalog.js   # Каталог инженерных скриптов
│   ├── App.jsx                 # Главный компонент приложения
│   ├── index.css               # Стили темы Neo-Brutalism и Tailwind CSS v4
│   ├── index.js                # Точка входа для Node.js тестов и getAppInfo()
│   └── main.jsx                # Точка монтирования React 19
├── tests/
│   └── sanity.test.js          # Тесты жизнеспособности (Node.js test runner)
├── AGENTS.md                   # Архитектурный регламент проекта
├── CHANGELOG.md                # Журнал изменений (Keep a Changelog)
├── DESIGN.md                   # Спецификация дизайна Neo-Brutalism Studio
├── package.json                # Манифест проекта и скрипты автоматизации
├── version.json                # Единый источник истины версии (v0.1.0)
└── vite.config.mjs             # Конфигурация Vite с плагинами React и Tailwind v4
```

---

## 📜 Лицензия
MIT License • 2026 **ProAgent Guide** (DmiMiX)
