import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService, ToastrType } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  pageName: string = 'Ürün Ekleme';
  productAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['Varsayılan Değer', Validators.required],
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  addESKI() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value);
      this.productService.add(productModel).subscribe(
        (response) => {
          if (response.success) {
            this.toastr.toast(ToastrType.Success, response.message);
          } else {
            this.toastr.toast(ToastrType.Error, response.message);
          }
        },
        (responseError) => {

          if (responseError.status == 500) {
            this.toastr.toast(ToastrType.Error, "SERVİS HATASI", responseError.error.Message)
          }

          if (responseError.error.ValidationErrors.length > 0) {
            //console.log(responseError.error.ValidationErrors);
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastr.toast(ToastrType.Error, 'Doğrulama Hatası', responseError.error.ValidationErrors[i].ErrorMessage);
            }
          }
        }
      );
    } else {
      //Form valid değilse post işlemi yapılmaz.
      //alert('Formunuz eksik');
      this.toastr.toast(ToastrType.Error, 'Lütfen Formu Doğru Bir Şekilde Doldurun');
    }
  }

  add() {
    if (!this.productAddForm.valid) {
      this.toastr.toast(ToastrType.Error, 'Lütfen Formu Doğru Bir Şekilde Doldurun');
      return;
    }
    let productModel = Object.assign({}, this.productAddForm.value);
    this.productService.add(productModel).subscribe({
      next: (response) => { this.toastr.toast(ToastrType.Success, response.message); },
      error: (responseError) => {
        if (responseError.status == 500) {
          this.toastr.toast(ToastrType.Error, "SERVİS HATASI", responseError.error.Message)
        }
        else if(responseError.status=400){         
          this.toastr.toast(ToastrType.Error,"İŞ KURALI HATASI",responseError.error.message)
        }
        else if (responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastr.toast(ToastrType.Error, 'Doğrulama Hatası', responseError.error.ValidationErrors[i].ErrorMessage);
          }
        }
      }
    });
  }


}


// ,responseError=>{      
//   this.toastr.toast(ToastrType.Error,"SERVİS HATASI",responseError.error.message);
// }