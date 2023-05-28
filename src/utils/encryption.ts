import { AES, enc, SHA512 } from 'crypto-js';
import { Environment } from './environment';

export const hashPassword = async function (password: string): Promise<string> {
  return SHA512(password).toString(enc.Hex);
};
export function encrypt (data: string, key?: string): string {
  return AES.encrypt(data, key ?? Environment.getEncryptionKey()).toString();
}
export function decrypt (encrypted: string, key?: string): string {
  return AES.decrypt(encrypted, key ?? Environment.getEncryptionKey()).toString(enc.Utf8);
}
