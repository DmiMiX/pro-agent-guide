/**
 * Главная точка входа приложения (Application Entrypoint)
 */
function getAppInfo() {
  const versionData = require('../version.json');
  return {
    name: versionData.name,
    version: versionData.version,
    codename: versionData.codename,
    status: 'online'
  };
}

module.exports = { getAppInfo };

if (require.main === module) {
  console.log('App initialized:', getAppInfo());
}
