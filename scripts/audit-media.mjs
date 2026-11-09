/**
 * Source-level media QA. This does not verify that Vimeo will play in a browser.
 * Run with: npm run audit:media
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const registry = JSON.parse(read('content/media_registry.json'));
const ids = [];
const errors = [];
const warnings = [];
const title = name => path.join(root, name);

const videoFields = ['master_vimeo_id', 'recap_vimeo_id', 'alt_recap_vimeo_id', 'alt_vimeo_id'];
for (let n = 1; n <= 8; n++) {
  const m = registry[n];
  if (!m) { errors.push('Missing Module ' + n); continue; }
  for (const key of ['master_vimeo_id', 'recap_vimeo_id']) {
    if (!m[key]) errors.push('Module ' + n + ' missing ' + key);
  }
  for (const key of videoFields) {
    if (!m[key]) continue;
    const id = String(m[key]);
    if (!/^\d{8,12}$/.test(id)) errors.push('Module ' + n + ' invalid ' + key + ': ' + id);
    ids.push(id);
  }
  if (m.chapters && (!Array.isArray(m.chapters) || m.chapters.some(ch => !Array.isArray(ch) || ch.length !== 3))) {
    errors.push('Module ' + n + ' malformed chapter index');
  }
}
const home = read('src/app/page.tsx');
const trailer = /player\.vimeo\.com\/video\/(\d{8,12})/.exec(home);
if (trailer) ids.push(trailer[1]);
else errors.push('Homepage trailer Vimeo ID not found');
const duplicate = [...new Set(ids.filter((id, idx) => ids.indexOf(id) !== idx))];
if (duplicate.length) warnings.push('Repeated video IDs: ' + duplicate.join(', '));
if (ids.length !== 19) warnings.push('Expected 19 mapped videos; found ' + ids.length);

const htmlParts = path.join(root, 'src/masterclass-parts');
const html = fs.existsSync(htmlParts)
  ? fs.readdirSync(htmlParts).filter(n => /^part-\d+\.txt$/.test(n)).sort().map(n => fs.readFileSync(path.join(htmlParts, n), 'utf8')).join('')
  : read('public/masterclass.html');

const localAssets = [
  'The_Human_Aftermath.pdf',
  'The_Human_Aftermath_Course_eBook.pdf',
  'The_Human_Aftermath_Infographic_Atlas.pdf',
  'The_Explainer Master Course Trailer.mp4',
];
const podcast = 'How_Trauma_Recalibrates_Your_Nervous_System_web.mp3';
if (!fs.existsSync(title('public/' + podcast))) errors.push('Build-ready podcast MP3 missing');
else if (fs.statSync(title('public/' + podcast)).size !== 28316140) errors.push('Podcast MP3 byte length mismatch');
for (const file of localAssets) {
  if (!html.includes(file)) warnings.push('Reference HTML does not mention expected asset: ' + file);
  if (!fs.existsSync(title('public/' + file))) warnings.push('Missing local asset: public/' + file);
}
const allSources = [home, html, read('src/components/ModuleMediaCenter.tsx')].join('\n');
if (!allSources.includes('player.vimeo.com')) errors.push('No embedded Vimeo player references found');

console.log('The Human Aftermath — source-level media audit');
console.log('Mapped Vimeo video IDs: ' + ids.length + ' (' + new Set(ids).size + ' unique)');
console.log('WARNING: real Vimeo playback, embed permissions and captions are not checked by this script.');
warnings.forEach(w => console.warn('WARN: ' + w));
errors.forEach(e => console.error('ERROR: ' + e));
console.log('Results: ' + errors.length + ' structural errors; ' + warnings.length + ' media readiness warnings.');
if (errors.length) process.exitCode = 1;
