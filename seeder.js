#!/usr/bin/env node

const program = require('commander');
const createTorrent = require('create-torrent')
const WebTorrent = require('webtorrent');
const fs = require('fs')

program
    .option('-c, --create <file.torrent>', 'Create torrent file from arguments')
    .parse(process.argv);

let client = new WebTorrent();
let opts = {
    path: process.cwd()
};

if(program.create !== undefined){
    createTorrent(program.args, (err, torrent) => {
        if(err) throw err;
        fs.writeFile(program.create, torrent, (err) => {
            if(err) throw err;
            process.exit();
        });
    });
} else {
    program.args.forEach((tid) => {
        client.add(tid, opts, (torrent) => {
            console.log('Loaded: ' + torrent.infoHash);
            torrent.on('error', (err) => {throw err;});
        })
    });
}
