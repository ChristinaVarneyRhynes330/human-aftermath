import 'server-only'
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

// Unambiguous alphabet (no 0/O/1/I) so codes can be read aloud or typed from paper.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function newCredentialCode(): string {
  const bytes = randomBytes(12)
  const chars = Array.from(bytes, b => ALPHABET[b % ALPHABET.length])
  return 'HA-' + [0, 4, 8].map(i => chars.slice(i, i + 4).join('')).join('-')
}

export type CredentialRecord = {
  code: string; userId: string; courseId: string
  learnerName: string; totalMinutes: number; capstoneScore: number | null; issuedAt: string
}

const canonical = (r: CredentialRecord) =>
  JSON.stringify([r.code, r.userId, r.courseId, r.learnerName, r.totalMinutes, r.capstoneScore, r.issuedAt])

export function signCredential(r: CredentialRecord): string {
  const secret = process.env.CREDENTIAL_SIGNING_SECRET
  if (!secret || secret.length < 32) throw new Error('CREDENTIAL_SIGNING_SECRET must be set (32+ chars)')
  return createHmac('sha256', secret).update(canonical(r)).digest('hex')
}

export function verifySignature(r: CredentialRecord, signature: string): boolean {
  const a = Buffer.from(signCredential(r), 'hex'), b = Buffer.from(signature, 'hex')
  return a.length === b.length && timingSafeEqual(a, b)
}
