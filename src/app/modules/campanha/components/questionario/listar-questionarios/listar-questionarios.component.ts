import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { Survey } from '../../../models/survey';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { CampanhaService } from 'src/app/shared/services/campanha.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-listar-questionarios',
  templateUrl: './listar-questionarios.component.html',
  styleUrls: ['./listar-questionarios.component.scss']
})
export class ListarQuestionariosComponent implements AfterViewInit{
  interfaceProperty = interfaceProperties;
  displayedColumns: string[] = ['id', 'name', 'description', 'campaign', 'is_required', 'actions'];
  surveys!: Survey[];
  dataSource:any

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
    this.listarQuestionarios();
  }

  listarQuestionarios(){
    this.campanhaService.getSurveys().subscribe(surveys => {
      surveys.forEach(survey => {
        survey.created_at = survey.created_at ? moment(survey.created_at).format('DD/MM/YYYY hh:mm:ss') : null;
        survey.updated_at = survey.updated_at ? moment(survey.updated_at).format('DD/MM/YYYY hh:mm:ss') : null;
        this.campanhaService.getCampaignById(survey.campaign_id).subscribe(campanha => survey.campaign_name = campanha.name);
        survey.is_required = survey.is_required ? 'Sim' : 'Não'
      })

      this.dataSource = new MatTableDataSource<Survey>(surveys);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

  aplicarFiltro(evento: any){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  incluirQuestionario(){
    this.router.navigate(['campanha/manter-questionario']);
  }

  editarQuestionario(element: any){
    this.router.navigate([`campanha/manter-questionario/${element.id}`]);
  }

  excluirQuestionario(element: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {name: element.name, type: 'Questionário'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.campanhaService.deleteSurvey(element.id).subscribe(() => {
          this.messageService.showSuccessMessage('Questionário excluído com sucesso!', 5000)
          this.listarQuestionarios();
        })
      }

    });
  }
}
