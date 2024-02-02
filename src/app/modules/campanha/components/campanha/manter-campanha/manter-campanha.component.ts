import { CampanhaService } from 'src/app/shared/services/campanha.service';
import { Component, Inject } from '@angular/core';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-manter-campanha',
  templateUrl: './manter-campanha.component.html',
  styleUrls: ['./manter-campanha.component.scss']
})
export class ManterCampanhaComponent {
  interfaceProperty = interfaceProperties;
  isEdicao = false;
  acao: string = 'Incluir';
  simNaoOptions = [{label: 'Sim', value: true}, {label: 'Não', value: false}]

  form = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    description: [null, Validators.required],
    active: [true, Validators.required],
    starts_at: [null, Validators.required],
    stop_at: [null]
  });


  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private campanhaService: CampanhaService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.isEdicao = true;
      this.acao = 'Editar';
      this.campanhaService.getCampaignById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(campaign => {
        campaign.starts_at = moment(campaign.starts_at).format('yyyy-MM-DD');
        campaign.stop_at = moment(campaign.stop_at).format('yyyy-MM-DD');

        this.form.patchValue(campaign)
      });
    }

  }

  onCancela(): void {
    this.router.navigate(['campanha/listar-campanhas'])
  }

  onSubmit(){
    if(this.form.valid){
      if(!this.isEdicao){
        this.campanhaService.saveCampaign(this.form.value).subscribe(result => {
          this.messageService.showSuccessMessage(`${interfaceProperties.label.campanha} ${interfaceProperties.mensagem.salvo_com_sucesso}`, 5000)
        })

      } else {
        this.campanhaService.updateCampaign(this.form.value).subscribe(result => {
          this.messageService.showSuccessMessage(`${interfaceProperties.label.campanha} ${interfaceProperties.mensagem.atualizado_com_sucesso}`, 5000)
        })
      }

      this.router.navigate(['campanha/listar-campanhas'])
    }
  }
}
