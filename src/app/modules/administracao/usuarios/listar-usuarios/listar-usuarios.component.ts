import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { MatPaginator } from '@angular/material/paginator';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Usuarios } from '../../models/usuarios';
import { ManterUsuariosComponent } from '../manter-usuarios/manter-usuarios.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0', overflow: 'hidden'})),
      state('expanded', style({height: '*', overflow: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListarUsuariosComponent implements AfterViewInit {
  interfaceProperty = interfaceProperties;
  displayedColumns: string[] = ['id', 'name',  'email',  'profiles', 'created_at', 'updated_at', 'actions']
  usuarios!: Usuarios[];
  dataSource:any
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Usuarios | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: any;

  constructor(private usuariosService: UsuariosService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer){

  }

  ngOnInit(){

  }

  ngAfterViewInit() {
    this.listarUsuarios();
  }

  listarUsuarios(){
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.dataSource = new MatTableDataSource<Usuarios>(usuarios);
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

  incluirUsuarios(){
    const dialogRef = this.dialog.open(ManterUsuariosComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listarUsuarios();
    })
  }

  editarUsuarios(element: any){
    console.log(element)
    const dialogRef = this.dialog.open(ManterUsuariosComponent, {
      data: {askId: element.id, type: 'Usuarios'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarUsuarios();
    })
  }

  excluirUsuarios(element: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {name: element.name, type: 'Usuarios'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
       // this.usuariosService.deleteUsuarios(element.id).subscribe(() => {
        //  this.messageService.showSuccessMessage(`${interfaceProperties.label.perfil} ${interfaceProperties.mensagem.excluido_com_sucesso}`, 5000)
        //  this.listarUsuarios();
       // })
      }

    });
  }


}
