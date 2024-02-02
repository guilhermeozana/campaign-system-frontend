import { map } from 'rxjs';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { Campaign } from '../../../models/campaign';
import { MatPaginator } from '@angular/material/paginator';
import { CampanhaService } from 'src/app/shared/services/campanha.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Ask } from '../../../models/ask';
import { ManterPerguntaComponent } from '../manter-pergunta/manter-pergunta.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-listar-perguntas',
  templateUrl: './listar-perguntas.component.html',
  styleUrls: ['./listar-perguntas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0', overflow: 'hidden'})),
      state('expanded', style({height: '*', overflow: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListarPerguntasComponent implements AfterViewInit {
  interfaceProperty = interfaceProperties;
  displayedColumns: string[] = ['id', 'description', 'is_required', 'component_type', 'created_at', 'updated_at', 'actions']
  ask!: Ask[];
  dataSource:any
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Ask | null;

  tipoRespostaOptions = [
    {tipoResposta: 'Resposta curta', component: 'input'},
    {tipoResposta: 'Parágrafo', component: 'textarea'},
    {tipoResposta: 'Múltipla escolha', component: 'radio'},
    {tipoResposta: 'Caixas de seleção', component: 'checkbox'}
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: any;

  constructor(private campanhaService: CampanhaService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer){

  }

  ngOnInit(){

  }

  ngAfterViewInit() {
    this.listarPerguntas();
  }

  listarPerguntas(){
    this.campanhaService.getAsks().subscribe(asks => {
      this.dataSource = new MatTableDataSource<Ask>(asks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  aplicarFiltro(evento: any){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  incluirPergunta(){
    const dialogRef = this.dialog.open(ManterPerguntaComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listarPerguntas();
    })
  }

  editarPergunta(element: any){
    const dialogRef = this.dialog.open(ManterPerguntaComponent, {
      data: {askId: element.id, type: 'Pergunta'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarPerguntas();
    })
  }

  excluirPergunta(element: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {name: element.description, type: 'Pergunta'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.campanhaService.getAskById(element.id).subscribe(ask => {
            this.campanhaService.deleteAnswerOptions(ask.answer_options.map((answer: { id: any; }) => answer.id))

            this.campanhaService.deleteAsk(element.id).subscribe((result:any) => {
              if(result.status.message == interfaceProperties.mensagem.pergunta_desativada_vinculada_questionario) {
                this.messageService.showSuccessMessage(interfaceProperties.mensagem.pergunta_desativada_vinculada_questionario, 5000)

              } else {
                this.messageService.showSuccessMessage(`${interfaceProperties.label.pergunta} ${interfaceProperties.mensagem.excluido_com_sucesso}`, 5000)
              }

              this.listarPerguntas();
            });

          });
      }
    })
  }

  obterTipoResposta(component_type: string){
    return this.tipoRespostaOptions.find(tipoResposta => tipoResposta.component === component_type)?.tipoResposta
  }
}
