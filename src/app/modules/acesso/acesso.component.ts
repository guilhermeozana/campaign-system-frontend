import { Component } from '@angular/core';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';


@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.scss']
})
export class AcessoComponent {
  isLogin: boolean = true;
  isRedefinicaoSenha: boolean = false;
  isVerificacaoDuasEtapas: boolean = false;
  interfaceProperty = interfaceProperties;


  constructor(){}

  onLogin(){
    const container = document.getElementById('container');

    if(this.isRedefinicaoSenha){
      this.isRedefinicaoSenha = false;
      this.isVerificacaoDuasEtapas = false;
      this.isLogin = true;
    } else {
      container!.classList.remove("active");
      container!.classList.toggle("flip")

      setTimeout(() => {
        this.isVerificacaoDuasEtapas = false;
        this.isLogin = true;
      }, 200);
    }
  }

  onCriarConta(){
    const container = document.getElementById('container');

    container!.classList.add("active");
    container!.classList.toggle("flip")

    setTimeout(() => {
      this.isLogin = false;
      this.isRedefinicaoSenha = false;
      this.isVerificacaoDuasEtapas = false;
    },200);
  }

  onRedefinirSenha(){
    this.isRedefinicaoSenha = true;

  }

  onVerificacaoDuasEtapas(){
    this.isVerificacaoDuasEtapas = true;
  }

}
