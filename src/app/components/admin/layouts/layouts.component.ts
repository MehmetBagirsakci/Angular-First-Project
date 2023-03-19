import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SidenavComponent,
    FooterComponent,RouterModule
  ],
})
export class LayoutsComponent {

}
