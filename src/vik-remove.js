#!/usr/bin/env node

const program = require('commander')
const daemon = require('./daemon')

program.parse(process.argv)

program.args.forEach((arg) => {
  try {
    daemon.remove(arg).then(() => console.log('Removed ' + arg))
  } catch (err) {
    console.error(err.message)
  }
})
