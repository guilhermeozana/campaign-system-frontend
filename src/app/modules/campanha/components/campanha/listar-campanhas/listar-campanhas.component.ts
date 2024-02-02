import { Observable } from 'rxjs';
import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CampanhaService } from 'src/app/shared/services/campanha.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';
import { Campaign } from '../../../models/campaign';
import * as moment from 'moment';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-listar-campanhas',
  templateUrl: './listar-campanhas.component.html',
  styleUrls: ['./listar-campanhas.component.scss']
})
export class ListarCampanhasComponent implements AfterViewInit{
  interfaceProperty = interfaceProperties;
  displayedColumns: string[] = ['id', 'name', 'description', 'active', 'starts_at', 'stop_at', 'actions'];
  campaigns!: Campaign[];
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
    this.listarCampanhas();
  }

  listarCampanhas(){
    this.campanhaService.getCampaigns().subscribe(campaigns => {
      campaigns.forEach(campaign => {
        campaign.starts_at = campaign.starts_at ? moment(campaign.starts_at).format('DD/MM/YYYY') : null;
        campaign.stop_at = campaign.stop_at ? moment(campaign.stop_at).format('DD/MM/YYYY') : null;
        campaign.active = campaign.active ? 'Sim' : 'Não'
      })

      this.dataSource = new MatTableDataSource<Campaign>(campaigns);
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

  incluirCampanha(){
    this.router.navigate(['campanha/manter-campanha']);
  }

  editarCampanha(element: any){
    this.router.navigate([`campanha/manter-campanha/${element.id}`]);
  }

  excluirCampanha(element: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {name: element.name, type: 'Campanha'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.campanhaService.deleteCampaign(element.id).subscribe(() => {
          this.messageService.showSuccessMessage('Campanha excluída com sucesso!', 5000)
          this.listarCampanhas();
        })
      }

    });
  }


}
