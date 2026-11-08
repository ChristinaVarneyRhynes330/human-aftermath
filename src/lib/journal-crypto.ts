// End-to-end encryption for journals: AES-GCM key derived in the browser from a passphrase the
// learner chooses. The server only ever stores ciphertext + IV; a lost passphrase cannot be recovered.
const enc = new TextEncoder(), dec = new TextDecoder()
const b64 = (u: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(u as ArrayBuffer)))
const unb64 = (s: string) => Uint8Array.from(atob(s), c => c.charCodeAt(0))

export async function deriveKey(passphrase: string, userId: string) {
  const base = await crypto.subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: enc.encode(`human-aftermath:${userId}`), iterations: 310_000, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'])
}
export async function encryptText(key: CryptoKey, text: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(text))
  return { ciphertext: b64(ct), iv: b64(iv) }
}
export async function decryptText(key: CryptoKey, ciphertext: string, iv: string) {
  return dec.decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(iv) }, key, unb64(ciphertext)))
}
