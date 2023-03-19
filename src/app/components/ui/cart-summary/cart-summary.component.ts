import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[]=[];
  constructor(private cartService:CartService){}

 
  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartItems=this.cartService.list();
  }
  countOfProductQuantity():number{
    let sum=0;
    for (let i = 0; i < this.cartItems.length; i++) {
      sum+=this.cartItems[i].quantity;
    }
    return sum;
  }

  removeFromChart(product:Product){
    this.cartService.removeFromChart(product)
  }

}
