import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

    constructor() {    }

    ngOnInit(){


      this.adicionaClasseCss();

    }

    adicionaClasseCss(){
      let pontos = document.querySelectorAll('circle');

      if(pontos.length == 3){
        setTimeout(() => {
          pontos[0].classList.add('jump');
        },50);

        setTimeout(() => {
          pontos[1].classList.add('jump');
        },350);

        setTimeout(() => {
          pontos[2].classList.add('jump');
        },650);
      }
    }


}
