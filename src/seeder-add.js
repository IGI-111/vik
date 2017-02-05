#!/usr/bin/env node

import program from 'commander'
import { add } from './daemon'

program.parse(process.argv)

program.args.forEach((arg) => {
  try {
    add(arg).then((res) => {
      console.log('Added ' + res)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})
