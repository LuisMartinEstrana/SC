import { Component, OnInit } from '@angular/core';
import { RsaService } from '../../services/rsa.service'
import * as bigintConversion from 'bigint-conversion'
import * as bcu from 'bigint-crypto-utils'


@Component({
  selector: 'app-rsacommunication',
  templateUrl: './rsacommunication.component.html',
  styleUrls: ['./rsacommunication.component.css']
})

export class RSAcommunicationComponent implements OnInit {
  constructor(private rsaService: RsaService) { }
  
  //Hacer variables para guardar los valores de la PublicKey
  //Recibir los valores de la PublicKey (HECHO)
  //Utilizarlos para crear la funcion de encrypt y verify

  ngOnInit(): void {
    //Obtener las clave publica
    let pub
    let e
    let n
    this.rsaService.getPublicKey().subscribe((res) => {
      pub = res
      console.log(pub)
    })
  }

  //Crear la funcion de encryptar con los valores de la clave publica (HECHO)

  async Encrypt(menasje: HTMLTextAreaElement) {
    const mensajeBigint = bigintConversion.textToBigint(menasje.value)
    const publicKeyE = bigintConversion.hexToBigint("") //Valor de e
    const publicKeyN = bigintConversion.hexToBigint("") //Valor de n
    const cifrado = bcu.modPow(mensajeBigint, publicKeyE, publicKeyN)
    console.log(bigintConversion.bigintToHex(cifrado))
    this.rsaService.mensajeCifrado(bigintConversion.bigintToHex(cifrado)).subscribe((res: any) => {
      console.log(res)
    })
  }

  //Verificar (HECHO)
  async sign(mensaje: HTMLTextAreaElement) {
    const mensajeBigint = bigintConversion.textToBigint(mensaje.value)
    const publicKeyE = bigintConversion.hexToBigint("")
    const publicKeyN = bigintConversion.hexToBigint("")
    const verify = bcu.modPow(mensajeBigint, publicKeyE, publicKeyN)
    this.rsaService.verify(bigintConversion.bigintToHex(verify)).subscribe((res: any) => {
      console.log(res)
    })
  }

  //Firma ciega
  async firmaCiega(mensaje: HTMLTextAreaElement) {
    const mensajeBigint = bigintConversion.textToBigint(mensaje.value)
    const pulicKeyE = bigintConversion.hexToBigint("")
    const publicKeyN = bigintConversion.hexToBigint("")
    this.rsaService.firmaciega(mensaje.value)
  }
}
