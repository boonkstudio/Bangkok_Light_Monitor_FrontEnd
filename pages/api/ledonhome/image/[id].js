import * as fs from 'fs';
import Drive from 'utils/googleApi';
import _ from 'lodash';

export default async function handler(req, res) {
  const { id } = req.query;
  const fileId = id;
  const dir = 'public/cache';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.readFile(`${dir}/${fileId}.png`, (err, data) => {
    if (!err && data) {
      res.redirect(307, `/cache/${fileId}.png`);
    } else {
      fs.readFile(`${dir}/${fileId}.png`, async (err, data) => {
        if (err) {
          try {
            await Drive.files.get(
              { fileId, alt: 'media' },
              { responseType: 'stream' },
              (err, resp) => {
                if (_.result(resp, 'data', false)) {
                  const dest = fs.createWriteStream(`public/cache/${fileId}.png`);
                  resp.data.pipe(dest);
                  dest.on('finish', () => {
                    res.redirect(307, `/cache/${fileId}.png`);
                    dest.close(() => {});
                  });
                }
              }
            );
          } catch (e) {
            res.status(500).json({ status: 'error' });
          }
        }
      });
    }
  });
}
// http://localhost:3030/api/ledonhome/deluminator/1Wz4TtDNFJsMkB8lmauiWHwGf9MHF8ugW
