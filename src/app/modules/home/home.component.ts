import { Component } from '@angular/core';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  interfaceProperty = interfaceProperties;
}
