import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories:Category[]=[]

  constructor(private categoryService:CategoryService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((response)=>{
      this.categories=response.data;
    })
  }
  
}
