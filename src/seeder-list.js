#!/usr/bin/env node

import { list, info } from './daemon'

(async() => {
  try {
    const torrents = await list()
    torrents.forEach(async (t) => {
      const i = await info(t)
      console.log(`${(i.progress * 100).toFixed(0)}% ${i.infoHash} ${i.name}`)
    })
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
})()
