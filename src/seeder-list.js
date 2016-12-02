import { list, info } from './daemon';

list((err, torrents) => {
  if (err) {
    console.error(err);
  } else {
    torrents.forEach((t) => {
      info(t, (err, i) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${(i.progress * 100).toFixed(0)}% ${i.infoHash} ${i.name}`);
        }
      });
    });
  }
});
