#!/usr/bin/env node

const program = require('commander')
const daemon = require('./daemon')

program.parse(process.argv)

try {
  daemon.list().then((torrents) => {
    torrents.forEach((t) => {
      daemon.info(t).then((i) => {
        console.log(`${(i.progress * 100).toFixed(0)}% ${i.infoHash} ${i.name}`)
      })
    })
  })
} catch (e) {
  console.error(e.message)
  process.exit(1)
}
