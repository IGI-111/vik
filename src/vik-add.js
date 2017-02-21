#!/usr/bin/env node

const program = require('commander')
const daemon = require('./daemon')

program.parse(process.argv)

program.args.forEach((arg) => {
  try {
    daemon.add(arg).then((res) => {
      console.log('Added ' + res)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})
