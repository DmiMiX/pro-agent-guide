import React, { useState } from 'react';
import { SCRIPTS_CATALOG } from '../data/scriptsCatalog';
import { Code, Copy, Check, Terminal, ShieldCheck, PlayCircle } from 'lucide-react';

export default function ScriptsSection({ searchQuery }) {
  const [copiedId, setCopiedId] = useState(null);

  const filteredScripts = SCRIPTS_CATALOG.filter((s) => {
    return (
      !searchQuery ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
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
              <span className="brutal-badge bg-[#38E54D] text-black">Harness Automation</span>
              <span className="text-xs font-mono text-black/60 dark:text-gray-400">Zero-Dependency Engineering</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-black dark:text-white">
              Инженерные скрипты и автоматизация
            </h2>
            <p className="text-sm text-black/70 dark:text-gray-300 mt-1 max-w-3xl">
              Набор автономных скриптов контроля качества, синхронизации версий SemVer, сборки релизов без сторонних библиотек и охранных хуков жизненного цикла <code>hooks.json</code>.
            </p>
          </div>

          <div className="brutal-card-sm p-3 bg-[#FFF9DB] dark:bg-[#282836] shrink-0 text-center">
            <span className="block text-2xl font-black font-mono text-black dark:text-[#FFE600]">{SCRIPTS_CATALOG.length}</span>
            <span className="text-xs font-mono font-bold uppercase text-black/70 dark:text-gray-300">Скрипта в базе</span>
          </div>
        </div>
      </div>

      {/* Scripts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredScripts.map((script) => (
          <div key={script.id} className="brutal-card p-6 bg-white dark:bg-[#1A1A22] flex flex-col justify-between">
            <div>
              {/* Badge & Title */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className="brutal-badge text-black text-[10px]"
                  style={{ backgroundColor: script.badgeColor }}
                >
                  {script.badge}
                </span>
                <span className="text-xs font-mono font-bold bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded text-black/70 dark:text-gray-300">
                  {script.name}
                </span>
              </div>

              <h3 className="text-xl font-bold font-display text-black dark:text-white mb-2 leading-snug">
                {script.title}
              </h3>
              <p className="text-xs text-black/70 dark:text-gray-300 mb-4 leading-relaxed">
                {script.description}
              </p>

              {/* Code Viewer Box */}
              <div className="relative group mb-4">
                <pre className="p-3 bg-black text-[#38E54D] rounded-lg font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto border-2 border-black">
                  {script.code}
                </pre>
              </div>

              {/* Why Needed Box */}
              <div className="p-3 bg-[#FFF9DB] dark:bg-[#282836] rounded border border-black/20 dark:border-white/10 text-xs">
                <strong className="font-mono text-black dark:text-[#FFE600] uppercase block mb-1 flex items-center gap-1">
                  <ShieldCheck size={14} /> Зачем это вайбкодеру:
                </strong>
                <p className="text-black/80 dark:text-gray-300 text-[11px] leading-relaxed">
                  {script.whyNeeded}
                </p>
              </div>
            </div>

            {/* Bottom Copy Button */}
            <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-black/50 dark:text-gray-400">
                Запуск: node {script.name}
              </span>
              <button
                onClick={() => handleCopy(script.code, script.id)}
                className="brutal-btn px-3 py-1.5 bg-[#FFE600] text-black text-xs font-bold flex items-center gap-1.5"
              >
                {copiedId === script.id ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedId === script.id ? 'Скопировано!' : 'Копировать код'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
