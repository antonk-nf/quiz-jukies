#!/usr/bin/env node
// Encrypts public/quiz.json into public/quiz.enc using AES-256-GCM with PBKDF2-derived key.
// Usage: node scripts/encrypt-quiz.mjs <password>

import { readFile, writeFile, access } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const repoRoot = process.cwd();
const quizJsonPath = path.join(repoRoot, 'public', 'quiz.json');
const quizEncPath = path.join(repoRoot, 'public', 'quiz.enc');

async function main() {
  const password = process.argv[2] || process.env.QUIZ_PASSWORD;
  if (!password) {
    console.error('Usage: node scripts/encrypt-quiz.mjs <password>');
    process.exit(1);
  }

  try {
    await access(quizJsonPath, fsConstants.R_OK);
  } catch {
    console.error(`Missing input file: ${quizJsonPath}`);
    process.exit(1);
  }

  const plaintext = await readFile(quizJsonPath);

  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12); // 96-bit IV recommended for GCM
  const iterations = 250000;
  const key = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256');

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  const data = Buffer.concat([encrypted, tag]); // append tag to ciphertext

  const payload = {
    kdf: 'PBKDF2-HMAC-SHA256',
    iter: iterations,
    algo: 'AES-256-GCM',
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    data: data.toString('base64'),
  };

  await writeFile(quizEncPath, JSON.stringify(payload));
  console.log(`Encrypted quiz written to ${quizEncPath}`);
  console.log('Remember: remove or exclude public/quiz.json from deployment if you want only encrypted content served.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

