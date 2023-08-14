import _ from 'lodash';
import Drive from 'utils/googleApi';
import * as fs from 'fs';

export default async function handler(req, res) {
  const { id } = req.query;
  const fileId = id;
  const dir = 'public/cache';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.readFile(`public/cache/${fileId}.png`, async (err, data) => {
    try {
      if (err) {
        await Drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' }, (err, resp) => {
          if (_.result(resp, 'data', false)) {
            const dest = fs.createWriteStream(`public/cache/${fileId}.png`);
            resp.data.pipe(dest);
          }
        });
      }
    } catch (e) {}
  });
  res.json({ status: 'ok' });
}
