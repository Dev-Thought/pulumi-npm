const { exec } = require('child_process');
const {
  showNotFoundError,
  showError: _showError
} = require('./installed-correctly-common');
const PULUMI_VERSION = require('../src/pulumi-version.const');

const showError = msg => _showError('installed-correctly-global', msg);

exec('pulumi version', function(err, stdout, stderr) {
  if (err || stderr) {
    showError(err || stderr);
    process.exit(1);
  }
  if (stdout.indexOf('v' + PULUMI_VERSION) === -1) showNotFoundError(showError);
  console.log("Passed test: 'installed-correctly-global'");
});
