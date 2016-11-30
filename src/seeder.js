import program from 'commander';

program
  .version('0.0.1')
  .command('add', 'Add a torrent.').alias('a')
  .command('list', 'Show all known torrents.').alias('ls')
  .command('status', 'Show a torrent\'s status.').alias('st')
  .parse(process.argv);
