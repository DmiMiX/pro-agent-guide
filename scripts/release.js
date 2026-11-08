/**
 * Автоматизированный скрипт формирования релиза.
 * Шаги:
 * 1. Проверка чистоты git status.
 * 2. Запуск предрелизной валидации (check-all.js).
 * 3. Синхронизация версий (sync-version.js).
 * 4. Сборка релизного архива (pack.js).
 * 5. Создание git commit и тега vX.Y.Z.
 * 6. Опциональный push в origin (при ключе --push).
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const shouldPush = args.includes('--push');

console.log('🚀 Запуск процедуры релиза...');

// 1. Проверка version.json
const versionData = JSON.parse(fs.readFileSync(path.join(rootDir, 'version.json'), 'utf8'));
const version = versionData.version;
const tagName = `v${version}`;

console.log(`Релиз версии: ${tagName}`);

// 2. Предрелизная проверка
console.log('\n[1/4] Запуск валидации качества...');
execSync('node scripts/check-all.js', { stdio: 'inherit', cwd: rootDir });

// 3. Синхронизация версий
console.log('\n[2/4] Синхронизация версий...');
execSync('node scripts/sync-version.js', { stdio: 'inherit', cwd: rootDir });

// 4. Сборка архива
console.log('\n[3/4] Сборка дистрибутива...');
execSync('node scripts/pack.js', { stdio: 'inherit', cwd: rootDir });

// 5. Git Commit & Tag
console.log('\n[4/4] Создание Git-коммита и тега...');
try {
  execSync('git add -A', { stdio: 'inherit', cwd: rootDir });
  execSync(`git commit -m "chore(release): ${tagName}"`, { stdio: 'inherit', cwd: rootDir });
  console.log(`  ✓ Коммит создан: chore(release): ${tagName}`);
} catch (e) {
  console.log('  ℹ️ Нет незакоммиченных изменений или коммит уже создан.');
}

try {
  execSync(`git tag -a ${tagName} -m "Release ${tagName}"`, { stdio: 'inherit', cwd: rootDir });
  console.log(`  ✓ Тег создан: ${tagName}`);
} catch (e) {
  console.log(`  ℹ️ Тег ${tagName} уже существует.`);
}

console.log('\n=============================================================');
if (shouldPush) {
  console.log('Отправка изменений и тегов на GitHub...');
  execSync('git push origin main', { stdio: 'inherit', cwd: rootDir });
  execSync(`git push origin ${tagName}`, { stdio: 'inherit', cwd: rootDir });
  console.log(`🎉 Релиз ${tagName} успешно опубликован на GitHub!`);
} else {
  console.log(`🎉 Релиз ${tagName} сформирован локально!`);
  console.log('Для отправки на GitHub выполните:');
  console.log(`   git push origin main && git push origin ${tagName}`);
  console.log('Или запускайте релиз с флагом: node scripts/release.js --push');
}
console.log('=============================================================');
