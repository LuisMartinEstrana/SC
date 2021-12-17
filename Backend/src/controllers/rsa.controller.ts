import { Request, Response } from 'express'
import * as rsa from 'my-rsa'
import * as bigintConversion from 'bigint-conversion'

//Genera un par de claves publicas y privadas
const keypair = rsa.generateKeys(1024)

//FUNCIONA
export const keys = async (req: Request, res: Response) => {
    const publicE = (await keypair).publicKey.e
    const publicN = (await keypair).publicKey.n
    const privateD = (await keypair).privateKey.d
    const privateN = (await keypair).privateKey.n
    const pubE = bigintConversion.bigintToHex(publicE)
    const pubN = bigintConversion.bigintToHex(publicN)
    /*const pub: any[] = []
    pub[0] = pubE
    pub[1] = pubN*/
    const pub = pubE +" "+ pubN
    return res.json({
        message: pub
    })
}

//
export const decrypt = async (req: Request, res: Response) => {
    const mensaje = await bigintConversion.hexToBigint(req.body)
    //const keypair = await rsa.generateKeys(1024)
    const decypher = (await keypair).privateKey.decrypt(mensaje)
    console.log(decypher)
    return res.json({
        message: bigintConversion.bigintToHex(decypher) 
    })
}

//FUNCIONA
export const sign = async (req: Request, res: Response) => {
    const mensaje = bigintConversion.textToBigint(req.body)
    console.log(mensaje)
    //const keypair = await rsa.generateKeys(1024)
    const signs = (await keypair).privateKey.sign(mensaje)
    console.log(signs)
    return res.json({
        message: bigintConversion.bigintToHex(signs) 
    })
}

//CLIENTE
//FUNCIONA
export const encrypt = async (req: Request, res: Response) => {
    const mensaje = bigintConversion.textToBigint(req.body)
    //console.log(mensaje)
    //const keypair = await rsa.generateKeys(1024)
    //console.log((await keypair).publicKey.e)
    //console.log((await keypair).publicKey.n)
    const cifrado = (await keypair).publicKey.encrypt(mensaje)
    const encryp = bigintConversion.bigintToBase64(cifrado)
    console.log(encryp)
    return res.json({
        message: "encryp"
    })
}

//
 export const verify = async (req: Request, res: Response) => {
     const sign = bigintConversion.textToBigint(req.body)
     console.log(sign)
     const keypair = await rsa.generateKeys(1024)
     const verif = keypair.publicKey.verify(sign)
     return res.json({
         message: bigintConversion.bigintToHex(verif)
     })
}
