const {  publicEncrypt, privateDecrypt } = require('crypto');
const { publicKey, privateKey } = require('./keypair'); // asymmtric key

const message = '{credit_card:267599871623, security:111}'

// no privatekey required - from sender
const encryptedData = publicEncrypt(
    publicKey,
    Buffer.from(message)
  );


console.log(encryptedData.toString('hex'))

// private key required - verifier
const decryptedData = privateDecrypt(
    privateKey,
    encryptedData
);

console.log(decryptedData.toString('utf-8'));