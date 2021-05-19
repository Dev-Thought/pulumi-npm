#!/usr/bin/env node
'use strict';

const { spawn } = require('child_process');
const { resolve } = require('path');
const { isWindows } = require('./utils/utils');

const toolsDirectory = resolve(__dirname, '..', 'tools');
const execName = isWindows ? 'pulumi.exe' : './pulumi';
const binPath = isWindows
  ? resolve(toolsDirectory, 'Pulumi', 'bin')
  : resolve(toolsDirectory, 'pulumi');
const command = resolve(binPath, execName);

spawn(command, process.argv.slice(2), {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: { ...process.env, PATH: `${process.env.PATH}:${binPath}` }
});
