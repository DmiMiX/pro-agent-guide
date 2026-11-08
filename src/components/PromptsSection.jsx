import React, { useState } from 'react';
import { PROMPTS_CATALOG } from '../data/promptsCatalog';
import { MessageSquare, Copy, Check, Sparkles, Filter, Edit3 } from 'lucide-react';

export default function PromptsSection({ searchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [customVariables, setCustomVariables] = useState({});

  const categories = [
    { id: 'all', label: 'Все промпты' },
    { id: 'discovery', label: '01. Архитектура & План' },
    { id: 'execution', label: '02. Автономное исполнение' },
    { id: 'deep_reasoning', label: '03. Глубокий резонинг' },
    { id: 'hygiene', label: '04. Гигиена памяти' },
    { id: 'verification', label: '05. Контроль качества' }
  ];

  const filteredPrompts = PROMPTS_CATALOG.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.template.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleVariableChange = (promptId, varName, value) => {
    setCustomVariables((prev) => ({
      ...prev,
      [`${promptId}_${varName}`]: value
    }));
  };

  const getResolvedPrompt = (prompt) => {
    let text = prompt.template;
    prompt.variables.forEach((v) => {
      const val = customVariables[`${prompt.id}_${v.name}`] || `[${v.name}]`;
      text = text.replace(new RegExp(`\\[${v.name}\\]`, 'g'), val);
    });
    return text;
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="brutal-card p-6 bg-white dark:bg-[#1A1A22]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="brutal-badge bg-[#FF59B3] text-black">Battle-Tested</span>
              <span className="text-xs font-mono text-black/60 dark:text-gray-400">Промпты для вайбкодинга</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-black dark:text-white">
              Каталог боевых промптов вайбкодера
            </h2>
            <p className="text-sm text-black/70 dark:text-gray-300 mt-1 max-w-3xl">
              Специально откалиброванные инженерные формулировки для постановки задач ИИ-агентам. 
              Предотвращают галлюцинации, активируют внутренние Stop Hooks, защищают от амнезии сжатия и заставляют модель писать надежный промышленный код.
            </p>
          </div>

          <div className="brutal-card-sm p-3 bg-[#FFF9DB] dark:bg-[#282836] shrink-0 text-center">
            <span className="block text-2xl font-black font-mono text-black dark:text-[#FFE600]">{PROMPTS_CATALOG.length}</span>
            <span className="text-xs font-mono font-bold uppercase text-black/70 dark:text-gray-300">Промпт-шаблонов</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`brutal-btn px-3 py-1.5 text-xs whitespace-nowrap ${
              selectedCategory === c.id
                ? 'bg-black text-[#FFE600] font-bold scale-102'
                : 'bg-white dark:bg-[#1A1A22] text-black dark:text-white hover:bg-[#FFF9DB]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Prompt Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrompts.map((prompt) => {
          const resolvedText = getResolvedPrompt(prompt);
          return (
            <div key={prompt.id} className="brutal-card p-6 bg-white dark:bg-[#1A1A22] flex flex-col justify-between">
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="brutal-badge text-black text-[10px]"
                    style={{ backgroundColor: prompt.badgeColor }}
                  >
                    {prompt.badge}
                  </span>
                  <span className="text-xs font-mono text-black/60 dark:text-gray-400">
                    {prompt.categoryLabel}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-black dark:text-white mb-2 leading-snug">
                  {prompt.title}
                </h3>
                <p className="text-xs text-black/70 dark:text-gray-300 mb-4 leading-relaxed">
                  {prompt.description}
                </p>

                {/* Interactive Variables Form (if any) */}
                {prompt.variables.length > 0 && (
                  <div className="mb-4 p-3 bg-[#FFF9DB] dark:bg-[#252532] rounded-lg border border-black/20 dark:border-white/10 space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-black dark:text-[#FFE600] uppercase">
                      <Edit3 size={12} /> Персонализация параметров:
                    </div>
                    {prompt.variables.map((v) => (
                      <div key={v.name}>
                        <label className="block text-[10px] font-mono uppercase text-black/60 dark:text-gray-400 mb-0.5">
                          {v.name}:
                        </label>
                        <input
                          type="text"
                          value={customVariables[`${prompt.id}_${v.name}`] || ''}
                          onChange={(e) => handleVariableChange(prompt.id, v.name, e.target.value)}
                          placeholder={v.placeholder}
                          className="brutal-input w-full p-2 text-xs font-mono bg-white dark:bg-[#1A1A22] text-black dark:text-white"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Prompt Template Box */}
                <div className="relative group">
                  <pre className="p-3 bg-black text-[#FFE600] rounded-lg font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                    {resolvedText}
                  </pre>
                </div>

                {/* Agent Pro Tip */}
                <div className="mt-3 p-2 bg-[#F4F0EA] dark:bg-[#14141A] rounded border border-black/10 dark:border-white/10 text-[11px] text-black/70 dark:text-gray-300">
                  <strong className="text-black dark:text-white">Инженерный эффект:</strong> {prompt.agentTip}
                </div>
              </div>

              {/* Bottom Copy Button */}
              <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-black/50 dark:text-gray-400">
                  Готово к вставке в Antigravity / Claude
                </span>
                <button
                  onClick={() => handleCopy(resolvedText, prompt.id)}
                  className="brutal-btn px-3 py-1.5 bg-[#FFE600] text-black text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedId === prompt.id ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedId === prompt.id ? 'Скопировано!' : 'Копировать промпт'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
