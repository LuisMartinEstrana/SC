import { Router } from "express";

import { keys ,decrypt ,sign, encrypt, verify } from '../controllers/rsa.controller'


const router = Router()

//localhost:4000/

//Modulos que estan en librerias

//-----------------------//
//----------RSA----------//
//-----------------------//

//Estabecer conexión
//Envia la clave publica
router.get('/rsa',keys) //Pasar en hexa bigint-conversion

//Recibir un mensaje y descifrar y lo verificar
router.post('/rsa/descifrar', decrypt)

//Firma del servidor
router.post('/rsa/sign', sign)

//Prueva de cifrado
router.post('/rsa/cifrado', encrypt)

router.post('/rsa/verify', verify)


export default router
