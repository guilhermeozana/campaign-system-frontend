import { ThemingService } from './../../../shared/services/theming.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/shared/models/current-user';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent {

  form = this.fb.group({
    dark: [false, Validators.required]
  });

  interfaceProperty = interfaceProperties;
  currentUser!: CurrentUser;

  constructor(private authService: AuthService,
              private router: Router,
              private cdr: ChangeDetectorRef,
              private fb: FormBuilder,
              private messageService: MessageService,
              private themingService: ThemingService) {

  }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
