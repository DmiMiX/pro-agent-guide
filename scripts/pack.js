/**
 * Автоматическая сборка релизного ZIP-архива в папку dist/.
 * Создает архив дистрибутива с именем: [projectName]-v[version].zip
 * Не требует внешних npm-зависимостей (использует PowerShell Compress-Archive на Windows / zip на Unix).
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const versionJsonPath = path.join(rootDir, 'version.json');
const versionData = JSON.parse(fs.readFileSync(versionJsonPath, 'utf8'));

const version = versionData.version;
const rawName = versionData.name || 'project';
const safeName = rawName.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

const distDir = path.join(rootDir, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const archiveName = `${safeName}-v${version}.zip`;
const archivePath = path.join(distDir, archiveName);

console.log(`📦 Упаковка релизного архива: ${archiveName}...`);

if (fs.existsSync(archivePath)) {
  fs.unlinkSync(archivePath);
}

// Папки и файлы для упаковки (если есть src или extension или dist-web)
let sourceFolder = 'src';
if (fs.existsSync(path.join(rootDir, 'extension'))) {
  sourceFolder = 'extension';
} else if (fs.existsSync(path.join(rootDir, 'build'))) {
  sourceFolder = 'build';
} else if (fs.existsSync(path.join(rootDir, 'src'))) {
  sourceFolder = 'src';
}

const isWindows = process.platform === 'win32';

try {
  if (isWindows) {
    // Используем нативный PowerShell Compress-Archive
    const psCmd = `powershell.exe -NoProfile -Command "Compress-Archive -Path '${path.join(rootDir, sourceFolder, '*')}' -DestinationPath '${archivePath}' -Force"`;
    execSync(psCmd, { stdio: 'inherit', cwd: rootDir });
  } else {
    execSync(`cd "${path.join(rootDir, sourceFolder)}" && zip -r "${archivePath}" . -x "*.DS_Store*"`, { stdio: 'inherit' });
  }

  const stat = fs.statSync(archivePath);
  const sizeKb = (stat.size / 1024).toFixed(1);
  console.log(`🎉 Релизный архив успешно собран!`);
  console.log(`   Файл: dist/${archiveName} (${sizeKb} KB)`);
} catch (e) {
  console.warn(`⚠️ Предупреждение: Не удалось упаковать архив: ${e.message}`);
}
