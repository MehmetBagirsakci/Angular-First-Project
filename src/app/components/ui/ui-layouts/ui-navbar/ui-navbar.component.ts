import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSummaryComponent } from '../../cart-summary/cart-summary.component';

@Component({
  selector: 'app-ui-navbar',
  standalone: true,
  imports: [CommonModule,CartSummaryComponent],
  templateUrl: './ui-navbar.component.html',
  styleUrls: ['./ui-navbar.component.css']
})
export class UiNavbarComponent {

}
