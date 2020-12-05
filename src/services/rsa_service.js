'use strict';
const crypto = require('crypto');
const fs = require('fs');
class rsaService {
  
  generateKeys = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync(
      "rsa", 
      {
        modulusLength: 2048,
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: "aes-256-cbc",
          passphrase: "Top Secret"
        }
      }
    );
    fs.writeFileSync('private.key', privateKey.toString('hex'));
    fs.writeFileSync('public.pub', publicKey.toString('hex'));
  }

  encrypt = (data) => {

    var encrypted = crypto.publicEncrypt(
      {
        key: fs.readFileSync('public.pub'),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha3-256",
      },
      Buffer.from(data)
    );
    fs.writeFileSync("encryptedPlanText.txt", encrypted);
    return encrypted;
  }

  decrypt = (data) => {
    const decrypted = crypto.privateDecrypt(
      {
        key: fs.readFileSync('private.key'),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha3-256",
        passphrase: "Top Secret"
      },
      data
    );
    fs.writeFileSync("decryptedPlanText.txt", decrypted.toString("utf-8"));
    return decrypted;
  }

  rsaSignature = (data) => {
    var signature = crypto.sign("sha3-256", Buffer.from(data), {
      key: fs.readFileSync("private.key"),
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      passphrase: "Top Secret"
    });
    return signature;
  }

  rsaVerified = (data, signature) => {
    var is = crypto.verify(
      "sha3-256", Buffer.from(data), 
      {
        key: fs.readFileSync("public.pub"),
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING
      },
      signature
    )
    return is;
  }

};

module.exports = rsaService;