import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Profile } from '../../models/profile';
import { CampanhaService } from 'src/app/shared/services/campanha.service';

@Component({
  selector: 'app-selecao-perfil',
  templateUrl: './selecao-perfil.component.html',
  styleUrls: ['./selecao-perfil.component.scss']
})
export class SelecaoPerfilComponent implements OnInit {
  interfaceProperty = interfaceProperties;
  perfis!: Profile[];

  form = this.fb.group({
    perfil: [null, [Validators.required]]
  });

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private campanhaService: CampanhaService){

  }

  ngOnInit(){
    this.authService.getProfiles().subscribe(profiles => this.perfis = profiles)
  }

  onSubmit() {
    this.authService.setUserProfile(this.form.controls['perfil'].value)
    this.authService.updateLoggedIn();

    this.campanhaService.getSurveysActive().subscribe(surveys => {
      if(surveys.length > 0){
        localStorage.setItem('hasSurveysActive', 'true');
        this.router.navigate(['/campanha/formulario']);
      } else {
        this.router.navigate(['home']);
      }
    })
  }

  acessarOutraConta(){
    this.authService.logout();
    this.router.navigate(['acesso'])
  }
}
