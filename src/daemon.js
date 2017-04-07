const rp = require('request-promise')

const daemon = 'http://localhost:6060'

module.exports = {add, seed, remove, list, info}

function add (torrent) {
  return rp.put({
    url: `${daemon}/torrent`,
    json: {
      'torrent': torrent
    }
  })
}

function seed (path) {
  return rp.post({
    url: `${daemon}/torrent`,
    json: {
      'path': path
    }
  })
}

function remove (torrent) {
  return rp.delete(`${daemon}/torrent/${torrent}`)
}

function list () {
  return rp.get(`${daemon}/torrent`).then((res) => JSON.parse(res))
}

function info (torrent) {
  return rp.get(`${daemon}/torrent/${torrent}`).then((res) => JSON.parse(res))
}
