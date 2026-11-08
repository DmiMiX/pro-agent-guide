---
version: "1.0.0"
brand: "NeoBrutalism Studio"
mood: "Энергичный, бескомпромиссный, гипер-контрастный, анти-корпоративный"
source_url: "https://neobrutalism.dev"
live_url: "https://neobrutalism.dev"
screenshots:
  - title: "Neo-Brutalism & Y2K Pop — Visual Design Reference"
    url: "https://image.thum.io/get/width/1280/crop/800/https://neobrutalism.dev"
    caption: "Визуальный референс интерфейса neobrutalism.ui: 1px hairline и цветовая иерархия."
colors:
  canvas: "#F4F0EA"
  surface-card: "#FFFFFF"
  surface-muted: "#FFF9DB"
  surface-3: "#FFE600"
  surface-4: "#FF59B3"
  hairline: "#000000"
  hairline-strong: "#000000"
  primary: "#FFE600"
  primary-hover: "#FFDE1A"
  on-primary: "#000000"
  ink: "#000000"
  body: "#1A1A1A"
  muted: "#555555"
  semantic-success: "#38E54D"
  semantic-warning: "#FFA500"
  semantic-danger: "#FF3333"
typography:
  display-xl:
    font: "Space Grotesk, sans-serif, sans-serif"
    size: "68px"
    weight: "600"
    tracking: "-2.0px"
    line-height: "1.05"
  display-lg:
    font: "Space Grotesk, sans-serif, sans-serif"
    size: "48px"
    weight: "600"
    tracking: "-1.5px"
    line-height: "1.1"
  headline:
    font: "Space Grotesk, sans-serif, sans-serif"
    size: "24px"
    weight: "600"
    tracking: "-0.5px"
    line-height: "1.25"
  body-md:
    font: "Plus Jakarta Sans, sans-serif, sans-serif"
    size: "15px"
    weight: "400"
    tracking: "0px"
    line-height: "1.5"
  mono:
    font: "Geist Mono, monospace, monospace"
    size: "13px"
    weight: "500"
    features: "tabular-nums"
radii:
  xs: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  pill: "9999px"
elevation:
  mode: "hard-shadow"
  border: "1px solid #000000"
  shadows: "none"
---

# Brand & Interface Specification: NeoBrutalism Studio

## 1. Identity & Mood
Интерфейс NeoBrutalism Studio спроектирован в духе современной инженерной эстетики.
Энергичный, бескомпромиссный, гипер-контрастный, анти-корпоративный
Глубина формируется за счет контраста поверхностей и тонких разделителей 1px вместо размытых теней (drop-shadows).

### Первоисточники и референсы:
- **Ссылка на референс (Refero / Каталог):** [https://neobrutalism.dev](https://neobrutalism.dev)
- **Официальный живой сайт:** [https://neobrutalism.dev](https://neobrutalism.dev)

### Визуальные референсы и скриншоты (Ground Truth)
> [!IMPORTANT]
> ИИ-агенты (Google Antigravity, Claude Code, Cursor) обязаны сверяться с визуальными референсами при генерации макетов для предотвращения шаблонизации (AI slop).

- ![Neo-Brutalism & Y2K Pop — Visual Design Reference](https://image.thum.io/get/width/1280/crop/800/https://neobrutalism.dev)
  *Визуальный референс интерфейса neobrutalism.ui: 1px hairline и цветовая иерархия.*

## 2. Color Palette & Surface Hierarchy
Иерархия поверхностей строится от базового холста к модальным окнам:
- **Базовый холст ({colors.canvas}):** `#F4F0EA`.
- **Основная карточка ({colors.surface-card}):** `#FFFFFF`.
- **Вторичная подложка / Hover ({colors.surface-muted}):** `#FFF9DB`.
- **Граница и разделители ({colors.hairline}):** `#000000`.

**Правило применения акцентного цвета:**
Электро-желтый #FFE600 и нео-розовый #FF59B3 привлекают 100% внимания к действию.
Акцентный цвет `#FFE600` зарезервирован строго для главных интерактивных элементов.

## 3. Typography Scale & Negative Tracking
- Заголовок Display XL получает обязательный отрицательный трекинг `-2.0px`.
- Заголовок Display LG получает трекинг `-1.5px`.
- Основной текст выводится гарнитурой `Plus Jakarta Sans, sans-serif` с комфортной высотой строки.
- Все числа, показатели метрик и коды используют гарнитуру `Geist Mono, monospace` с `tabular-nums`.

## 4. Geometry, Elevation & Hairline Borders
- Режим глубины: **1px Hairline Borders**.
- Скругления:
  - Бейджи: `4px`
  - Кнопки и поля ввода: `8px`
  - Карточки: `12px`
  - Табы и овалы: `9999px`
- Запрет на использование размытых теней (`shadow-lg`, `shadow-2xl`).

## 5. Component Foundations
- **Primary Button:** Фон `#FFE600`, текст `#000000`, скругление `8px`.
- **Card Container:** Фон `#FFFFFF`, рамка 1px `#000000`, скругление `12px`.
- **Input Field:** Фон `#F4F0EA`, рамка `#000000`, фокус `#000000`.

## 6. Constraints: Hard Anti-Slop Rules (Do's & Don'ts)
- ❌ **DON'T:**
  - Никаких дефолтных фиолетовых и сине-зеленых градиентов на фонах.
  - Никаких шрифтов Inter, Roboto или Arial по умолчанию.
  - Никаких тяжелых размытых теней (`shadow-lg`).
  - Никаких оберток карточками для каждого тривиального текстового блока.
- ✅ **DO:**
  - Строить контраст через лестницу фонов и однопиксельные hairline границы.
  - Использовать отрицательный letter-spacing для крупных заголовков.
  - Все цвета читать исключительно через CSS-переменные `var(--...)`.