"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = exports.sign = exports.decrypt = exports.keys = void 0;
const rsa = __importStar(require("my-rsa"));
const bigintConversion = __importStar(require("bigint-conversion"));
//FUNCIONA
const keys = async (req, res) => {
    const publicE = (await rsa.generateKeys()).publicKey.e;
    const publicN = (await rsa.generateKeys()).publicKey.n;
    const privateD = (await rsa.generateKeys()).privateKey.d;
    const privateN = (await rsa.generateKeys()).privateKey.n;
    const pubE = bigintConversion.bigintToHex(publicE);
    const pubN = bigintConversion.bigintToHex(publicN);
    const pribD = bigintConversion.bigintToHex(privateD);
    const pribN = bigintConversion.bigintToHex(privateN);
    const pub = pubE + " " + pubN;
    console.log(publicE, publicN, privateD, privateN);
    return res.json({
        message: pub, //Hacer la conversion de bigint
    });
};
exports.keys = keys;
//Verificar
const decrypt = async (req, res) => {
    const mensaje = await bigintConversion.hexToBigint(req.body);
    const keypair = await rsa.generateKeys(1024);
    const decypher = keypair.privateKey.decrypt(mensaje);
    console.log(decypher);
    return res.json({
        message: bigintConversion.bigintToHex(decypher) //Hacer la conversion de bigint
    });
};
exports.decrypt = decrypt;
//FUNCIONA
const sign = async (req, res) => {
    const mensaje = bigintConversion.textToBigint(req.body);
    console.log(mensaje);
    const keypair = await rsa.generateKeys(1024);
    const signs = keypair.privateKey.sign(mensaje);
    console.log(signs);
    return res.json({
        message: bigintConversion.bigintToHex(signs) //Hacer la conversion de bigint
    });
};
exports.sign = sign;
//FUNCIONA
const encrypt = async (req, res) => {
    const mensaje = bigintConversion.textToBigint(req.body);
    console.log(mensaje);
    const keypair = await rsa.generateKeys(1024);
    const cifrado = keypair.publicKey.encrypt(mensaje);
    return res.json({
        message: bigintConversion.bigintToHex(cifrado)
    });
};
exports.encrypt = encrypt;
