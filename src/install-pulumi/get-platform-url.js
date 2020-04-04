const getLatestPulumiVersion = require('../pulumi-version');

// Pulumi download source contants
const PULUMI_ZIP_URIS = {
  DARWIN: 'darwin-x64.tar.gz',
  LINUX: 'linux-x64.tar.gz',
  WINDOWS: 'windows-x64.tar.gz'
};

/**
 * Notify the user that their platform and architecture isn't compatible with
 *   this package.
 * @param {string} platform
 * @param {string} arch
 */
function notifyIncompatible(platform, arch) {
  console.error(
    `Unfortunately, your platform and architecture (${platform}, ${arch}) ` +
      "isn't currently supported by Pulumi. Please uninstall this package."
  );
}

/**
 * Match the platfrom and arch to a key in `TF_ZIP_URIS`.
 * @param {string} platform
 * @param {string} arch
 * @see TF_ZIP_URIS
 */
function matchPlatformToKey(platform, arch) {
  // prettier-ignore
  function errorOut() { notifyIncompatible(platform, arch); process.exit(10); }

  if (arch !== 'x64') errorOut();

  // prettier-ignore
  switch (platform) {  
		case 'linux': return 'LINUX';
		case 'darwin': return 'DARWIN';
		case 'win64': return 'WINDOWS';
		default: errorOut();
	}
}

/**
 * Matches a platform to a Pulumi zip URI, as defined in `PULUMI_ZIP_URIS`.
 * @param {string} platform
 * @param {string} arch
 * @see PULUMI_ZIP_URIS
 */
async function matchPlatformToUrl(platform, arch) {
  const platformKey = await matchPlatformToKey(platform, arch);
  const platformString = PULUMI_ZIP_URIS[platformKey];
  if (platformString === undefined) {
    console.error(
      `Could not find a download path for the platform '${platform}', the ` +
        `arch '${arch}', and the generated key '${platformKey}'.`
    );
    process.exit(12);
  }
  return `https://get.pulumi.com/releases/sdk/pulumi-${await getLatestPulumiVersion()}-${
    PULUMI_ZIP_URIS[platformKey]
  }`;
}

module.exports = matchPlatformToUrl;
