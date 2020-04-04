const fetch = require('node-fetch');

const pulumiRepo = 'https://api.github.com/repos/pulumi/pulumi';

module.exports = async function getLatestPulumiVersion() {
  const tags = await fetch(`${pulumiRepo}/tags`).then(res => res.json());
  const latestVersion1Tag = tags.filter(tag => tag.name.startsWith('v1'))[0];
  return latestVersion1Tag.name;
};
