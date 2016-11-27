const request = require('request');
const program = require('commander');

const daemon = 'http://localhost:2342';

program.parse(process.argv);

program.args.forEach((arg) => {
  request.post({
    url: daemon + '/add',
    json: {
      'torrent': arg
    }
  },
    (error, response, body) => {
      if (error) {
        return console.error('Error: ' + error);
      } else if (body === arg) {
        console.log('Added.');
      } else {
        console.log(body);
      }
    });
});
