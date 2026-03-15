const crypto = require("crypto");

const ALGORITHM = "aes-256-gcm";

function getEncryptionKey() {
  const key = process.env.PCC_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY;
  if (!key || key.length < 64) return null;
  return Buffer.from(key, "hex");
}

function encryptValue(plaintext) {
  const key = getEncryptionKey();
  if (!key) throw new Error("Encryption key not configured");

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");

  return [
    iv.toString("hex"),
    cipher.getAuthTag().toString("hex"),
    encrypted,
  ].join(":");
}

function decryptValue(ciphertext) {
  const key = getEncryptionKey();
  if (!key) throw new Error("Encryption key not configured");

  const [ivHex, authTagHex, encrypted] = String(ciphertext || "").split(":");
  if (!ivHex || !authTagHex || !encrypted) throw new Error("Invalid ciphertext format");

  const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(ivHex, "hex"));
  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = {
  decryptValue,
  encryptValue,
  getEncryptionKey,
};
