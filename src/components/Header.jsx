import React from 'react';
import { Sparkles, Moon, Sun, Search, Terminal, Zap, Cpu, Layers } from 'lucide-react';

export default function Header({
  activeMode,
  setActiveMode,
  theme,
  setTheme,
  searchQuery,
  setSearchQuery,
  activeSection,
  setActiveSection
}) {
  const modes = [
    { id: 'unified', label: '🌟 Единый гайд (Unified)', icon: Layers, color: '#FFE600' },
    { id: 'antigravity', label: '🪐 Antigravity', icon: Terminal, color: '#00F0FF' },
    { id: 'claude', label: '⚡ Claude Code', icon: Zap, color: '#FF59B3' },
    { id: 'codex', label: '🧠 Codex & Harness', icon: Cpu, color: '#38E54D' }
  ];

  const navLinks = [
    { id: 'commands', label: 'Слеш-команды' },
    { id: 'compatibility', label: 'Кросс-совместимость' },
    { id: 'migrator', label: '🛠️ Конвертер правил' },
    { id: 'prompts', label: 'Каталог промптов' },
    { id: 'scripts', label: 'Скрипты рантайма' },
    { id: 'methodology', label: 'Манифест вайбкодинга' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F4F0EA] dark:bg-[#121215] border-b-4 border-black transition-colors duration-200">
      {/* Top Banner */}
      <div className="bg-[#FFE600] text-black px-4 py-2 border-b-2 border-black flex flex-wrap items-center justify-between text-xs md:text-sm font-bold tracking-tight">
        <div className="flex items-center gap-2">
          <span className="bg-black text-[#FFE600] px-2 py-0.5 rounded-sm uppercase tracking-wider font-mono">v0.1.0</span>
          <span>⚡ PRO-AGENT GUIDE: ИНТЕРАКТИВНЫЙ СПРАВОЧНИК ВАЙБКОДЕРА</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs">
          <span>Antigravity v2.24+</span>
          <span>•</span>
          <span>Claude Code 100% Compat</span>
          <span>•</span>
          <span>Neo-Brutalism UI</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & Subtitle */}
          <div className="flex items-center justify-between">
            <div className="cursor-pointer" onClick={() => setActiveSection('commands')}>
              <div className="flex items-center gap-2">
                <span className="text-2xl md:text-3xl font-extrabold tracking-tighter uppercase font-display bg-black text-[#FFE600] px-2 py-0.5 border-2 border-black">
                  PRO-AGENT
                </span>
                <span className="text-2xl md:text-3xl font-extrabold tracking-tighter uppercase font-display text-black dark:text-white">
                  GUIDE
                </span>
              </div>
              <p className="text-xs text-black/70 dark:text-gray-300 font-mono mt-0.5">
                Архитектура агентов • Слеш-команды • Кросс-миграция
              </p>
            </div>

            {/* Mobile Theme Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="brutal-btn p-2 bg-white dark:bg-[#1A1A22] text-black dark:text-white"
                title="Переключить тему"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50 dark:text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск команды, промпта, скрипта или /директивы..."
              className="brutal-input w-full pl-10 pr-12 py-2 text-sm bg-white dark:bg-[#1A1A22] text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-gray-500 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold bg-black text-white px-1.5 py-0.5 rounded"
              >
                ✕
              </button>
            )}
          </div>

          {/* Desktop Theme Toggle & GitHub Status */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="brutal-btn px-3 py-2 bg-white dark:bg-[#1A1A22] text-black dark:text-white text-xs flex items-center gap-1.5"
              title="Переключить тему (Светлая / Тёмная)"
            >
              {theme === 'light' ? (
                <>
                  <Moon size={16} /> <span className="font-mono">DARK</span>
                </>
              ) : (
                <>
                  <Sun size={16} className="text-[#FFE600]" /> <span className="font-mono text-[#FFE600]">LIGHT</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* View Mode Switcher (Unified vs Agent-Specific) */}
        <div className="mt-4 pt-3 border-t-2 border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs font-mono font-bold uppercase text-black/60 dark:text-gray-400 mr-2 flex items-center gap-1">
              <Sparkles size={14} className="text-[#FFE600]" /> Режим:
            </span>
            {modes.map((m) => {
              const Icon = m.icon;
              const isActive = activeMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMode(m.id)}
                  className={`brutal-btn px-3 py-1 text-xs whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-black text-[#FFE600] scale-102 font-extrabold'
                      : 'bg-white dark:bg-[#1E1E28] text-black dark:text-white hover:bg-[#FFF9DB] dark:hover:bg-[#282836]'
                  }`}
                >
                  <Icon size={14} className="mr-1.5 inline-block" />
                  {m.label}
                </button>
              );
            })}
          </div>

          {/* Section Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full text-xs font-mono font-bold">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveSection(link.id)}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  activeSection === link.id
                    ? 'bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                    : 'text-black/70 dark:text-gray-300 hover:text-black dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
