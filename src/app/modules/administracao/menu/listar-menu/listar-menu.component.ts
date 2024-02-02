import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { MatPaginator } from '@angular/material/paginator';
import { MenuService } from 'src/app/shared/services/menu.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ManterMenu } from '../../models/menu';
import { ManterMenuComponent } from '../manter-menu/manter-menu.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-listar-menu',
  templateUrl: './listar-menu.component.html',
  styleUrls: ['./listar-menu.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0', overflow: 'hidden'})),
      state('expanded', style({height: '*', overflow: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListarMenuComponent implements AfterViewInit {
  interfaceProperty = interfaceProperties;
  displayedColumns: string[] = ['id', 'name', 'url', 'icon', 'created_at', 'updated_at', 'actions']
  menu!: ManterMenu[];
  dataSource:any
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: ManterMenu | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: any;

  constructor(private menuService: MenuService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer){

  }

  ngOnInit(){

  }

  ngAfterViewInit() {
    this.listarMenu();
  }

  listarMenu(){
    this.menuService.getMenu().subscribe(menu => {
      this.dataSource = new MatTableDataSource<ManterMenu>(menu);
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

  incluirMenu(){
    const dialogRef = this.dialog.open(ManterMenuComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listarMenu();
    })
  }

  editarMenu(element: any){
    console.log(element)
    const dialogRef = this.dialog.open(ManterMenuComponent, {
      data: {askId: element.id, type: 'Menu'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarMenu();
    })
  }

  excluirMenu(element: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {name: element.name, type: 'Menu'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.menuService.deleteMenu(element.id).subscribe(() => {
          this.messageService.showSuccessMessage(`${interfaceProperties.label.menu} ${interfaceProperties.mensagem.excluido_com_sucesso}`, 5000)
          this.listarMenu();
        })
      }

    });
  }


}
