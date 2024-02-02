import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { CampanhaService } from 'src/app/shared/services/campanha.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Campaign } from '../../../models/campaign';

@Component({
  selector: 'app-manter-banner',
  templateUrl: './manter-banner.component.html',
  styleUrls: ['./manter-banner.component.scss']
})
export class ManterBannerComponent {
  interfaceProperty = interfaceProperties;
  isEdicao = false;
  acao: string = 'Incluir';
  simNaoOptions = [{label: 'Sim', value: true}, {label: 'Não', value: false}]
  campanhas!: Campaign[];
  nomeArquivo = 'Nenhum arquivo selecionado.'
  file: any

  form = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    description: [null],
    is_html: [null],
    url: [null],
    type_banner: [null, Validators.required],
    campaign_id: [null, Validators.required],
    image: [null],
    selecao:['image_link']
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
      this.campanhaService.getBannerById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(campaign => {
        this.form.patchValue(campaign)
      });
    }

    this.campanhaService.getCampaigns().subscribe(campaigns => this.campanhas = campaigns)

  }

  onUpload(event: any){
    this.file = event.target.files[0]
  }

  onCancelaUpload(){
    this.file = null;

    this.form.controls['selecao'].setValue('image_link')
  }

  onCancela(): void {
    this.router.navigate(['campanha/listar-banners'])
  }

  onSubmit(){
    if(this.form.controls['selecao'].value === 'escolher_arquivo') {
      this.form.controls['image'].setValue(this.file);
    }

    if(this.form.valid){
      console.log(this.form.value)
      if(!this.isEdicao){
        this.campanhaService.saveBanner(this.form.value).subscribe(result => {
          this.messageService.showSuccessMessage(`${interfaceProperties.label.banner} ${interfaceProperties.mensagem.salvo_com_sucesso}`, 5000)
        })

      } else {
        console.log(this.form.value)
        this.campanhaService.updateBanner(this.form.value).subscribe(result => {
          this.messageService.showSuccessMessage(`${interfaceProperties.label.banner} ${interfaceProperties.mensagem.atualizado_com_sucesso}`, 5000)
        })
      }

      this.router.navigate(['campanha/listar-banners'])
    }
  }
}
