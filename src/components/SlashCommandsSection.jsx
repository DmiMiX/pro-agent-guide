import React, { useState } from 'react';
import { SLASH_COMMANDS_DATA } from '../data/slashCommands';
import { Terminal, Copy, Check, AlertTriangle, Layers, Zap, Info, ShieldAlert, Play } from 'lucide-react';

export default function SlashCommandsSection({ activeMode, searchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState('plan');
  const [copiedId, setCopiedId] = useState(null);

  // Command Builder State
  const [builderGoal, setBuilderGoal] = useState('new_feature');
  const [builderInput, setBuilderInput] = useState('Добавить JWT аутентификацию с Redis кэшем');

  const categories = [
    { id: 'all', label: 'Все команды и навыки', count: SLASH_COMMANDS_DATA.length },
    { id: 'discovery', label: '01. Discovery & План', count: 3 },
    { id: 'execution', label: '02. Автономия (/goal & /teamwork)', count: 2 },
    { id: 'deep_reasoning', label: '03. Глубокий резонинг (/boost)', count: 1 },
    { id: 'hygiene', label: '04. Гигиена контекста (/btw, /compact)', count: 2 },
    { id: 'verification', label: '05. Верификация (/browser, /schedule)', count: 2 },
    { id: 'extension', label: '06. Системные навыки & Плагины', count: 6 }
  ];

  const filteredCommands = SLASH_COMMANDS_DATA.filter((cmd) => {
    // Category match
    const matchCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
    // Search match
    const matchSearch =
      !searchQuery ||
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.syntax.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.mechanic.toLowerCase().includes(searchQuery.toLowerCase());

    // Agent mode filter: if 'claude' is active, highlight cross-compatibility or show native equivalents
    return matchCategory && matchSearch;
  });

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Generate Stacked Command
  const getStackedCommand = () => {
    switch (builderGoal) {
      case 'new_feature':
        return `/plan /grill-me ${builderInput}`;
      case 'autonomous_fix':
        return `/goal ${builderInput} и добейся чтобы 'npm run build' завершался с кодом 0`;
      case 'deep_bug':
        return `/boost ${builderInput}`;
      case 'ui_prototype':
        return `/plan /generative_ui ${builderInput}`;
      case 'context_hygiene':
        return `/compact Сохрани активные схемы API и строгие запреты`;
      default:
        return `/plan /grill-me ${builderInput}`;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="brutal-card p-6 bg-white dark:bg-[#1A1A22]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="brutal-badge bg-[#FFE600] text-black">Antigravity Architecture</span>
              <span className="text-xs font-mono text-black/60 dark:text-gray-400">Google AGY v2.24+</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-black dark:text-white">
              Архитектура слеш-команд & Навыков
            </h2>
            <p className="text-sm text-black/70 dark:text-gray-300 mt-1 max-w-3xl">
              В Google Antigravity символ <code className="bg-black text-[#FFE600] px-1 py-0.5 rounded font-mono font-bold">/</code> объединяет два класса сущностей: 
              <strong> Системные директивы управления рантаймом</strong> (изменяют цикл исполнения, активируют Stop Hooks и Git worktrees) и 
              <strong> Подключаемые навыки (Agent Skills)</strong> по открытому стандарту SKILL.md.
            </p>
          </div>

          {/* Quick Stat Sticker */}
          <div className="brutal-card-sm p-3 bg-[#FFF9DB] dark:bg-[#282836] shrink-0 text-center">
            <span className="block text-2xl font-black font-mono text-black dark:text-[#FFE600]">11 + 5</span>
            <span className="text-xs font-mono font-bold uppercase text-black/70 dark:text-gray-300">Директив и навыков</span>
          </div>
        </div>

        {/* Ecosystem Mode Callout */}
        {activeMode === 'claude' && (
          <div className="mt-4 p-3 bg-[#FF59B3]/10 border-2 border-[#FF59B3] rounded-lg text-xs flex items-start gap-2">
            <Zap className="text-[#FF59B3] shrink-0 mt-0.5" size={16} />
            <div>
              <strong className="text-black dark:text-white">Экосистема Claude Code:</strong> В Claude Code директивы вроде <code>/plan</code> и <code>/goal</code> заменяются текстовыми префиксами в промпте и встроенными агентами Tasks, тогда как навыки <code>SKILL.md</code> имеют 100% бинарную совместимость!
            </div>
          </div>
        )}

        {activeMode === 'codex' && (
          <div className="mt-4 p-3 bg-[#38E54D]/10 border-2 border-[#38E54D] rounded-lg text-xs flex items-start gap-2">
            <Info className="text-[#38E54D] shrink-0 mt-0.5" size={16} />
            <div>
              <strong className="text-black dark:text-white">Codex / Custom Harness:</strong> В кастомных рантаймах механика <code>/goal</code> реализуется через stop-хуки в цикле агента (while not verified), а <code>/boost</code> — через фоновые потоки или Celery/Redis воркеры.
            </div>
          </div>
        )}
      </div>

      {/* Interactive Command Stacker Sandbox */}
      <div className="brutal-card p-6 bg-[#FFF9DB] dark:bg-[#22222D]">
        <div className="flex items-center gap-2 mb-3">
          <Terminal size={20} className="text-black dark:text-[#FFE600]" />
          <h3 className="text-lg font-bold font-display uppercase tracking-tight text-black dark:text-white">
            ⚡ Интерактивный конструктор стекинга слеш-команд
          </h3>
        </div>
        <p className="text-xs text-black/70 dark:text-gray-300 mb-4">
          Стекинг — это объединение нескольких слеш-команд через пробел в одном запросе. Выберите сценарий разработки:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
          {[
            { id: 'new_feature', label: '🚀 Старт новой фичи', desc: '/plan /grill-me' },
            { id: 'autonomous_fix', label: '🎯 Автономная цель', desc: '/goal + audit' },
            { id: 'deep_bug', label: '🔬 Сложный баг / гонка', desc: '/boost worktrees' },
            { id: 'ui_prototype', label: '🎨 UI прототипирование', desc: '/plan /generative_ui' },
            { id: 'context_hygiene', label: '🧹 Сброс контекста', desc: '/compact safe' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setBuilderGoal(item.id)}
              className={`brutal-btn p-2 text-left text-xs ${
                builderGoal === item.id
                  ? 'bg-black text-[#FFE600]'
                  : 'bg-white dark:bg-[#1A1A22] text-black dark:text-white'
              }`}
            >
              <div className="font-bold">{item.label}</div>
              <div className="text-[10px] opacity-70 font-mono mt-0.5">{item.desc}</div>
            </button>
          ))}
        </div>

        {/* Input & Output */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-mono font-bold uppercase mb-1 text-black/70 dark:text-gray-300">
              Формулировка задачи вайбкодера:
            </label>
            <input
              type="text"
              value={builderInput}
              onChange={(e) => setBuilderInput(e.target.value)}
              className="brutal-input w-full p-2.5 text-sm font-mono bg-white dark:bg-[#1A1A22] text-black dark:text-white"
              placeholder="Опишите задачу..."
            />
          </div>

          <div className="p-3 bg-black text-[#FFE600] rounded-lg border-2 border-black flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="font-mono text-sm break-all">
              <span className="text-white/60 mr-2">$ agy prompt &gt;</span>
              <span className="font-bold">{getStackedCommand()}</span>
            </div>
            <button
              onClick={() => handleCopy(getStackedCommand(), 'builder')}
              className="brutal-btn px-4 py-1.5 bg-[#FFE600] text-black text-xs font-bold shrink-0 flex items-center gap-1.5"
            >
              {copiedId === 'builder' ? <Check size={14} /> : <Copy size={14} />}
              {copiedId === 'builder' ? 'Скопировано!' : 'Копировать'}
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`brutal-btn px-3 py-1.5 text-xs whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-black text-[#FFE600] scale-102 font-bold'
                : 'bg-white dark:bg-[#1A1A22] text-black dark:text-white hover:bg-[#FFF9DB] dark:hover:bg-[#282836]'
            }`}
          >
            {cat.label}
            <span className="ml-1.5 px-1.5 py-0.2 bg-black/10 dark:bg-white/10 rounded-full font-mono text-[10px]">
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Commands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCommands.map((cmd) => {
          const isExpanded = expandedId === cmd.id;
          return (
            <div
              key={cmd.id}
              className={`brutal-card transition-all flex flex-col justify-between ${
                isExpanded ? 'ring-3 ring-black dark:ring-[#FFE600]' : ''
              }`}
            >
              <div className="p-6">
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="brutal-badge text-black"
                      style={{ backgroundColor: cmd.badgeColor }}
                    >
                      {cmd.badge}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 bg-black/5 dark:bg-white/10 rounded font-semibold text-black/70 dark:text-gray-300">
                      {cmd.tier}
                    </span>
                  </div>
                  <span className="text-xs font-mono uppercase text-black/50 dark:text-gray-400">
                    {cmd.type === 'native' ? 'Директива' : 'Навык'}
                  </span>
                </div>

                {/* Command Name & Short Desc */}
                <h3 className="text-2xl font-black font-mono tracking-tight text-black dark:text-white mb-2 flex items-center justify-between">
                  <span>{cmd.name}</span>
                  <button
                    onClick={() => handleCopy(cmd.syntax, cmd.id)}
                    className="brutal-btn p-1.5 bg-white dark:bg-[#282836] text-black dark:text-white hover:bg-[#FFE600]"
                    title="Копировать синтаксис"
                  >
                    {copiedId === cmd.id ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  </button>
                </h3>

                <p className="text-xs text-black/80 dark:text-gray-300 leading-relaxed mb-4">
                  {cmd.shortDesc}
                </p>

                {/* Syntax Code Pill */}
                <div className="p-2.5 bg-black text-[#FFE600] rounded-md font-mono text-xs mb-4 flex items-center justify-between">
                  <span className="truncate pr-2">{cmd.syntax}</span>
                  <span className="text-[10px] text-white/50 uppercase shrink-0">Syntax</span>
                </div>

                {/* Expanded Deep Dive Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t-2 border-black/10 dark:border-white/10 space-y-4 text-xs">
                    {/* Architectural Mechanic */}
                    <div>
                      <strong className="font-mono text-black dark:text-[#FFE600] uppercase block mb-1">
                        ⚙️ Архитектурный механизм:
                      </strong>
                      <p className="text-black/70 dark:text-gray-300 leading-relaxed bg-[#F4F0EA] dark:bg-[#14141A] p-2.5 rounded border border-black/20 dark:border-white/10">
                        {cmd.mechanic}
                      </p>
                    </div>

                    {/* Stop Hook & Progressive Disclosure */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="p-2.5 bg-[#FFF9DB] dark:bg-[#282836] rounded border border-black/20 dark:border-white/10">
                        <strong className="font-mono text-black dark:text-white uppercase block mb-1">
                          🛑 Stop Hook:
                        </strong>
                        <p className="text-black/80 dark:text-gray-300 text-[11px]">
                          {cmd.stopHook}
                        </p>
                      </div>
                      <div className="p-2.5 bg-[#00F0FF]/10 dark:bg-[#00F0FF]/20 rounded border border-black/20 dark:border-white/10">
                        <strong className="font-mono text-black dark:text-white uppercase block mb-1">
                          📦 Контекст & Disclosure:
                        </strong>
                        <p className="text-black/80 dark:text-gray-300 text-[11px]">
                          {cmd.progressiveDisclosure}
                        </p>
                      </div>
                    </div>

                    {/* Stacking Recipes */}
                    {cmd.stacking && cmd.stacking.length > 0 && (
                      <div>
                        <strong className="font-mono text-black dark:text-[#FFE600] uppercase block mb-1">
                          🔗 Рецепты стекинга:
                        </strong>
                        <div className="space-y-2">
                          {cmd.stacking.map((stk, idx) => (
                            <div
                              key={idx}
                              className="p-2 bg-white dark:bg-[#1E1E28] border-2 border-black rounded flex items-center justify-between gap-2"
                            >
                              <div className="font-mono text-[11px] text-black dark:text-white">
                                <span className="font-bold text-[#FF59B3] mr-1">&gt;</span>
                                {stk.combo}
                                <div className="text-[10px] text-black/60 dark:text-gray-400 font-sans mt-0.5">
                                  {stk.description}
                                </div>
                              </div>
                              <button
                                onClick={() => handleCopy(stk.combo, `stk-${cmd.id}-${idx}`)}
                                className="brutal-btn p-1 bg-[#FFE600] text-black shrink-0 text-[10px]"
                                title="Скопировать комбо"
                              >
                                {copiedId === `stk-${cmd.id}-${idx}` ? <Check size={12} /> : <Copy size={12} />}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Anti-Pattern Alert */}
                    <div className="p-2.5 bg-[#FF3333]/10 border-2 border-[#FF3333] rounded text-black dark:text-white">
                      <div className="flex items-center gap-1.5 font-bold text-[#FF3333] mb-0.5">
                        <ShieldAlert size={14} /> <span>АНТИ-ПАТТЕРН (ОПАСНОСТЬ):</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">{cmd.antiPattern}</p>
                    </div>

                    {/* Pro Tip */}
                    <div className="p-2 bg-[#38E54D]/10 border border-[#38E54D] rounded text-black dark:text-white text-[11px]">
                      <strong className="text-green-700 dark:text-[#38E54D]">💡 Pro Tip: </strong>
                      {cmd.proTip}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Action Footer */}
              <div className="px-6 py-3 bg-[#F4F0EA] dark:bg-[#14141A] border-t-2 border-black/10 dark:border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : cmd.id)}
                  className="text-xs font-mono font-bold uppercase text-black dark:text-[#FFE600] hover:underline"
                >
                  {isExpanded ? '▲ Свернуть архитектуру' : '▼ Развернуть детали и стекинг'}
                </button>
                <button
                  onClick={() => handleCopy(cmd.syntax, `bot-${cmd.id}`)}
                  className="brutal-btn px-2.5 py-1 bg-[#FFE600] text-black text-xs font-bold flex items-center gap-1"
                >
                  {copiedId === `bot-${cmd.id}` ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedId === `bot-${cmd.id}` ? 'Скопировано' : 'Синтаксис'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
