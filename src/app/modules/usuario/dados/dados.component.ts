import { AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CurrentUser } from 'src/app/shared/models/current-user';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss']
})
export class DadosComponent implements OnInit {

  form = this.fb.group({
    id: [0, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required]
  });

  interfaceProperty = interfaceProperties;
  currentUser!: CurrentUser;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.form.patchValue(user)
    })
  }

  onSubmit() {
  }
}
