const test = require('node:test');
const assert = require('node:assert/strict');
const { getAppInfo } = require('../src/index.js');
const versionData = require('../version.json');

test('Sanity Check - Application initializes and matches version.json', () => {
  const info = getAppInfo();
  assert.equal(info.name, versionData.name);
  assert.equal(info.version, versionData.version);
  assert.equal(info.status, 'online');
});

test('Sanity Check - Version conforms to Semantic Versioning (SemVer)', () => {
  const semverRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/;
  assert.ok(semverRegex.test(versionData.version), `Version ${versionData.version} is valid SemVer`);
});
