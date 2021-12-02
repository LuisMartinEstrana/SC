import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RsaService {

  URI = "http://localhost:4000"

  constructor(private http: HttpClient) { }

  mensajeCifrado(mensaje: string, publicKey: string) {
    const cifrado = mensaje
    const signature = publicKey
    const fd = new FormData()
    fd.append('cifrado', cifrado)
    fd.append('firmado', signature)
    return this.http.post(this.URI + '/rsa', fd)
  }

  getPublicKey() {
    return this.http.get(this.URI + '/rsa')
  }
}
