import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { CampanhaService } from 'src/app/shared/services/campanha.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Banner } from '../../../models/banner';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-listar-banners',
  templateUrl: './listar-banners.component.html',
  styleUrls: ['./listar-banners.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0', overflow: 'hidden'})),
      state('expanded', style({height: '*', overflow: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListarBannersComponent implements AfterViewInit {
  interfaceProperty = interfaceProperties;
  displayedColumns: string[] = ['name', 'type_banner', 'campaign', 'html', 'actions'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource:any
  expandedElement!: Banner | null;


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
    this.listarBanners();
  }

  listarBanners(){
    this.campanhaService.getBanners().subscribe(banners => {
      console.log(banners)
      banners.forEach(banner => {
        this.campanhaService.getCampaignById(banner.campaign_id).subscribe(campanha => banner.campaign_name = campanha.name)
      })

      this.dataSource = new MatTableDataSource<Banner>(banners);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });


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

  incluirBanner(){
    this.router.navigate(['campanha/manter-banner']);
  }

  editarBanner(element: any){
    this.router.navigate([`campanha/manter-banner/${element.id}`]);
  }

  excluirBanner(element: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {name: element.name, type: 'Banner'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.campanhaService.deleteBanner(element.id).subscribe(() => {
          this.messageService.showSuccessMessage(`${interfaceProperties.label.banner} ${interfaceProperties.mensagem.excluido_com_sucesso}`, 5000)
          this.listarBanners();
        })
      }

    });
  }
}
