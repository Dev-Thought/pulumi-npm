#!/usr/bin/env node
'use strict';

const { spawn } = require('child_process');
const { resolve } = require('path');

const execName = process.platform === 'win32' ? 'pulumi.exe' : './pulumi';
const command = resolve(__dirname, '..', 'tools', 'pulumi', execName);
const pulumi = spawn(command, process.argv.slice(2), { cwd: process.cwd() });

pulumi.stdout.pipe(process.stdout);
pulumi.stderr.pipe(process.stderr);
pulumi.on('error', function(err) {
  console.error(`Received an error while executing the Pulumi binary: ${err}`);
  process.exit(1);
});
