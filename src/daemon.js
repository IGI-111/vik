import request from 'request';

const daemon = 'http://localhost:2342';

export function add(torrent, callback) {
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
}

export function list(callback) {
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
                    callback(new Error('Couldn\'t parse torrents from server'));
                }
                return;
            }

            if(callback){
                callback(undefined, torrents);
            }
        });
}