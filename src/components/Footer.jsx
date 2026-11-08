import React from 'react';
import { CheckCircle, Shield, Sparkles, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 bg-white dark:bg-[#121215] border-t-4 border-black text-black dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display font-black text-lg bg-black text-[#FFE600] px-2 py-0.5 border border-black">
                PRO-AGENT
              </span>
              <span className="font-display font-black text-lg">
                GUIDE
              </span>
              <span className="brutal-badge bg-[#38E54D] text-black text-[10px]">
                v0.1.0 Online
              </span>
            </div>
            <p className="text-xs text-black/70 dark:text-gray-400 font-mono">
              Справочник вайбкодера & Хаб ИИ-Агентов • Google Antigravity & Claude Code & OpenAI Codex
            </p>
          </div>

          {/* Golden Template Standards Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="brutal-badge bg-[#FFE600] text-black flex items-center gap-1">
              <CheckCircle size={12} /> Golden Template
            </span>
            <span className="brutal-badge bg-[#00F0FF] text-black flex items-center gap-1">
              <Shield size={12} /> Anti-Regression Checklist
            </span>
            <span className="brutal-badge bg-[#FF59B3] text-black flex items-center gap-1">
              <Terminal size={12} /> Zero-Dependency Scripts
            </span>
          </div>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/DmiMiX/pro-agent-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn px-4 py-2 bg-black text-white dark:bg-[#FFE600] dark:text-black text-xs font-bold flex items-center gap-2 hover:scale-102"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub Repository</span>
          </a>
        </div>

        <div className="mt-6 pt-4 border-t-2 border-black/10 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] font-mono text-black/60 dark:text-gray-400">
          <div>
            Разработано на базе эталонного шаблона проекта с архитектурным регламентом AGENTS.md.
          </div>
          <div>
            Лицензия MIT • 2026 ProAgent Guide
          </div>
        </div>
      </div>
    </footer>
  );
}
