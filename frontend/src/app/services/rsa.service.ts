import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RsaService {

  URI = "http://localhost:4000"

  constructor(private http: HttpClient) { }

  mensajeCifrado(mensaje: string) {
    console.log("Service")
    console.log(mensaje)
    const path = `${this.URI}/rsa/cifrado`
    return this.http.post(path, mensaje)
  }

  sign(mensaje: string) {
    console.log("Firma")
    return this.http.post(this.URI + '/rsa/sign', mensaje)
  }

  firmaciega(mensaje: string) {
    console.log("Firma ciega")
    return this.http.post(this.URI + '/rsa/sign', mensaje)
  }

  verify(mensaje: string) {
    return this.http.post(this.URI + '/rsa/verify', mensaje)
  }
  
  getPublicKey() {
    return this.http.get(this.URI + "/rsa")
  }
}
