import crypto from 'node:crypto';
import fs from 'node:fs';

// Generate RSA Key Pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // Key size in bits
    publicKeyEncoding: {
        type: 'spki', // Standard format for public keys
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8', // Standard format for private keys
        format: 'pem',
    },
});

fs.writeFileSync('public.pem', publicKey, { encoding: 'utf8' });
fs.writeFileSync('private.pem', privateKey, { encoding: 'utf8' });
