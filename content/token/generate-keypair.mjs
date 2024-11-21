import crypto from 'node:crypto';
import fs from 'node:fs';

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    },
});

fs.writeFileSync('public.pem', publicKey, { encoding: 'utf8' });
fs.writeFileSync('private.pem', privateKey, { encoding: 'utf8' });
