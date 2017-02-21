#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const daemon = require('./daemon')

program.parse(process.argv)

program.args.forEach((arg) => {
  try {
    daemon.seed(path.normalize(arg)).then((res) => console.log('Seeding ' + res.infoHash))
  } catch (err) {
    console.error(err.message)
  }
})
