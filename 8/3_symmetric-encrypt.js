const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');

/// Cipher

const message = 'Secret';
const key = randomBytes(32);  // something you keep secret
const iv = randomBytes(16);  // initial vector - will allow different encyrption each time

// aes
// des
// idea
// blowfish

/// Encrypt
const cipher = createCipheriv('aes256', key, iv); 
cipher.update(message, 'utf8', 'hex') // UTF-8 is a variable-width character encoding - unicode standard
const encryptedMessage =  cipher.final('hex');  // turn into object
// The cipher.final() is used to return a buffer or string containing the value of cipher object
console.log(`Encrypted: ${encryptedMessage}`);

/// Decrypt
const decipher = createDecipheriv('aes256', key, iv);
decipher.update(encryptedMessage, 'hex', 'utf-8')
const decryptedMessage =  decipher.final('utf8');

console.log(`Deciphered: ${decryptedMessage.toString()}`);

// run two times, the encryption is different