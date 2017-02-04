#!/usr/bin/env node
import program from 'commander'
import { add } from './daemon'

program.parse(process.argv)

program.args.forEach((arg) => add(arg, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('Added ' + arg)
  }
}))
