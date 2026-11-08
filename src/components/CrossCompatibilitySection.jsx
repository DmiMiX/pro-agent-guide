import React, { useState } from 'react';
import { ECOSYSTEM_COMPARISON_MATRIX, MIGRATION_RECIPES } from '../data/crossCompatibility';
import { Layers, ArrowRightLeft, Copy, Check, Terminal, FileCode, Shield, Cpu, ExternalLink } from 'lucide-react';

export default function CrossCompatibilitySection({ activeMode }) {
  const [selectedDimension, setSelectedDimension] = useState(0);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="brutal-card p-6 bg-white dark:bg-[#1A1A22]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="brutal-badge bg-[#00F0FF] text-black">Cross-Agent Standard</span>
              <span className="text-xs font-mono text-black/60 dark:text-gray-400">AGY • Claude • Codex • Custom</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-black dark:text-white">
              Кросс-совместимость экосистемы ИИ-агентов
            </h2>
            <p className="text-sm text-black/70 dark:text-gray-300 mt-1 max-w-3xl">
              Как переносить навыки (<strong>skills</strong>), правила (<strong>rules</strong>) и конфигурации между 
              Google Antigravity (<code>.agents/</code> и <code>AGENTS.md</code>), Claude Code (<code>.claude/</code> и <code>CLAUDE.md</code>), 
              OpenAI Codex и кастомными harness-системами без переписывания с нуля.
            </p>
          </div>

          <div className="brutal-card-sm p-3 bg-[#FFF9DB] dark:bg-[#282836] shrink-0 text-center">
            <span className="block text-2xl font-black font-mono text-black dark:text-[#FFE600]">100%</span>
            <span className="text-xs font-mono font-bold uppercase text-black/70 dark:text-gray-300">Совместимость SKILL.md</span>
          </div>
        </div>

        {/* Golden Standard Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t-2 border-black/10 dark:border-white/10 text-xs">
          <div className="p-3 bg-[#F4F0EA] dark:bg-[#14141A] rounded border-2 border-black">
            <div className="flex items-center gap-2 font-bold font-mono text-black dark:text-[#FFE600] mb-1">
              <FileCode size={16} /> 1. Единый стандарт правил
            </div>
            <p className="text-black/70 dark:text-gray-300">
              <code>AGENTS.md</code> и <code>CLAUDE.md</code> используют чистый Markdown. Вы можете сделать симлинк или объединить файлы — оба агента прочтут архитектурные правила без конфликтов.
            </p>
          </div>

          <div className="p-3 bg-[#F4F0EA] dark:bg-[#14141A] rounded border-2 border-black">
            <div className="flex items-center gap-2 font-bold font-mono text-black dark:text-[#00F0FF] mb-1">
              <Layers size={16} /> 2. Открытый стандарт Agent Skills
            </div>
            <p className="text-black/70 dark:text-gray-300">
              Формат папок <code>skills/&lt;name&gt;/SKILL.md</code> с YAML frontmatter (name, description) и подпапками <code>scripts/</code> и <code>references/</code> является общим эталоном для Antigravity и Claude Code.
            </p>
          </div>

          <div className="p-3 bg-[#F4F0EA] dark:bg-[#14141A] rounded border-2 border-black">
            <div className="flex items-center gap-2 font-bold font-mono text-black dark:text-[#FF59B3] mb-1">
              <Cpu size={16} /> 3. Протокол MCP (Model Context)
            </div>
            <p className="text-black/70 dark:text-gray-300">
              Серверы инструментов из <code>mcp_config.json</code> и <code>.claude/config.json</code> подключаются идентично: одинаковый синтаксис <code>command</code>, <code>args</code> и переменных <code>env</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Comparison Matrix */}
      <div className="brutal-card p-6 bg-white dark:bg-[#1A1A22]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold font-display uppercase tracking-tight text-black dark:text-white flex items-center gap-2">
            <ArrowRightLeft size={20} className="text-[#FFE600]" /> Матрица сравнения платформ
          </h3>
          <span className="text-xs font-mono text-black/50 dark:text-gray-400">
            Выберите параметр для детального аудита
          </span>
        </div>

        {/* Dimension Select Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4">
          {ECOSYSTEM_COMPARISON_MATRIX.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDimension(idx)}
              className={`brutal-btn px-3 py-1.5 text-xs whitespace-nowrap ${
                selectedDimension === idx
                  ? 'bg-black text-[#FFE600] font-bold scale-102'
                  : 'bg-white dark:bg-[#1E1E28] text-black dark:text-white hover:bg-[#FFF9DB]'
              }`}
            >
              {item.feature}
            </button>
          ))}
        </div>

        {/* Selected Dimension Grid */}
        {(() => {
          const current = ECOSYSTEM_COMPARISON_MATRIX[selectedDimension];
          return (
            <div className="space-y-4">
              <div className="text-sm font-bold font-display uppercase tracking-tight text-black dark:text-white">
                Анализ параметра: <span className="text-[#FF59B3]">{current.feature}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Antigravity Card */}
                <div className="brutal-card p-4 bg-[#FFF9DB] dark:bg-[#1E1E26] border-2 border-black flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold font-display text-sm text-black dark:text-white">Google Antigravity</span>
                      <span className="brutal-badge bg-[#FFE600] text-black text-[10px]">{current.antigravity.badge}</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-mono text-black/60 dark:text-gray-400 text-[10px] uppercase block">Расположение:</span>
                        <code className="font-mono font-bold text-black dark:text-white text-[11px] break-all">{current.antigravity.location}</code>
                      </div>
                      <div>
                        <span className="font-mono text-black/60 dark:text-gray-400 text-[10px] uppercase block">Обнаружение:</span>
                        <p className="text-black/80 dark:text-gray-300 text-[11px]">{current.antigravity.discovery}</p>
                      </div>
                      <div>
                        <span className="font-mono text-black/60 dark:text-gray-400 text-[10px] uppercase block">Синтаксис & Лимиты:</span>
                        <p className="text-black/80 dark:text-gray-300 text-[11px]">{current.antigravity.syntax || current.antigravity.budget}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Claude Code Card */}
                <div className="brutal-card p-4 bg-white dark:bg-[#1E1E26] border-2 border-black flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold font-display text-sm text-black dark:text-white">Claude Code</span>
                      <span className="brutal-badge bg-[#FF59B3] text-black text-[10px]">{current.claudeCode.badge}</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-mono text-black/60 dark:text-gray-400 text-[10px] uppercase block">Расположение:</span>
                        <code className="font-mono font-bold text-black dark:text-white text-[11px] break-all">{current.claudeCode.location}</code>
                      </div>
                      <div>
                        <span className="font-mono text-black/60 dark:text-gray-400 text-[10px] uppercase block">Обнаружение:</span>
                        <p className="text-black/80 dark:text-gray-300 text-[11px]">{current.claudeCode.discovery}</p>
                      </div>
                      <div>
                        <span className="font-mono text-black/60 dark:text-gray-400 text-[10px] uppercase block">Синтаксис & Лимиты:</span>
                        <p className="text-black/80 dark:text-gray-300 text-[11px]">{current.claudeCode.syntax || current.claudeCode.budget}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Codex & OpenAI Card */}
                <div className="brutal-card p-4 bg-white dark:bg-[#1E1E26] border-2 border-black flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold font-display text-sm text-black dark:text-white">OpenAI Codex</span>
                      <span className="brutal-badge bg-[#38E54D] text-black text-[10px]">{current.codex.badge}</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-mono text-black/60 dark:text-gray-400 text-[10px] uppercase block">Расположение:</span>
                        <code className="font-mono font-bold text-black dark:text-white text-[11px] break-all">{current.codex.location}</code>
                      </div>
                      <div>
                        <span className="font-mono text-black/60 dark:text-gray-400 text-[10px] uppercase block">Обнаружение:</span>
                        <p className="text-black/80 dark:text-gray-300 text-[11px]">{current.codex.discovery}</p>
                      </div>
                      <div>
                        <span className="font-mono text-black/60 dark:text-gray-400 text-[10px] uppercase block">Синтаксис & Лимиты:</span>
                        <p className="text-black/80 dark:text-gray-300 text-[11px]">{current.codex.syntax || current.codex.budget}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom Harness Card */}
                <div className="brutal-card p-4 bg-white dark:bg-[#1E1E26] border-2 border-black flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold font-display text-sm text-black dark:text-white">Custom Harness</span>
                      <span className="brutal-badge bg-[#00F0FF] text-black text-[10px]">{current.customHarness.badge}</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-mono text-black/60 dark:text-gray-400 text-[10px] uppercase block">Расположение:</span>
                        <code className="font-mono font-bold text-black dark:text-white text-[11px] break-all">{current.customHarness.location}</code>
                      </div>
                      <div>
                        <span className="font-mono text-black/60 dark:text-gray-400 text-[10px] uppercase block">Обнаружение:</span>
                        <p className="text-black/80 dark:text-gray-300 text-[11px]">{current.customHarness.discovery}</p>
                      </div>
                      <div>
                        <span className="font-mono text-black/60 dark:text-gray-400 text-[10px] uppercase block">Синтаксис & Лимиты:</span>
                        <p className="text-black/80 dark:text-gray-300 text-[11px]">{current.customHarness.syntax || current.customHarness.budget}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Migration Recipes Walkthrough */}
      <div className="space-y-4">
        <h3 className="text-2xl font-black font-display tracking-tight text-black dark:text-white flex items-center gap-2">
          <span>📦 Пошаговые сценарии кросс-миграции</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MIGRATION_RECIPES.map((recipe, idx) => (
            <div key={idx} className="brutal-card p-6 bg-white dark:bg-[#1A1A22] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="brutal-badge bg-[#FFE600] text-black text-[10px]">{recipe.difficulty}</span>
                  <div className="text-xs font-mono font-bold text-black/60 dark:text-gray-400">
                    {recipe.from} ➔ {recipe.to}
                  </div>
                </div>

                <h4 className="text-base font-bold font-display text-black dark:text-white mb-4 leading-snug">
                  {recipe.title}
                </h4>

                <div className="space-y-4 text-xs">
                  {recipe.steps.map((st) => (
                    <div key={st.step} className="p-3 bg-[#F4F0EA] dark:bg-[#14141A] rounded border border-black/20 dark:border-white/10">
                      <div className="font-mono font-bold text-black dark:text-[#FFE600] mb-1">
                        Шаг {st.step}: {st.title}
                      </div>
                      <p className="text-black/70 dark:text-gray-300 mb-2 leading-relaxed">
                        {st.action}
                      </p>
                      {st.command && (
                        <div className="p-2 bg-black text-[#FFE600] rounded font-mono text-[11px] flex items-center justify-between">
                          <span className="truncate mr-2">$ {st.command}</span>
                          <button
                            onClick={() => handleCopy(st.command, `cmd-${idx}-${st.step}`)}
                            className="p-1 hover:text-white shrink-0"
                            title="Скопировать команду"
                          >
                            {copiedKey === `cmd-${idx}-${st.step}` ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                          </button>
                        </div>
                      )}
                      {st.codeSnippet && (
                        <pre className="p-2 bg-black text-[#38E54D] rounded font-mono text-[10px] overflow-x-auto">
                          {st.codeSnippet}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 text-right">
                <span className="text-[10px] font-mono text-black/50 dark:text-gray-400">
                  Готово к промышленному применению
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
