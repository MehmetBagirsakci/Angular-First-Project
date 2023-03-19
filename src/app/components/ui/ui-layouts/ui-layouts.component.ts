import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiNavbarComponent } from './ui-navbar/ui-navbar.component';
import { UiSidenavComponent } from './ui-sidenav/ui-sidenav.component';
import { UiFooterComponent } from './ui-footer/ui-footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ui-layouts',
  templateUrl: './ui-layouts.component.html',
  styleUrls: ['./ui-layouts.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UiNavbarComponent,
    UiSidenavComponent,
    UiFooterComponent
  ],
})
export class UiLayoutsComponent {
  @Input() pageName:string="";

}
