#!/usr/bin/env node

import program from 'commander'

program
  .version('0.0.1')
  .command('add', 'Add a torrent.').alias('a')
  .command('list', 'Show all known torrents.').alias('ls')
  .command('status', 'Show a torrent\'s status.').alias('st')
  .command('remove', 'Remove a torrent.').alias('rm')
  .command('seed', 'Seed the specified folders as new torrents.')
  .command('status', 'Show status of a specific torrent.')
  .parse(process.argv)
