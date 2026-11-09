# Masterclass narration audio restoration

**Status:** The exact supplied 39-minute narration now exists as a verified, web-optimized MP3 in the GitHub source tree, divided into 19 binary chunks. The app builds one playable file automatically.

## Source recording
- User-supplied master: `How_Trauma_Recalibrates_Your_Nervous_System.m4a`
- Runtime: 39m 19.612s (2359.611791 s)
- Source format: AAC, 44.1 kHz, 2-channel; 75,958,985 bytes
- Source SHA-256: `69bf25f044fa67d2a81a6c2106b7c619f13fc8397246cf19998a05767750fea6`
- The source is retained separately; it is not altered or placed in the public code repository.

## Web version
- Destination: `public/How_Trauma_Recalibrates_Your_Nervous_System_web.mp3`
- Format: MP3, 44.1 kHz, 2-channel, 96 kbps
- Runtime: 39m 19.64s; exact file size 28,316,140 bytes
- SHA-256: `05979f011e2d5245f2c5311287c49487f53e30241325dbaf8dd70f58b0e3584`
- GitHub stores 19 sequential binary segments in `src/podcast-parts/`. Each segment is a Git blob, not textual base64.
- Before `npm run dev` or `npm run build`, the `predev`/`prebuild` script `scripts/assemble-audio.mjs` concatenates the pieces and validates file size and SHA-256 before putting the result in `public/`.
- GitHub CI runs `npm run verify:audio` and fails on a missing or corrupted segment.
- The original masterclass HTML is unchanged. The Next.js route at `/masterclass.html` rewrites its audio source to `/How_Trauma_Recalibrates_Your_Nervous_System_web.mp3`.
- Audio playback controls in the masterclass include Play/Pause, position, and speed choices.

## QA requirements
- [x] Source file received and duration/format checked with ffprobe
- [x] Web MP3 transcoded, length and checksum recorded
- [x] GitHub chunk SHA-1 values spot-checked against the local MP3
- [ ] GitHub Actions binary reassembly/integrity check passing (PR)
- [ ] Audible playback and seeking tested on a real deployed domain (desktop/mobile)
- [ ] Full synchronized transcript and captions made available
- [ ] Vercel/production hosting checked for correct audio MIME type and HTTP Range requests

**Video note:** Restoring this narration does not certify the separately registered Vimeo masterclasses/recaps. The prior media audit remains applicable.
