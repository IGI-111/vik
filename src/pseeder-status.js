const request = require('request');

const daemon = 'http://localhost:2342';

request.get(daemon + '/list', function (error, response, body) {
  if (error) console.error(error);

  let hashes = JSON.parse(body);
  if (hashes.length === 0) {
    console.log('No torrents.');
  } else {
    hashes.forEach((hash) => {
      console.log(hash);
    });
  }
});
