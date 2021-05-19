const jaguar = require('jaguar');
const onezip = require('onezip');
const Progress = require('progress');
const isWindows = require('../utils/utils');

/**
 * Unzips a specified file.
 * @param {string} zipDir The directory of the target zip file.
 * @param {string} destDir The destination directory for the unzipped file.
 */
async function unzip(zipDir, destDir) {
  return new Promise(resolve => {
    console.log(`Unpacking archive at ${zipDir}...`);
    console.log(zipDir, destDir);
    const prgbar = new Progress('[:bar] :percent ', { total: 100 });
    const extract = isWindows
      ? onezip.extract(zipDir, destDir)
      : jaguar.extract(zipDir, destDir);

    extract.on('progress', percent => {
      prgbar.tick(percent);
    });

    extract.on('error', error => {
      console.error(`An error occurred while unpacking: ${error}`);
      process.exit(40);
    });

    extract.on('end', function() {
      console.log('Finished unpacking.');
      resolve();
    });
  });
}

module.exports = unzip;
