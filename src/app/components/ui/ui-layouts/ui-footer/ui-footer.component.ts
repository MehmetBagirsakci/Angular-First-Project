import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-ui-footer',
  standalone: true,
  imports: [CommonModule],
  providers:[DatePipe],
  templateUrl: './ui-footer.component.html',
  styleUrls: ['./ui-footer.component.css']
})
export class UiFooterComponent {
  todayDate:string="";

  constructor(private _datePipe:DatePipe){
    //this.todayDate=this._datePipe.transform(new Date(),'dd.MM.yyyy')
  }
}
