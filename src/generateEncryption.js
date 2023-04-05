import CryptoJS from "crypto-js";

class Encryption {
  constructor(length = 32) {
    this.length = length;
    this.chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  }

  generateSecret() {
    let result = "";
    for (let i = 0; i < this.length; i++) {
      result += this.chars.charAt(Math.floor(Math.random() * this.chars.length));
    }
    return result;
  }

  encrypt(text, password) {
    return CryptoJS.AES.encrypt(text, password).toString();
  }

  decrypt(cipherText, password) {
    const bytes = CryptoJS.AES.decrypt(cipherText, password);
    try {
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return null;
    }
  }
}

export const encryption = new Encryption();
