#!/usr/bin/env node

import program from 'commander'
import { remove } from './daemon'

program.parse(process.argv)

program.args.forEach(async (arg) => {
  try {
    await remove(arg)
    console.log('Removed ' + arg)
  } catch (err) {
    console.error(err.message)
  }
})
