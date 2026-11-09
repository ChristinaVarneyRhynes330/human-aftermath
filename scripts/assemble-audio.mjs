// Reassemble the web-ready, verified MP3 from the repository's smaller binary blobs.
// This keeps individual GitHub uploads well below the repository's file limits
// while serving a single static media file from Next.js/Vercel's public directory.
import { existsSync, mkdirSync, openSync, writeSync, closeSync, readFileSync, renameSync, unlinkSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const NAME = 'How_Trauma_Recalibrates_Your_Nervous_System_web.mp3';
const EXPECTED_SIZE = 28316140;
const EXPECTED_SHA256 = '05979f011ef2d5245f2c5311287c49487f53e30241325dbaf8dd70f58b0e3584';
const COUNT = 19;
const outputDir = join(process.cwd(), 'public');
const destination = join(outputDir, NAME);

function verify(path) {
  if (!existsSync(path) || statSync(path).size !== EXPECTED_SIZE) return false;
  return createHash('sha256').update(readFileSync(path)).digest('hex') === EXPECTED_SHA256;
}

if (verify(destination)) {
  console.log('Podcast audio verified:', NAME);
} else {
  mkdirSync(outputDir, { recursive: true });
  const temp = destination + '.tmp';
  const fd = openSync(temp, 'w');
  const hash = createHash('sha256');
  let total = 0;
  try {
    for (let index = 0; index < COUNT; index++) {
      const segment = join(process.cwd(), 'src', 'podcast-parts', `part-${String(index).padStart(2, '0')}.bin`);
      const bytes = readFileSync(segment);
      hash.update(bytes);
      writeSync(fd, bytes);
      total += bytes.length;
    }
  } finally {
    closeSync(fd);
  }

  const digest = hash.digest('hex');
  if (total !== EXPECTED_SIZE || digest !== EXPECTED_SHA256) {
    unlinkSync(temp);
    throw new Error(`Audio verification failed: ${total} bytes / ${digest}`);
  }
  renameSync(temp, destination);
  console.log('Podcast audio assembled and verified:', NAME, total, 'bytes');
}
