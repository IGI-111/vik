#!/usr/bin/env node
import program from 'commander';
import { remove } from './daemon';

program.parse(process.argv);

program.args.forEach((arg) => remove(arg, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Removed ' + arg);
  }
}));
