export function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export function strToArrayBuffer(str: string): ArrayBuffer {
  return new TextEncoder().encode(str).buffer;
}

export async function deriveKeyPBKDF2(password: string, salt: ArrayBuffer, iterations = 250000) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
  return key;
}

export async function decryptAesGcmWithPassword(payload: { salt: string; iv: string; data: string; iter?: number }, password: string): Promise<string> {
  const salt = base64ToArrayBuffer(payload.salt);
  const iv = base64ToArrayBuffer(payload.iv);
  const data = base64ToArrayBuffer(payload.data);
  const key = await deriveKeyPBKDF2(password, salt, payload.iter || 250000);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv, tagLength: 128 }, key, data);
  return new TextDecoder().decode(decrypted);
}

