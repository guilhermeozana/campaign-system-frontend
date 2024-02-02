import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { MatPaginator } from '@angular/material/paginator';
import { PerfisService } from 'src/app/shared/services/perfis.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Perfis } from '../../models/perfis';
import { ManterPerfisComponent } from '../manter-perfis/manter-perfis.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-listar-perfis',
  templateUrl: './listar-perfis.component.html',
  styleUrls: ['./listar-perfis.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0', overflow: 'hidden'})),
      state('expanded', style({height: '*', overflow: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListarPefisComponent implements AfterViewInit {
  interfaceProperty = interfaceProperties;
  displayedColumns: string[] = ['id', 'name', 'created_at', 'updated_at', 'actions']
  perfis!: Perfis[];
  dataSource:any
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Perfis | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: any;

  constructor(private perfisService: PerfisService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer){

  }

  ngOnInit(){

  }

  ngAfterViewInit() {
    this.listarPerfis();
  }

  listarPerfis(){
    this.perfisService.getPerfis().subscribe(perfis => {
      this.dataSource = new MatTableDataSource<Perfis>(perfis);
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

  incluirPerfis(){
    const dialogRef = this.dialog.open(ManterPerfisComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listarPerfis();
    })
  }

  editarPerfis(element: any){
    console.log(element)
    const dialogRef = this.dialog.open(ManterPerfisComponent, {
      data: {askId: element.id, type: 'Perfis'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarPerfis();
    })
  }

  excluirPerfis(element: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {name: element.name, type: 'Perfis'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.perfisService.deletePerfis(element.id).subscribe(() => {
          this.messageService.showSuccessMessage(`${interfaceProperties.label.perfil} ${interfaceProperties.mensagem.excluido_com_sucesso}`, 5000)
          this.listarPerfis();
        })
      }

    });
  }


}
