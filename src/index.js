const rsaService = require('./services/rsa_service');
const readLine = require("readline");
const fs = require("fs");

const reader = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

const rsa = new rsaService();

let encryptedPlanText;
let decryptedPlanText = "";

var response = '';
reader.question(
  `Escolha uma das opções abaixo:
    1 - Gerar par de chaves (Pública e Privada)
    2 - Criptografar documento
    3 - Decifrar documento
    4 - Assinar documento
    5 - Verificar assinatura
    0 - Exit
  `, 
  function(answer) {
    response = parseInt(answer);

    if(response === 1){
      rsa.generateKeys();
      console.log(rsa.rsaPublic.toString());
      console.log(rsa.rsaPrivate.toString());
    }
    else if(response === 2){
      encryptedPlanText = rsa.encrypt(fs.readFileSync("plantext.txt"));
      console.log(encryptedPlanText.toString("hex"));
    }
    else if(response === 3){
      decryptedPlanText = rsa.decrypt(fs.readFileSync("encryptedPlanText.txt"));
      console.log(decryptedPlanText.toString("utf-8"));
    }
    else if(response === 4){
      var signature = rsa.rsaSignature(fs.readFileSync("encryptedPlanText.txt"));
      fs.writeFileSync("signature.txt", signature);
      console.log(signature.toString("hex"));
    }
    else if(response === 5){
      var sign = fs.readFileSync("signature.txt");
      var enc = fs.readFileSync("encryptedPlanText.txt");
      var isverified = rsa.rsaVerified(enc, sign);
      console.log(isverified);
    }
    reader.close();
  }
);
