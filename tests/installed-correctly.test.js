const { execFile } = require('child_process');
const {
  showNotFoundError,
  showError: _showError
} = require('./installed-correctly-common');
const PULUMI_VERSION = require('../src/pulumi-version.const');

const showError = msg => _showError('installed-correctly', msg);

execFile('npm', ['start', '--', 'version'], function(err, stdout) {
  if (err) {
    showError(err);
    process.exit(1);
  }
  if (stdout.indexOf('v' + PULUMI_VERSION) === -1) showNotFoundError(showError);
  console.log("Passed test: 'installed-correctly'");
});
