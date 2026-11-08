/**
 * Инженерные скрипты и средства автоматизации рабочего процесса вайбкодера
 */

export const SCRIPTS_CATALOG = [
  {
    id: "check-all",
    name: "scripts/check-all.js",
    title: "Комплексный валидатор качества (Quality Assurance Gate)",
    description: "Многоступенчатая автоматическая проверка перед каждым коммитом: синхронизация версий, синтаксический аудит node --check и встроенные тесты.",
    category: "quality",
    badge: "Anti-Regression",
    badgeColor: "#38E54D",
    code: `const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Запуск комплексной проверки качества проекта...');
const rootDir = path.resolve(__dirname, '..');

// 1. Проверка синхронизации версий
const vJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'version.json'), 'utf8'));
const pJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
if (vJson.version !== pJson.version) {
  console.error(\`❌ Рассинхронизация версий: \${vJson.version} !== \${pJson.version}\`);
  process.exit(1);
}
console.log(\`  ✓ Версии согласованы: v\${vJson.version}\`);

// 2. Валидация синтаксиса JavaScript файлов
function getJsFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      if (!['node_modules', 'dist', '.git'].includes(file)) results.push(...getJsFiles(full));
    } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
      results.push(full);
    }
  });
  return results;
}

const jsFiles = [...getJsFiles(path.join(rootDir, 'scripts')), ...getJsFiles(path.join(rootDir, 'src'))];
for (const file of jsFiles) {
  execSync(\`node --check "\${file}"\`, { stdio: 'pipe' });
  console.log(\`  ✓ \${path.relative(rootDir, file)}\`);
}

// 3. Запуск автоматических тестов
execSync('node --test tests/**/*.test.js', { stdio: 'inherit', cwd: rootDir });
console.log('\\n🎉 ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ УСПЕШНО!');`,
    whyNeeded: "Гарантирует, что случайные опечатки, сломанные импорты или забытые правки не попадут в Git."
  },
  {
    id: "sync-version",
    name: "scripts/sync-version.js",
    title: "Единый источник истины для версий (Single Source of Truth)",
    description: "Автоматически распространяет номер версии из version.json в package.json, манифесты расширений и мобильные конфигурации.",
    category: "versioning",
    badge: "SemVer",
    badgeColor: "#FFE600",
    code: `const fs = require('fs');
const path = require('path');
const rootDir = path.resolve(__dirname, '..');

const versionData = JSON.parse(fs.readFileSync(path.join(rootDir, 'version.json'), 'utf8'));
const newVersion = versionData.version;
console.log(\`🔄 Синхронизация версии: v\${newVersion}...\`);

// Обновление package.json
const pkgPath = path.join(rootDir, 'package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.version = newVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\\n');
  console.log(\`  ✓ package.json -> \${newVersion}\`);
}

// Обновление манифеста расширения
const manifestPath = path.join(rootDir, 'extension/manifest.json');
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.version = newVersion;
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\\n');
  console.log(\`  ✓ extension/manifest.json -> \${newVersion}\`);
}
console.log(\`🎉 Синхронизация версий завершена: v\${newVersion}\`);`,
    whyNeeded: "Исключает рассинхронизацию релизных номеров версий между магазинами приложений, npm и Git-тегами."
  },
  {
    id: "pack",
    name: "scripts/pack.js",
    title: "Бескомпромиссная упаковка ZIP-дистрибутива",
    description: "Сборка готового архива dist/[projectName]-v[version].zip без сторонних npm-зависимостей через встроенный PowerShell или zip.",
    category: "packaging",
    badge: "Zero-Deps",
    badgeColor: "#00F0FF",
    code: `const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const vData = JSON.parse(fs.readFileSync(path.join(rootDir, 'version.json'), 'utf8'));
const distDir = path.join(rootDir, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

const archiveName = \`\${vData.codename}-v\${vData.version}.zip\`;
const archivePath = path.join(distDir, archiveName);
if (fs.existsSync(archivePath)) fs.unlinkSync(archivePath);

const sourceFolder = fs.existsSync(path.join(rootDir, 'dist')) ? 'dist' : 'src';
if (process.platform === 'win32') {
  execSync(\`powershell.exe -NoProfile -Command "Compress-Archive -Path '\${path.join(rootDir, sourceFolder, '*')}' -DestinationPath '\${archivePath}' -Force"\`, { stdio: 'inherit' });
} else {
  execSync(\`cd "\${path.join(rootDir, sourceFolder)}" && zip -r "\${archivePath}" .\`, { stdio: 'inherit' });
}
console.log(\`🎉 Релизный архив: dist/\${archiveName}\`);`,
    whyNeeded: "Формирует готовый артефакт релиза для прикрепления к GitHub Releases через CI/CD."
  },
  {
    id: "hooks-json",
    name: ".agents/hooks.json",
    title: "Охранные хуки жизненного цикла (Safety Gates)",
    description: "Перехватчик PreToolUse и PostToolUse для терминального клиента agy CLI: блокировка опасных команд и авто-линтер после правок.",
    category: "security",
    badge: "Lifecycle Hook",
    badgeColor: "#FF59B3",
    code: `{
  "destructive-command-shield": {
    "enabled": true,
    "PreToolUse": [
      {
        "matcher": "run_command",
        "hooks": [
          {
            "type": "command",
            "command": "node scripts/safety-shield.js",
            "timeout": 5
          }
        ]
      }
    ]
  },
  "auto-quality-gate": {
    "enabled": true,
    "PostToolUse": [
      {
        "matcher": "write_file",
        "hooks": [
          {
            "type": "command",
            "command": "npm run check-all"
          }
        ]
      }
    ]
  }
}`,
    whyNeeded: "Не дает агенту в режиме Turbo случайно запустить rm -rf, повредить .git/ или отправить недопустимые мутации."
  }
];
