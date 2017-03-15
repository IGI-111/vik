#!/usr/bin/env node

const program = require('commander')

program
  .version('0.0.1')
  .command('add [torrent]', 'Add a torrent.')
  .command('list', 'Show all known torrents.')
  .command('status [torrent]', 'Show a torrent\'s status.')
  .command('remove [torrent]', 'Remove a torrent.')
  .command('seed [folders]', 'Seed the specified folders as new torrents.')
  .parse(process.argv)
