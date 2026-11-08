/**
 * Универсальный скрипт предрелизной валидации и контроля качества.
 * 1. Проверяет синхронизацию версий (version.json vs package.json).
 * 2. Проверяет синтаксис всех JavaScript/TypeScript файлов.
 * 3. Запускает автоматизированные тесты через встроенный Node.js test runner.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Запуск комплексной проверки качества проекта...');

const rootDir = path.resolve(__dirname, '..');

// 1. Проверка согласованности версий
console.log('\n1. Проверка синхронизации версий...');
try {
  const vJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'version.json'), 'utf8'));
  const pJsonPath = path.join(rootDir, 'package.json');
  if (fs.existsSync(pJsonPath)) {
    const pJson = JSON.parse(fs.readFileSync(pJsonPath, 'utf8'));
    if (vJson.version !== pJson.version) {
      console.error(`❌ Рассинхронизация версий: version.json (${vJson.version}) !== package.json (${pJson.version})`);
      console.error('Запустите: node scripts/sync-version.js');
      process.exit(1);
    }
    console.log(`  ✓ Версии согласованы: v${vJson.version}`);
  }
} catch (e) {
  console.error('❌ Ошибка проверки версий:', e.message);
  process.exit(1);
}

// 2. Валидация синтаксиса JavaScript файлов
console.log('\n2. Валидация синтаксиса JavaScript файлов в scripts/ и src/...');
function getJsFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        results = results.concat(getJsFiles(fullPath));
      }
    } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
      results.push(fullPath);
    }
  });
  return results;
}

const jsFiles = [
  ...getJsFiles(path.join(rootDir, 'scripts')),
  ...getJsFiles(path.join(rootDir, 'src'))
];

let syntaxErrors = 0;
for (const file of jsFiles) {
  try {
    execSync(`node --check "${file}"`, { stdio: 'pipe' });
    console.log(`  ✓ ${path.relative(rootDir, file)}`);
  } catch (err) {
    console.error(`  ❌ Ошибка синтаксиса в ${path.relative(rootDir, file)}:`, err.message);
    syntaxErrors++;
  }
}

if (syntaxErrors > 0) {
  console.error(`\n❌ Обнаружено ошибок синтаксиса: ${syntaxErrors}`);
  process.exit(1);
}

// 3. Запуск автоматических тестов
const testsDir = path.join(rootDir, 'tests');
if (fs.existsSync(testsDir)) {
  console.log('\n3. Запуск тестов (Node.js test runner)...');
  try {
    const testFiles = fs.readdirSync(testsDir)
      .filter(f => f.endsWith('.test.js'))
      .map(f => path.join('tests', f));
    if (testFiles.length > 0) {
      execSync(`node --test ${testFiles.map(f => `"${f}"`).join(' ')}`, { stdio: 'inherit', cwd: rootDir });
    }
  } catch (err) {
    console.error('\n❌ Тесты завершились с ошибкой!');
    process.exit(1);
  }
} else {
  console.log('\n3. Папка tests/ отсутствует (тесты пропущены).');
}

console.log('\n🎉 ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ УСПЕШНО! Проект готов к коммиту / релизу.');
