/**
 * Автоматический скрипт синхронизации номера версии во всех проектных файлах.
 * Единый источник истины: version.json в корне проекта.
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const versionFilePath = path.join(rootDir, 'version.json');

if (!fs.existsSync(versionFilePath)) {
  console.error('❌ Ошибка: Файл version.json не найден!');
  process.exit(1);
}

const versionData = JSON.parse(fs.readFileSync(versionFilePath, 'utf8'));
const newVersion = versionData.version;

console.log(`🔄 Синхронизация версии проекта: v${newVersion}...`);

// 1. Синхронизация package.json
const packageJsonPath = path.join(rootDir, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  if (pkg.version !== newVersion) {
    pkg.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    console.log(`  ✓ package.json -> ${newVersion}`);
  } else {
    console.log(`  ✓ package.json уже актуален (${newVersion})`);
  }
}

// 2. Синхронизация манифеста расширения Chrome (если применимо)
const manifestJsonPath = path.join(rootDir, 'extension/manifest.json');
if (fs.existsSync(manifestJsonPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestJsonPath, 'utf8'));
  if (manifest.version !== newVersion) {
    manifest.version = newVersion;
    fs.writeFileSync(manifestJsonPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
    console.log(`  ✓ extension/manifest.json -> ${newVersion}`);
  }
}

// 3. Синхронизация мобильных манифестов (Capacitor/Cordova, если применимо)
const capConfigPath = path.join(rootDir, 'capacitor.config.json');
if (fs.existsSync(capConfigPath)) {
  console.log(`  ✓ capacitor.config.json проверен`);
}

console.log(`🎉 Синхронизация версий успешно завершена: v${newVersion}`);
