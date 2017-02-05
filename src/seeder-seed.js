#!/usr/bin/env node

import program from 'commander'
import { seed } from './daemon'
import path from 'path'

program.parse(process.argv)

program.args.forEach(async (arg) => {
  try {
    const res = await seed(path.normalize(arg))
    console.log('Seeding ' + res.infoHash)
  } catch (err) {
    console.error(err.message)
  }
})
