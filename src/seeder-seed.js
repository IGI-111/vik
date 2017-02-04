#!/usr/bin/env node
import program from 'commander'
import { seed } from './daemon'

program.parse(process.argv)

program.args.forEach((arg) => seed(arg, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('Seeding')
  }
}))
