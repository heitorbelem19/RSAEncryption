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
    fs.writeFileSync('./rsaKeys/private.key', privateKey.toString('hex'));
    fs.writeFileSync('./rsaKeys/public.pub', publicKey.toString('hex'));
  }

  encrypt = (data) => {

    var encrypted = crypto.publicEncrypt(
      {
        key: fs.readFileSync('./rsaKeys/public.pub'),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha3-256",
      },
      Buffer.from(data)
    );
    fs.writeFileSync("./encryptedFiles/encryptedPlanText.txt", encrypted);
    return encrypted;
  }

  decrypt = (data) => {
    const decrypted = crypto.privateDecrypt(
      {
        key: fs.readFileSync('./rsaKeys/private.key'),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha3-256",
        passphrase: "Top Secret"
      },
      data
    );
    fs.writeFileSync("./decryptedFiles/decryptedPlanText.txt", decrypted.toString("utf-8"));
    return decrypted;
  }

  rsaSignature = (data) => {
    var signature = crypto.sign("sha3-256", Buffer.from(data), {
      key: fs.readFileSync("./rsaKeys/private.key"),
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      passphrase: "Top Secret"
    });
    return signature;
  }

  rsaVerified = (data) => {
    var is = crypto.verify(
      "sha3-256", Buffer.from(data), 
      {
        key: fs.readFileSync("./rsaKeys/public.pub"),
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING
      },
      fs.readFileSync("./rsaSign/signature.txt")
    )
    return is;
  }

};

module.exports = rsaService;