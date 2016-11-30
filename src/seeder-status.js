import program from 'commander';
import humanizeDuration from 'humanize-duration';
import prettySize from 'prettysize';
import { info } from './daemon';

program.parse(process.argv);

program.args.forEach((arg) => info(arg, (err, info) => {
  if (err) {
    console.error(err);
  } else {
    prettyPrint(info);
  }
}));

function prettyPrint (info) {
  console.log(
    info.infoHash + '\n' +
      prettySize(info.received) + ' / ' + prettySize(info.received / info.progress) + '\n' +
      humanizeDuration(info.timeRemaining, { round: true }) + ' remaining\n' +
      info.numPeers + ' peers connected'
  );
}
