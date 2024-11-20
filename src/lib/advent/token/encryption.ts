import { Token } from '.';

/**
 * Decodes the given `base64` back into a {@link Uint8Array}.
 * We can't use the built-in functions as they fail with large strings.
 *
 * @param base64 the base64 to decode
 * @returns the decoded buffer
 */
const decodeFromBase64 = (base64: string) =>
    Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

/**
 * Encodes the given `buffer` to base64.
 * We can't use the built-in functions as they fail with large strings.
 *
 * @param buffer the buffer to encode
 * @returns the encoded buffer
 */
const encodeToBase64 = (buffer: ArrayBuffer) =>
    btoa(
        new Uint8Array(buffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
        ),
    );

async function importPublicKey(pem: string) {
    const contents = pem
        .replace('-----BEGIN PUBLIC KEY-----', '')
        .replace('-----END PUBLIC KEY-----', '')
        .replace(/\n/g, '');

    const binaryKey = decodeFromBase64(contents);

    return await crypto.subtle.importKey(
        'spki',
        binaryKey,
        {
            name: 'RSA-OAEP',
            hash: { name: 'SHA-256' },
        },
        false,
        ['encrypt'],
    );
}

async function importPrivateKey(pem: string) {
    const contents = pem
        .replace('-----BEGIN PRIVATE KEY-----', '')
        .replace('-----END PRIVATE KEY-----', '')
        .replace(/\n/g, '');
    const binaryKey = decodeFromBase64(contents);

    return await crypto.subtle.importKey(
        'pkcs8',
        binaryKey,
        {
            name: 'RSA-OAEP',
            hash: { name: 'SHA-256' },
        },
        false,
        ['decrypt'],
    );
}

async function encryptUsingAes(payload: Uint8Array) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const randomAesKey = await crypto.subtle.generateKey(
        {
            name: 'AES-GCM',
            length: 256,
        },
        true,
        ['encrypt', 'decrypt'],
    );

    const encryptedPayload = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv,
        },
        randomAesKey,
        payload,
    );

    const exportedAesKey = await crypto.subtle.exportKey('raw', randomAesKey);

    return { encryptedPayload, exportedAesKey, iv };
}

async function decryptUsingAes(
    privateKey: CryptoKey,
    encryptedAesKey: string,
    iv: string,
    payload: string,
) {
    const decryptedAesKey = await crypto.subtle.decrypt(
        { name: 'RSA-OAEP' },
        privateKey,
        decodeFromBase64(encryptedAesKey),
    );

    const aesKey = await crypto.subtle.importKey(
        'raw',
        decryptedAesKey,
        { name: 'AES-GCM' },
        false,
        ['decrypt'],
    );

    return await crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: decodeFromBase64(iv),
        },
        aesKey,
        decodeFromBase64(payload),
    );
}

export async function encryptToken(token: Token, publicKeyPem: string) {
    const publicKey = await importPublicKey(publicKeyPem);

    const encoder = new TextEncoder();
    const serializedPayload = encoder.encode(JSON.stringify(token));
    const { encryptedPayload, exportedAesKey, iv } =
        await encryptUsingAes(serializedPayload);

    const encryptedAesKey = await crypto.subtle.encrypt(
        { name: 'RSA-OAEP' },
        publicKey,
        exportedAesKey,
    );

    return btoa(
        JSON.stringify({
            payload: encodeToBase64(encryptedPayload),
            aesKey: encodeToBase64(encryptedAesKey),
            iv: encodeToBase64(iv),
        }),
    );
}

export async function decryptToken(
    encryptedToken: string,
    privateKeyPem: string,
) {
    const decoder = new TextDecoder();
    const privateKey = await importPrivateKey(privateKeyPem);
    const { payload, aesKey, iv } = JSON.parse(atob(encryptedToken));

    const decryptedPayload = await decryptUsingAes(
        privateKey,
        aesKey,
        iv,
        payload,
    );

    return JSON.parse(decoder.decode(decryptedPayload));
}
