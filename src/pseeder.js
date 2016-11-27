var program = require('commander');

program
  .version('0.0.1')
  .command('status', 'STATUS description').alias('st')
  .command('seed', 'SEED description').alias('se')
  .command('config', 'CONFIG description').alias('c')
  .parse(process.argv);
