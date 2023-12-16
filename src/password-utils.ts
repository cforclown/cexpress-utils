import { AES, enc, SHA512 } from 'crypto-js';
import { Environment } from './environment';

export const hashPassword = async function (password: string): Promise<string> {
  return SHA512(password).toString(enc.Hex);
};
export function encrypt (data: string): string {
  return AES.encrypt(data, Environment.getEncryptionKey()).toString();
}
export function decrypt (encrypted: string): string {
  return AES.decrypt(encrypted, Environment.getEncryptionKey()).toString(enc.Utf8);
}
