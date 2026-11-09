import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';

// The 5 MB reference HTML is kept byte-for-byte in 19 split source files.
export async function GET() {
  const files = Array.from({ length: 19 }, (_, i) =>
    join(process.cwd(), 'src', 'masterclass-parts', `part-${String(i).padStart(2, '0')}.txt`)
  );
  const chunks = await Promise.all(files.map((file) => readFile(file, 'utf8')));
  return new Response(chunks.join(''), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
