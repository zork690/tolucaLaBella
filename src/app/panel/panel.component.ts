import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, AfterViewInit  {

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void{
    this.activingLinks();
  }


  private activingLinks(): void {
    let header = document.getElementById("myDIV");
    let btns = header.getElementsByClassName("nav-item");
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  }

}
