import { Component, OnInit } from '@angular/core';
import { RsaService } from '../../services/rsa.service'

@Component({
  selector: 'app-rsacommunication',
  templateUrl: './rsacommunication.component.html',
  styleUrls: ['./rsacommunication.component.css']
})
export class RSAcommunicationComponent implements OnInit {

  constructor(private rsaService: RsaService) { }

  ngOnInit(): void {
    console.log(this.rsaService.getPublicKey())
  }

  Encrypt(menasje: HTMLTextAreaElement, publicKey: HTMLTextAreaElement): boolean {
    console.log(menasje.value)
    console.log(publicKey.value)
    this.rsaService.mensajeCifrado(menasje.value, publicKey.value).subscribe(res => console.log(res), err => console.log(err))
    return false
  }

}
