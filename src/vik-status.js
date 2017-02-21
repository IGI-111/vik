#!/usr/bin/env node

const program = require('commander')
const humanizeDuration = require('humanize-duration')
const prettySize = require('prettysize')
const daemon = require('./daemon')

program
  .option('-d --debug', 'Print complete status in JSON')
  .parse(process.argv)

program.args.forEach((arg) => {
  try {
    daemon.info(arg).then((i) => {
      if (program.debug) {
        console.log(JSON.stringify(i, null, 2))
      } else {
        prettyPrint(i)
      }
    })
  } catch (err) {
    console.error(err.message)
  }
})

function prettyPrint (info) {
  let remaining = info.timeRemaining === 0 ? ''
    : `${humanizeDuration(info.timeRemaining, { round: true })} remaining\n`

  console.log(`${info.name}
${info.infoHash}
${prettySize(info.downloaded)} / ${prettySize(info.length)}
${remaining}${info.numPeers} peers connected`
  )
}
