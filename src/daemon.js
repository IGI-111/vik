const rp = require('request-promise')

const daemon = 'http://localhost:6060'

module.exports = {add, seed, remove, list, info}

function add (torrent) {
  return rp.post({
    url: `${daemon}/add`,
    json: {
      'torrent': torrent
    }
  })
}

function seed (path) {
  return rp.post({
    url: `${daemon}/seed`,
    json: {
      'path': path
    }
  })
}

function remove (torrent) {
  return rp.delete(`${daemon}/delete/${torrent}`)
}

function list () {
  return rp.get(`${daemon}/list`).then((res) => JSON.parse(res))
}

function info (torrent) {
  return rp.get(`${daemon}/info/${torrent}`).then((res) => JSON.parse(res))
}
