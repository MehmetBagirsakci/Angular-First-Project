import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'productFilterPipe',
  standalone: true,
})
export class ProductFilterPipe implements PipeTransform {
  transform(value: Product[], filterText: string): Product[] {
    filterText = filterText 
    ? filterText.toLocaleLowerCase() 
    : '';

    return filterText
    ? value.filter((p:Product)=>p.productName.toLocaleLowerCase().indexOf(filterText)!==-1)
    : value;
  }
}
//arraylarin map ve filter gibi fonksiyonları var.
//filter yeni bir array döndürür.
//indexof aradığı şeyi bulamazsa -1 döner
