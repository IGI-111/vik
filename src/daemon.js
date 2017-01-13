import request from 'request';

const daemon = 'http://localhost:2342';

export function add (torrent, callback) {
  request.post({
    url: `${daemon}/add`,
    json: {
      'torrent': torrent
    }
  },
    (err, res, body) => {
      let error = err;
      if (body !== torrent) {
        error = body;
      }
      if (callback) {
        callback(error);
      }
    });
}

export function seed (torrent, callback) {
  request.post({
    url: `${daemon}/seed`
  },
    (err, res, body) => {
      if (callback) {
        callback(err);
      }
    });
}

export function remove (torrent, callback) {
  request.delete(
    `${daemon}/delete/${torrent}`,
    (err, res, body) => {
      let error = err;
      if (body !== torrent) {
        error = body;
      }
      if (callback) {
        callback(error);
      }
    });
}
export function list (callback) {
  request.get(`${daemon}/list`,
    (err, res, body) => {
      if (err) {
        if (callback) {
          callback(err);
        }
        return;
      }

      let torrents = JSON.parse(body);
      if (!torrents) {
        if (callback) {
          callback(new Error('Couldn\'t parse torrents from server'));
        }
        return;
      }

      if (callback) {
        callback(undefined, torrents);
      }
    });
}

export function info (torrent, callback) {
  request.get(`${daemon}/info/${torrent}`,
    (err, res, body) => {
      if (err) {
        if (callback) {
          callback(err);
        }
        return;
      }

      let torrentInfo = JSON.parse(body);
      if (!torrentInfo) {
        if (callback) {
          callback(new Error('Couldn\'t parse torrent info from server'));
        }
        return;
      }

      if (callback) {
        callback(undefined, torrentInfo);
      }
    });
}
