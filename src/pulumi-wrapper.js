#!/usr/bin/env node
'use strict';

const { spawn } = require('child_process');
const { resolve } = require('path');

const toolsDirectory = resolve(__dirname, '..', 'tools');
const execName =
  process.platform === 'win32' || process.platform === 'win64'
    ? 'pulumi.exe'
    : './pulumi';
const binPath =
  process.platform === 'win32' || process.platform === 'win64'
    ? resolve(toolsDirectory, 'Pulumi', 'bin')
    : resolve(toolsDirectory, 'pulumi');
const command = resolve(binPath, execName);
spawn(command, process.argv.slice(2), {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: { ...process.env, PATH: `${process.env.PATH}:${binPath}` }
});
