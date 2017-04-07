#!/usr/bin/env node

const program = require('commander');
const daemon = require('./daemon');
const humanizeDuration = require('humanize-duration');
const prettySize = require('prettysize');
const path = require('path');

program
  .command('add [torrents...]')
  .description('Add torrents.')
  .action(torrents =>
    torrents.forEach((arg) => {
      try {
        daemon.add(arg).then((res) => {
          console.log('Added ' + res);
        });
      } catch (e) {
        console.error(e);
      }
    })
  );

program
  .command('list')
  .description('Show all known torrents.')
  .action(_ => {
    try {
      daemon.list().then((torrents) => {
        torrents.forEach((t) => {
          daemon.info(t).then((i) => {
            console.log(`${(i.progress * 100).toFixed(0)}% ${i.infoHash} ${i.name}`);
          });
        });
      });
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
  });

program
  .command('status [torrent]')
  .description('Show a torrent\'s status.')
  .action(torrent => {
    try {
      daemon.info(torrent).then((i) => {
        if (program.debug) {
          console.log(JSON.stringify(i, null, 2));
        } else {
          prettyPrint(i);
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  });

program
  .command('remove [torrents...]')
  .description('Remove torrents.')
  .action(torrents =>
    torrents.forEach((arg) => {
      try {
        daemon.remove(arg).then(() => console.log('Removed ' + arg));
      } catch (err) {
        console.error(err.message);
      }
    })
  );

program
  .command('seed [folder]')
  .description('Seed the specified folder as a new torrent.')
  .action(folder => {
    try {
      daemon.seed(path.normalize(folder)).then((res) => console.log('Seeding ' + res.infoHash));
    } catch (err) {
      console.error(err.message);
    }
  });

program.parse(process.argv);

if (program.args.length < 1) {
  program.help();
}

function prettyPrint (info) {
  let remaining = info.timeRemaining === 0 ? ''
    : `${humanizeDuration(info.timeRemaining, { round: true })} remaining\n`;

  console.log(`${info.name}
${info.infoHash}
${prettySize(info.downloaded)} / ${prettySize(info.length)}
${remaining}${info.numPeers} peers connected`
  );
}
