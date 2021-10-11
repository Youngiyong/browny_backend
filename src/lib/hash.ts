import crypto from 'crypto-js'

const HASH_KEY  = process.env.HASH_KEY;

export function hashPassword(password: string) {
    const hashed = crypto.AES.encrypt(JSON.stringify(password), HASH_KEY).toString();
    return hashed;
}


export function decryptPassword(hashPassword: string, password: string){
    const bytes = crypto.AES.decrypt(hashPassword, HASH_KEY);
    const decrypted = JSON.parse(bytes.toString(crypto.enc.Utf8));
    console.log(hashPassword, password, decrypted)
    if(password===decrypted){
        return true
    } else {
        return false
    }
}