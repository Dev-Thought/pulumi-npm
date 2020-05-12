const fetch = require('node-fetch');

const pulumiRepo = 'https://api.github.com/repos/pulumi/pulumi';

module.exports = async function getLatestPulumiVersion() {
  const tags = await fetch(`${pulumiRepo}/tags`).then(res => res.json());
  const latestVersion2Tag = tags.filter(tag => tag.name.startsWith('v2'))[0];
  return latestVersion2Tag.name;
};
