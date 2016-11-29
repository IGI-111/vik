const program = require('commander');
const daemon = require('./daemon');


program.parse(process.argv);

program.args.forEach((arg) => daemon.add(arg, (err) => {
  if(err){
    console.error(err);
  } else {
    console.log('Added ' + arg);
  }
}));
