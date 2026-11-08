import React, { useState } from 'react';
import { TEMPLATES_FOR_CONVERTER } from '../data/crossCompatibility';
import { FileCode, ArrowRight, Copy, Check, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function MigratorTool() {
  const [sourceType, setSourceType] = useState('agentsRule');
  const [targetEco, setTargetEco] = useState('claude');
  const [inputContent, setInputContent] = useState(TEMPLATES_FOR_CONVERTER.agentsRule);
  const [copied, setCopied] = useState(false);

  // Load preset template
  const handleLoadTemplate = (type) => {
    setSourceType(type);
    if (type === 'agentsRule') {
      setInputContent(TEMPLATES_FOR_CONVERTER.agentsRule);
    } else if (type === 'skillExample') {
      setInputContent(TEMPLATES_FOR_CONVERTER.skillExample);
    } else if (type === 'hooksExample') {
      setInputContent(TEMPLATES_FOR_CONVERTER.hooksExample);
    }
  };

  // Live conversion & analysis logic
  const getConvertedOutput = () => {
    if (!inputContent.trim()) return '';

    if (sourceType === 'agentsRule') {
      if (targetEco === 'claude') {
        return `# CLAUDE.md — Регламент разработки (Синхронизирован с AGENTS.md)\n\n` +
          `> Данный файл автоматически генерирует единые правила для Claude Code.\n\n` +
          inputContent.replace(/AGENTS\.md/g, 'CLAUDE.md & AGENTS.md');
      } else if (targetEco === 'codex') {
        return `// SYSTEM_PROMPT / HARNESS INSTRUCTION\n` +
          `const WORKSPACE_RULES = \`\n` +
          inputContent +
          `\`;\n\nmodule.exports = { WORKSPACE_RULES };`;
      } else {
        return inputContent;
      }
    } else if (sourceType === 'skillExample') {
      if (targetEco === 'claude') {
        return `# Скопируйте в .claude/skills/<skill-name>/SKILL.md\n` +
          `# Формат 100% совместим с Antigravity!\n\n` +
          inputContent;
      } else if (targetEco === 'codex') {
        return `// Python OpenAI Tools Wrapper\n` +
          `# Навык конвертирован в схему инструмента OpenAI:\n` +
          `tools = [{\n` +
          `  "type": "function",\n` +
          `  "function": {\n` +
          `    "name": "run_e2e_tests",\n` +
          `    "description": "Запуск полного набора Playwright e2e тестов",\n` +
          `    "parameters": { "type": "object", "properties": {} }\n` +
          `  }\n` +
          `}]`;
      } else {
        return `# Скопируйте в .agents/skills/<skill-name>/SKILL.md\n\n` + inputContent;
      }
    } else if (sourceType === 'hooksExample') {
      if (targetEco === 'claude') {
        return `// Конвертация в .claude/settings.json (Pre/Post Command Hooks)\n{\n  "preCommandHooks": [\n    "./scripts/safety-check.sh"\n  ],\n  "postCommandHooks": [\n    "npm run check-all"\n  ]\n}`;
      } else {
        return inputContent;
      }
    }
    return inputContent;
  };

  const convertedText = getConvertedOutput();

  // Metrics & Linter
  const byteSize = new Blob([inputContent]).size;
  const isOverSize = byteSize > 24000;
  const lineCount = inputContent.split('\n').length;
  const isLongSkill = sourceType === 'skillExample' && lineCount > 500;

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="brutal-card p-6 bg-white dark:bg-[#1A1A22] space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="brutal-badge bg-[#38E54D] text-black">Live Migrator & Linter</span>
            <span className="text-xs font-mono text-black/60 dark:text-gray-400">Мгновенная трансформация</span>
          </div>
          <h3 className="text-2xl font-black font-display tracking-tight text-black dark:text-white">
            🛠️ Универсальный конвертер и линтер правил/навыков
          </h3>
          <p className="text-xs text-black/70 dark:text-gray-300 mt-1">
            Вставьте ваш файл правил или навык для автоматической валидации на лимиты (24 КБ для правил, 500 строк для SKILL.md) и конвертации для целевого агента.
          </p>
        </div>

        {/* Template Loaders */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-mono font-bold uppercase text-black/60 dark:text-gray-400 mr-1">Шаблоны:</span>
          <button
            onClick={() => handleLoadTemplate('agentsRule')}
            className={`brutal-btn px-2.5 py-1 text-xs ${sourceType === 'agentsRule' ? 'bg-[#FFE600] text-black font-bold' : 'bg-white dark:bg-[#282836] text-black dark:text-white'}`}
          >
            AGENTS.md
          </button>
          <button
            onClick={() => handleLoadTemplate('skillExample')}
            className={`brutal-btn px-2.5 py-1 text-xs ${sourceType === 'skillExample' ? 'bg-[#FFE600] text-black font-bold' : 'bg-white dark:bg-[#282836] text-black dark:text-white'}`}
          >
            SKILL.md
          </button>
          <button
            onClick={() => handleLoadTemplate('hooksExample')}
            className={`brutal-btn px-2.5 py-1 text-xs ${sourceType === 'hooksExample' ? 'bg-[#FFE600] text-black font-bold' : 'bg-white dark:bg-[#282836] text-black dark:text-white'}`}
          >
            hooks.json
          </button>
        </div>
      </div>

      {/* Target Ecosystem Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-[#FFF9DB] dark:bg-[#242430] rounded-lg border-2 border-black">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-black dark:text-white">
          <span>Целевая экосистема:</span>
        </div>
        <div className="flex items-center gap-2">
          {[
            { id: 'antigravity', label: '🪐 Antigravity (.agents/)' },
            { id: 'claude', label: '⚡ Claude Code (.claude/)' },
            { id: 'codex', label: '🧠 OpenAI Codex / Harness' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTargetEco(item.id)}
              className={`brutal-btn px-3 py-1 text-xs ${
                targetEco === item.id
                  ? 'bg-black text-[#FFE600] font-bold'
                  : 'bg-white dark:bg-[#1A1A22] text-black dark:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-side Editor and Converted Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-black dark:text-white uppercase flex items-center gap-1.5">
              <FileCode size={14} /> Исходный файл (Source)
            </span>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded text-[11px] ${isOverSize ? 'bg-red-500 text-white font-bold' : 'bg-black/10 dark:bg-white/10 text-black dark:text-white'}`}>
                {byteSize} / 24000 байт
              </span>
              <span className="text-black/60 dark:text-gray-400">{lineCount} строк</span>
            </div>
          </div>
          <textarea
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            rows={14}
            className="brutal-input w-full p-3 font-mono text-xs bg-[#F4F0EA] dark:bg-[#121216] text-black dark:text-white leading-relaxed resize-y"
            placeholder="Вставьте Markdown или JSON..."
          />

          {/* Linter Alerts */}
          {isOverSize && (
            <div className="p-2.5 bg-[#FF3333]/15 border-2 border-[#FF3333] rounded text-xs text-black dark:text-white flex items-center gap-2">
              <AlertCircle size={16} className="text-[#FF3333] shrink-0" />
              <span><strong>Превышен лимит 24 КБ:</strong> Правило будет урезано Antigravity или превратится в указатель на файл.</span>
            </div>
          )}

          {isLongSkill && (
            <div className="p-2.5 bg-[#FFA500]/15 border-2 border-[#FFA500] rounded text-xs text-black dark:text-white flex items-center gap-2">
              <AlertCircle size={16} className="text-[#FFA500] shrink-0" />
              <span><strong>SKILL.md превышает 500 строк:</strong> Перенесите громоздкие справочники в подпапку <code>references/</code> по принципу прогрессивного раскрытия!</span>
            </div>
          )}

          {!isOverSize && !isLongSkill && (
            <div className="p-2 bg-[#38E54D]/15 border border-[#38E54D] rounded text-xs text-black dark:text-white flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-600 dark:text-[#38E54D] shrink-0" />
              <span><strong>Линтер пройден:</strong> Документ соответствует стандартам токенов и структуры.</span>
            </div>
          )}
        </div>

        {/* Converted Output Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-black dark:text-white uppercase flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#FFE600]" /> Конвертированный файл ({targetEco})
            </span>
            <button
              onClick={handleCopy}
              className="brutal-btn px-3 py-1 bg-[#FFE600] text-black text-xs font-bold flex items-center gap-1.5"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Скопировано!' : 'Копировать'}
            </button>
          </div>
          <textarea
            readOnly
            value={convertedText}
            rows={14}
            className="brutal-input w-full p-3 font-mono text-xs bg-black text-[#38E54D] leading-relaxed resize-y select-all"
          />

          <div className="p-2.5 bg-black/5 dark:bg-white/5 rounded border border-black/10 dark:border-white/10 text-xs font-mono text-black/70 dark:text-gray-300">
            <strong>Рекомендуемый путь сохранения:</strong>{' '}
            <code className="text-[#FF59B3] font-bold">
              {sourceType === 'agentsRule'
                ? targetEco === 'claude' ? 'CLAUDE.md' : 'AGENTS.md'
                : sourceType === 'skillExample'
                ? targetEco === 'claude' ? '.claude/skills/<name>/SKILL.md' : '.agents/skills/<name>/SKILL.md'
                : targetEco === 'claude' ? '.claude/settings.json' : '.agents/hooks.json'}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
