import React from 'react';
import { Compass, ShieldCheck, Zap, Layers, AlertOctagon, CheckCircle2, Terminal } from 'lucide-react';

export default function MethodologySection() {
  const phases = [
    {
      phase: "ФАЗА 1",
      title: "Кристаллизация замысла и прототип (до написания кода)",
      color: "#FFE600",
      commands: "/plan /grill-me, /generative_ui",
      desc: "Никогда не начинайте генерацию кода с сырого промпта в режиме Turbo. Запустите связку /plan /grill-me: агент изучит код и задаст серию одиночных вопросов с рекомендациями. При разработке фронтенда запросите интерактивный виджет через /generative_ui прямо в ленту чата, чтобы согласовать UX за 2 минуты.",
      badge: "Discovery"
    },
    {
      phase: "ФАЗА 2",
      title: "Делегирование исполнения по масштабу задачи",
      color: "#38E54D",
      commands: "/goal, /boost, /teamwork",
      desc: "Выберите правильный двигатель: для стандартной фичи включите /goal с проверяемым условием (npm run build с кодом 0); при плавающих багах, гонках данных и утечках памяти вызовите /boost для параллельной проверки гипотез в Git worktrees; для полного переписывания архитектуры — /teamwork с состязательными гейтами (Critic, Challenger, Auditor).",
      badge: "Execution"
    },
    {
      phase: "ФАЗА 3",
      title: "Бесшовный контроль, браузерные тесты и дистилляция опыта",
      color: "#FF59B3",
      commands: "/btw, /browser, /learn, Baton Pass",
      desc: "Задавайте попутные вопросы строго через /btw (0 токенов в основной чат). Проверяйте верстку и UI-баги через встроенный Chrome субагента /browser с записью видео WebM. После каждого ручного исправления ошибки вызывайте /learn для сохранения правил в .agents/rules/. На рубеже 45-50 ходов делайте эстафетную передачу (Baton Pass) в чистый диалог.",
      badge: "Hygiene & QA"
    }
  ];

  const turboPermissionsJson = `{
  "permissions": {
    "allow": [
      "command(git diff)",
      "command(regex:npm run (build|lint|test))",
      "write_file(src/)"
    ],
    "ask": [
      "command(git push)",
      "mcp(sql/execute_mutation)"
    ],
    "deny": [
      "command(rm -rf)",
      "command(sudo)",
      "write_file(.git/)",
      "write_file(/home/user/.ssh)"
    ]
  }
}`;

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="brutal-card p-6 bg-white dark:bg-[#1A1A22]">
        <div className="flex items-center gap-2 mb-2">
          <span className="brutal-badge bg-[#FFA500] text-black">Vibe Coding Manifesto</span>
          <span className="text-xs font-mono text-black/60 dark:text-gray-400">Инженерный регламент</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight font-display text-black dark:text-white mb-2">
          Методология структурного вайбкодинга
        </h2>
        <p className="text-sm text-black/70 dark:text-gray-300 max-w-3xl leading-relaxed">
          Вайбкодинг — это не хаотичный диалог с ИИ-моделью, а управляемый инженерный конвейер. 
          Правильное использование слеш-команд, контекстной гигиены и перехватчиков остановки превращает 
          стохастическую генерацию в предсказуемый и воспроизводимый промышленный процесс.
        </p>
      </div>

      {/* 3-Phase Timeline Cards */}
      <div className="space-y-4">
        <h3 className="text-2xl font-black font-display tracking-tight text-black dark:text-white flex items-center gap-2">
          <Compass size={24} className="text-[#FFE600]" /> 3 Фазы жизненного цикла фичи
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((p, idx) => (
            <div key={idx} className="brutal-card p-6 bg-white dark:bg-[#1A1A22] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="brutal-badge text-black text-[10px]"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.phase}
                  </span>
                  <span className="text-xs font-mono font-bold text-black/60 dark:text-gray-400">
                    {p.badge}
                  </span>
                </div>

                <h4 className="text-lg font-bold font-display text-black dark:text-white mb-2 leading-snug">
                  {p.title}
                </h4>

                <div className="p-2 bg-black text-[#FFE600] rounded font-mono text-xs mb-3">
                  {p.commands}
                </div>

                <p className="text-xs text-black/70 dark:text-gray-300 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-green-700 dark:text-[#38E54D]">
                <CheckCircle2 size={14} /> Контрольный гейт верификации
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Turbo Mode Security Matrix */}
      <div className="brutal-card p-6 bg-white dark:bg-[#1A1A22]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="brutal-badge bg-[#FF3333] text-white">Калибровка безопасности</span>
              <span className="text-xs font-mono font-bold text-black/70 dark:text-gray-300">Принцип Deny &gt; Ask &gt; Allow</span>
            </div>
            <h3 className="text-xl font-bold font-display text-black dark:text-white">
              Как безопасно приручить скоростной режим Turbo
            </h3>
            <p className="text-xs text-black/70 dark:text-gray-300 mt-1 max-w-2xl leading-relaxed">
              В пресете Turbo терминальная песочница отключена, что дает максимальную скорость. 
              Чтобы агент случайно не стер проект командой <code>rm -rf</code> или не перезаписал Git, 
              задайте жесткие правила в <code>settings.json</code>:
            </p>
          </div>

          <div className="p-3 bg-[#FF3333]/15 border-2 border-[#FF3333] rounded-lg text-xs font-mono font-bold text-[#FF3333] shrink-0">
            Запрет (Deny) всегда побеждает!
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <pre className="p-4 bg-black text-[#FFE600] rounded-lg font-mono text-xs leading-relaxed overflow-x-auto border-2 border-black">
            {turboPermissionsJson}
          </pre>

          <div className="space-y-3 text-xs leading-relaxed text-black/80 dark:text-gray-300 flex flex-col justify-center">
            <div className="p-3 bg-[#38E54D]/10 border border-[#38E54D] rounded">
              <strong className="text-black dark:text-white font-mono uppercase block mb-1">
                ✓ Секция "allow":
              </strong>
              Безопасные и частые команды (git diff, npm run build/test). Агент выполняет их мгновенно без подтверждений со стороны человека.
            </div>
            <div className="p-3 bg-[#FFE600]/20 border border-[#FFE600] rounded">
              <strong className="text-black dark:text-white font-mono uppercase block mb-1">
                ⚠️ Секция "ask":
              </strong>
              Операции, требующие осознанности (git push, внешние мутации БД). Агент обязан запросить подтверждение кликом.
            </div>
            <div className="p-3 bg-[#FF3333]/15 border border-[#FF3333] rounded">
              <strong className="text-black dark:text-white font-mono uppercase block mb-1">
                🛑 Секция "deny":
              </strong>
              Категорически запрещенные действия (rm -rf, sudo, доступ к .git/ или SSH-ключам). Блокируются рантаймом намертво.
            </div>
          </div>
        </div>
      </div>

      {/* 5 Hard Anti-Slop Rules */}
      <div className="brutal-card p-6 bg-[#FFF9DB] dark:bg-[#1E1E28]">
        <h3 className="text-xl font-bold font-display uppercase tracking-tight text-black dark:text-white mb-4 flex items-center gap-2">
          <AlertOctagon size={20} className="text-[#FF3333]" /> 5 Золотых правил защиты от AI Slop
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          {[
            {
              num: "01",
              title: "Никаких пустых заглушек",
              desc: "Запрет на TODO, // pass, mock data вместо настоящей бизнес-логики. Код проверяется состязательными тестами."
            },
            {
              num: "02",
              title: "Изоляция ошибок",
              desc: "Любой сетевой запрос или JSON-парсинг обязан быть внутри try/catch. Сбой в виджете не должен крашить приложение."
            },
            {
              num: "03",
              title: "Контраст тем WCAG AA",
              desc: "Запрет белого текста на белом или блеклого серого на тёмном. Проверяйте верстку через /browser на обе темы."
            },
            {
              num: "04",
              title: "Бюджет токенов правил",
              desc: "Не раздувайте AGENTS.md свыше 24 КБ. Переносите объемные пошаговые инструкции в модульные пакеты SKILL.md."
            },
            {
              num: "05",
              title: "Не сжимать посреди правки",
              desc: "Никогда не запускайте /compact при незавершенных правках файла во избежание потери номеров строк и порчи AST."
            }
          ].map((rule) => (
            <div key={rule.num} className="p-3 bg-white dark:bg-[#14141A] rounded border-2 border-black flex flex-col justify-between">
              <div>
                <span className="font-mono font-black text-xl text-[#FF59B3] block mb-1">
                  {rule.num}
                </span>
                <strong className="text-black dark:text-white font-display block mb-1">
                  {rule.title}
                </strong>
                <p className="text-black/70 dark:text-gray-300 text-[11px] leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
