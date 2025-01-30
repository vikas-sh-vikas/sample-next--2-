/**
 * Encrypt.ts
 * This utility class provides methods for encryption and decryption using CryptoJS library.
 */

import CryptoJS from "crypto-js";

// Retrieve encryption key from environment variables or provide a default
const passkey = process.env.NEXT_PUBLIC_ENCRYPT_KEY || "";

export default class EncryptUtils {
  /**
   * Encrypts a message using AES encryption with a given passphrase.
   * @param message - The message to be encrypted.
   * @param passKey - The passphrase for encryption.
   * @returns The encrypted message as a string.
   */
  static encrypt(message: string, passKey: string = passkey) {
    var keyBytes = CryptoJS.PBKDF2(passKey, "Ivan Medvedev", {
      keySize: 48 / 4,
      iterations: 1000,
    });
    var key = new (CryptoJS.lib.WordArray as any).init(keyBytes.words, 32);
    var iv = new (CryptoJS.lib.WordArray as any).init(
      keyBytes.words.splice(32 / 4),
      16
    );
    var data = CryptoJS.enc.Utf16LE.parse(message);
    var encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
    return encrypted.toString();
  }

  /**
   * Decrypts an encrypted message using AES decryption with a given passphrase.
   * @param encryptedMessage - The encrypted message to be decrypted.
   * @param passKey - The passphrase for decryption.
   * @returns The decrypted message as a string.
   */
  static decrypt(encryptedMessage: string, passKey: string = passkey) {
    var keyBytes = CryptoJS.PBKDF2(passKey, "Ivan Medvedev", {
      keySize: 48 / 4,
      iterations: 1000,
    });
    var key = new (CryptoJS.lib.WordArray as any).init(keyBytes.words, 32);
    var iv = new (CryptoJS.lib.WordArray as any).init(
      keyBytes.words.splice(32 / 4),
      16
    );
    var decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, { iv: iv });

    return decrypted.toString(CryptoJS.enc.Utf16LE);
  }

  /**
   * Encrypts a value using AES encryption and returns a URL-safe string.
   * @param value - The value to be encrypted.
   * @returns The URL-safe encrypted string.
   */
  static encryptURLSafe(value: string) {
    if (!value) {
      return {
        error: "Please provide value to encrypt url safe",
      };
    }
    const encrypted = CryptoJS.AES.encrypt(value, passkey).toString();
    const encoded = CryptoJS.enc.Base64.parse(encrypted).toString(
      CryptoJS.enc.Hex
    );
    return encoded;
  }

  /**
   * Decrypts a URL-safe encrypted string using AES decryption.
   * @param value - The URL-safe encrypted string to be decrypted.
   * @returns The decrypted value as a string.
   */
  static decryptURLSafe(value: string) {
    if (!value) {
      return {
        error: "Please provide value to decrypt url safe",
      };
    }
    const decoded = CryptoJS.enc.Hex.parse(value).toString(CryptoJS.enc.Base64);
    const decrypted = CryptoJS.AES.decrypt(decoded, passkey).toString(
      CryptoJS.enc.Utf8
    );
    return decrypted;
  }
}
