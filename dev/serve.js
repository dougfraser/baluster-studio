const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..'); // project root
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.json': 'application/json' };

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', c => { body += c; });
    req.on('end', () => {
      try {
        const { file, dataURL, text } = JSON.parse(body);
        // only allow writes inside the project's scenes/ folder
        const safe = path.normalize(file).replace(/^([.\\/])+/, '');
        if (!safe.startsWith('scenes')) throw new Error('writes restricted to scenes/');
        const target = path.join(ROOT, safe);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        if (dataURL) {
          const b64 = dataURL.split(',')[1];
          fs.writeFileSync(target, Buffer.from(b64, 'base64'));
        } else {
          fs.writeFileSync(target, text ?? '');
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, bytes: fs.statSync(target).size, target }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: String(e) }));
      }
    });
    return;
  }
  let p = req.url.split('?')[0];
  if (p === '/') p = '/baluster-studio.html';
  const f = path.join(ROOT, decodeURIComponent(p));
  if (!f.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8917, () => console.log('serving', ROOT, 'on http://localhost:8917'));
