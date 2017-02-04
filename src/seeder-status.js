#!/usr/bin/env node
import program from 'commander'
import humanizeDuration from 'humanize-duration'
import prettySize from 'prettysize'
import { info } from './daemon'

program
  .option('-d --debug', 'Print complete status in JSON')
  .parse(process.argv)

program.args.forEach((arg) => info(arg, (err, info) => {
  if (err) {
    console.error(err)
  } else if (program.debug) {
    console.log(JSON.stringify(info, null, 2))
  } else {
    prettyPrint(info)
  }
}))

function prettyPrint (info) {
  let remaining = info.timeRemaining === 0 ? ''
    : `${humanizeDuration(info.timeRemaining, { round: true })} remaining\n`

  console.log(`${info.name}
${info.infoHash}
${prettySize(info.downloaded)} / ${prettySize(info.length)}
${remaining}${info.numPeers} peers connected`
  )
}
