import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {

  constructor(
    private spinnerService: NgxSpinnerService
    ) { }

  ngOnInit(): void {

  }

  public logout(){
    
  }

}
