#!/usr/bin/env node
'use strict';

const { spawn } = require('child_process');
const { resolve } = require('path');

const execName = process.platform === 'win32' ? 'pulumi.exe' : './pulumi';
const command = resolve(__dirname, '..', 'tools', 'pulumi', execName);
spawn(command, process.argv.slice(2), {
  cwd: process.cwd(),
  stdio: 'inherit'
});
