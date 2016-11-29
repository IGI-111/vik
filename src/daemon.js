const request = require('request');

const daemon = 'http://localhost:2342';

module.exports = {
  add: (torrent, callback) => {
    request.post({
      url: daemon + '/add',
      json: {
        'torrent': torrent
      }
    },
      (err, res, body) => {
        let error = err;
        if (body !== torrent) {
          error = body;
        }
        if(callback) {
          callback(error);
        }
      });
  },
  list: (callback) => {
    request.get(daemon + '/list',
      (err, res, body) => {
        if(err){
          if(callback){
            callback(err);
          }
          return;
        }

        let torrents = JSON.parse(body);
        if(!torrents) {
          if(callback){
            callback('Couldn\'t parse torrents from server');
          }
          return;
        }

        if(callback){
          callback(undefined, torrents);
        }
      });
  }
}
