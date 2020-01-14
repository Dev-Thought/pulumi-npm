const assert = require('assert').strict;

// Pulumi download source contants
const PULUMI_ROOT_URI = 'https://get.pulumi.com/releases/sdk/pulumi-v1.7.1-';
const PULUMI_ZIP_URIS = {
  DARWIN_64: 'darwin-x64.zip',
  LINUX_64: 'linux-x64.tar.gz',
  WINDOWS_64: 'windows-x64.zip'
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
 * Matches an arch string to a 'key postfix' for `TF_ZIP_URIS`.
 * @param {string} arch
 * @param {boolean} isARMcompat
 * @see TF_ZIP_URIS
 */
function matchArchToKeyPostfix(arch, isARMcompat = true) {
  // Match with any of 'matchables' that === 'arch'.
  function archMatch(...matchables) {
    for (const matchable in matchables) {
      if (matchable === arch) return true;
    }
    return false;
  }

  if (archMatch('x32', 'ia32')) return '_32';
  if (arch === 'x64') return '_64';
  if (archMatch('arm', 'arm64') && isARMcompat) return '_ARM';
  throw new Error('arch-not-supported');
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

  function matchArch(isARMcompat) {
    try {
      return matchArchToKeyPostfix(arch, isARMcompat);
    } catch (err) {
      assert.equal(err.message, 'arch-not-supported');
      errorOut();
    }
  }

  // prettier-ignore
  switch (platform) {
		case 'linux': return 'LINUX' + matchArch();
		case 'darwin':
			if (arch !== 'x64') errorOut();
			else return 'DARWIN';
		case 'freebsd': return 'FREEBSD' + matchArch();
		case 'openbsd': return 'OPENBSD' + matchArch(false);
		case 'sunos':
			if (arch !== 'x64') errorOut();
			else return 'SOLARIS';
		case 'win32': return 'WINDOWS' + matchArch(false);
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
  return PULUMI_ROOT_URI + PULUMI_ZIP_URIS[platformKey];
}

module.exports = matchPlatformToUrl;
