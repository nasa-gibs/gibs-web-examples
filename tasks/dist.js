#!/usr/bin/env node

const fs = require('fs');
const shell = require('shelljs');
const tar = require('tar');

shell.rm('-rf', 'build');
shell.rm('-rf', 'dist');
shell.mkdir('-p', 'build/gibs-web-examples');
shell.mkdir('dist');
shell.cp('-r', 'examples', 'lib', 'index.html', 'build/gibs-web-examples');

let dist = 'dist/gibs-web-examples.tar.gz';
tar.c({
  gzip: true,
  portable: true,
  C: 'build'
}, ['gibs-web-examples']).pipe(fs.createWriteStream(dist));
