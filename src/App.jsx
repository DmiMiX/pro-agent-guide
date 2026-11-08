import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SlashCommandsSection from './components/SlashCommandsSection';
import CrossCompatibilitySection from './components/CrossCompatibilitySection';
import MigratorTool from './components/MigratorTool';
import PromptsSection from './components/PromptsSection';
import ScriptsSection from './components/ScriptsSection';
import MethodologySection from './components/MethodologySection';
import Footer from './components/Footer';
import { Terminal, ArrowRightLeft, Wrench, MessageSquare, Code, BookOpen, Sparkles, Zap, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeMode, setActiveMode] = useState('unified'); // 'unified' | 'antigravity' | 'claude' | 'codex'
  const [theme, setTheme] = useState('light'); // 'light' | 'dark'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('commands');

  // Sync theme with HTML root tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Global Keyboard Shortcut: Ctrl+K / Cmd+K focuses search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F0EA] dark:bg-[#121215] text-[#1A1A1A] dark:text-[#F4F0EA] transition-colors duration-200">
      {/* Top Header */}
      <Header
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        theme={theme}
        setTheme={setTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-10">
        {/* Hero Clickbait & Pro Banner */}
        <section className="brutal-card p-6 md:p-8 bg-[#FFE600] text-black border-4 border-black relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 bg-black text-[#FFE600] px-3 py-1 font-mono text-xs font-bold uppercase rounded border border-black shadow-[2px_2px_0px_#000]">
              <Zap size={14} /> Ультимативный хаб ИИ-агентов
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display uppercase leading-tight">
              Справочник вайбкодера: От хаоса к архитектуре
            </h1>
            <p className="text-sm md:text-base font-medium leading-relaxed max-w-2xl text-black/90">
              Всё об архитектуре слеш-команд Google Antigravity, stop-хуках, глубоких резонерах и 100% совместимости 
              правил и навыков между Antigravity, Claude Code и кастомными harness-системами.
            </p>

            {/* Quick Feature Pills */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono font-bold">
              <button
                onClick={() => setActiveSection('commands')}
                className="brutal-btn px-3 py-1.5 bg-white text-black hover:bg-black hover:text-[#FFE600]"
              >
                ⚡ 11 Слеш-команд
              </button>
              <button
                onClick={() => setActiveSection('compatibility')}
                className="brutal-btn px-3 py-1.5 bg-white text-black hover:bg-black hover:text-[#FFE600]"
              >
                🔄 Кросс-миграция (.agents ➔ .claude)
              </button>
              <button
                onClick={() => setActiveSection('migrator')}
                className="brutal-btn px-3 py-1.5 bg-[#FF59B3] text-black hover:bg-black hover:text-white"
              >
                🛠️ Интерактивный конвертер
              </button>
              <button
                onClick={() => setActiveSection('prompts')}
                className="brutal-btn px-3 py-1.5 bg-[#38E54D] text-black hover:bg-black hover:text-white"
              >
                💬 Боевые промпты
              </button>
              <button
                onClick={() => setActiveSection('methodology')}
                className="brutal-btn px-3 py-1.5 bg-[#00F0FF] text-black hover:bg-black hover:text-white"
              >
                📖 Манифест вайбкодинга
              </button>
            </div>
          </div>

          {/* Decorative Background Element */}
          <div className="hidden lg:block absolute -right-6 -bottom-10 opacity-15 pointer-events-none select-none font-mono font-black text-9xl text-black">
            /AGY
          </div>
        </section>

        {/* Dynamic Section Navigation Tabs Bar */}
        <section className="flex items-center gap-2 overflow-x-auto pb-2 border-b-2 border-black/10 dark:border-white/10">
          {[
            { id: 'commands', label: 'Слеш-команды Antigravity', icon: Terminal, color: '#FFE600' },
            { id: 'compatibility', label: 'Кросс-совместимость экосистемы', icon: ArrowRightLeft, color: '#00F0FF' },
            { id: 'migrator', label: 'Конвертер правил & навыков', icon: Wrench, color: '#FF59B3' },
            { id: 'prompts', label: 'Каталог боевых промптов', icon: MessageSquare, color: '#38E54D' },
            { id: 'scripts', label: 'Инженерные скрипты', icon: Code, color: '#FFA500' },
            { id: 'methodology', label: 'Манифест вайбкодинга', icon: BookOpen, color: '#FFE600' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`brutal-btn px-4 py-2.5 text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
                  isCurrent
                    ? 'bg-black text-[#FFE600] scale-102 font-extrabold shadow-[4px_4px_0px_#FFE600]'
                    : 'bg-white dark:bg-[#1E1E28] text-black dark:text-white hover:bg-[#FFF9DB] dark:hover:bg-[#282836]'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </section>

        {/* Render Selected View */}
        {activeSection === 'commands' && (
          <SlashCommandsSection activeMode={activeMode} searchQuery={searchQuery} />
        )}

        {activeSection === 'compatibility' && (
          <CrossCompatibilitySection activeMode={activeMode} />
        )}

        {activeSection === 'migrator' && (
          <MigratorTool />
        )}

        {activeSection === 'prompts' && (
          <PromptsSection searchQuery={searchQuery} />
        )}

        {activeSection === 'scripts' && (
          <ScriptsSection searchQuery={searchQuery} />
        )}

        {activeSection === 'methodology' && (
          <MethodologySection />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
