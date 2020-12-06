const rsaService = require('./services/rsa_service');
const readLine = require("readline");
const fs = require("fs");

const rsa = new rsaService();
const op = process.argv[2];
const input1 = process.argv[3];
const input2 = process.argv[4];

let encryptedPlanText;
let decryptedPlanText = "";

if(op == 1) {
  rsa.generateKeys();
}
else if(op == 2) {
  if(input1 == null || input1 == undefined){
    console.error("Path do arquivo a ser encriptado não pode ser vazio");
    return
  }
  encryptedPlanText = rsa.encrypt(fs.readFileSync(input1));
  console.log(encryptedPlanText.toString("hex"));
}
else if(op == 3){
  if(input1 == null || input1 == undefined){
    console.error("Path do arquivo a ser decifrado não pode ser vazio");
    return
  }
  decryptedPlanText = rsa.decrypt(fs.readFileSync(input1));
  console.log(decryptedPlanText.toString("utf-8"));
}
else if(op == 4){
  if(input1 == null || input1 == undefined){
    console.error("Path do arquivo a ser encriptado não pode ser vazio");
    return
  }
  var signature = rsa.rsaSignature(fs.readFileSync(input1));
  fs.writeFileSync("rsaSign/signature.txt", signature);
  console.log(signature.toString("hex"));
}
else if(op == 5){
  if(input1 == null || input1 == undefined){
    console.error("Path do arquivo a ser encriptado não pode ser vazio");
    return
  }
  var isverified = rsa.rsaVerified(fs.readFileSync(input1));
  if(isverified) {
    console.log("Arquivo verificado. OK");
    return
  }
  console.log("Arquivo não verificado. Não OK");
  
}
else if(op == "-h"){
  console.log("Operações disponíveis:");
  console.warn("node index.js <1-5> <file_path> <file_path>");
  console.log("1 = Gerar par de chaves (Pública e Privada)");
  console.log("2 = Criptografar arquivo no path fornecido no próximo argumento");
  console.log("3 = Decifrar arquivo no path fornecido no próximo argumento");
  console.log("4 = Assinar arquivo no path fornecido no próximo argumento");
  console.log("5 = Verificar assinatura do arquivo no path fornecido no próximo argumento");
}