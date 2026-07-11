// Builds dist/baluster-studio-artifact.html: the app with all three scenes embedded as data URIs.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const app = fs.readFileSync(path.join(ROOT, 'baluster-studio.html'), 'utf8');
const scenes = {};
for (const id of ['landing']) {
  scenes[id] = {
    plate: 'data:image/jpeg;base64,' + fs.readFileSync(path.join(ROOT, 'scenes', id + '.jpg')).toString('base64'),
    before: 'data:image/jpeg;base64,' + fs.readFileSync(path.join(ROOT, 'scenes', id + '_before.jpg')).toString('base64'),
    geo: JSON.parse(fs.readFileSync(path.join(ROOT, 'scenes', id + '.json'), 'utf8'))
  };
}
const inject = '<script>window.EMBEDDED_SCENES=' + JSON.stringify(scenes) + ';</script>\n';
fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
const out = path.join(ROOT, 'dist', 'baluster-studio-artifact.html');
fs.writeFileSync(out, inject + app);
console.log('wrote', out, (fs.statSync(out).size / 1048576).toFixed(2) + ' MB');
