import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const chunks = Array.from({ length: 19 }, (_, i) =>
  readFileSync(join('src', 'masterclass-parts', `part-${String(i).padStart(2, '0')}.txt`))
);
const body = Buffer.concat(chunks);
const signature = createHash('sha1')
  .update(Buffer.from(`blob ${body.length}\0`))
  .update(body)
  .digest('hex');
if (signature !== 'ae2ff2c710e5a27aea261a861fe74ebc643e7ddc') {
  throw new Error(`Masterclass differs from approved ZIP: ${signature}`);
}
console.log(`Masterclass reference verified (${body.length} bytes)`);
