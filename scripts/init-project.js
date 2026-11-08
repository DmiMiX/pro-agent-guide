/**
 * Скрипт интерактивной / полуавтоматической персонализации шаблона под новый проект.
 * Запрашивает ключевые параметры и обновляет:
 * - version.json
 * - package.json
 * - README.md
 * - AGENTS.md
 * - .env.example
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rootDir = path.resolve(__dirname, '..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question, defaultVal) {
  return new Promise(resolve => {
    rl.question(`${question} [${defaultVal}]: `, answer => {
      resolve(answer.trim() || defaultVal);
    });
  });
}

async function run() {
  console.log('=============================================================');
  console.log('🌟 Мастер первичной настройки нового проекта (Project Init)');
  console.log('=============================================================\n');

  const name = await ask('1. Название проекта (Product Name)', 'My Awesome App');
  const safeName = name.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const description = await ask('2. Краткое описание проекта', 'Универсальное приложение с чистой архитектурой');
  const projectType = await ask('3. Тип проекта (web / mobile / extension / backend / fullstack)', 'web');
  const techStack = await ask('4. Стек технологий (например: React, Tailwind, Vite)', 'React, Vite, Tailwind');
  const githubRepo = await ask('5. URL репозитория GitHub (если есть)', '');

  console.log('\n⏳ Персонализация файлов шаблона...');

  // 1. version.json
  const vPath = path.join(rootDir, 'version.json');
  const vData = {
    isTemplate: false,
    version: "0.1.0",
    name: name,
    codename: safeName,
    projectType: projectType,
    techStack: techStack,
    releaseDate: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
    description: description
  };
  fs.writeFileSync(vPath, JSON.stringify(vData, null, 2) + '\n', 'utf8');
  console.log('  ✓ version.json обновлен');

  // 2. package.json
  const pPath = path.join(rootDir, 'package.json');
  if (fs.existsSync(pPath)) {
    const pData = JSON.parse(fs.readFileSync(pPath, 'utf8'));
    pData.name = safeName;
    pData.description = description;
    fs.writeFileSync(pPath, JSON.stringify(pData, null, 2) + '\n', 'utf8');
    console.log('  ✓ package.json обновлен');
  }

  // 3. Git remote setup
  if (githubRepo) {
    const { execSync } = require('child_process');
    try {
      execSync('git remote remove origin', { stdio: 'ignore', cwd: rootDir });
    } catch (e) {}
    try {
      execSync(`git remote add origin ${githubRepo}`, { stdio: 'inherit', cwd: rootDir });
      console.log(`  ✓ Привязан GitHub репозиторий: ${githubRepo}`);
    } catch (e) {
      console.warn('  ⚠️ Не удалось привязать remote origin (git не инициализирован):', e.message);
    }
  }

  rl.close();

  console.log('\n🎉 Проект успешно персонализирован!');
  console.log('Следующие шаги:');
  console.log('1. Проверьте и дополните AGENTS.md');
  console.log('2. Запустите: npm run check-all');
  console.log('3. Сделайте первый коммит и отправьте в GitHub!');
}

run();
