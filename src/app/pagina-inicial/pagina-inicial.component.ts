import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
declare let $ : any;

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit, AfterViewInit {

  @ViewChild('categoriesButton') categoriesButton: ElementRef;
  @ViewChild('ulCategories') ulCategories: ElementRef;

  categoriesButtonClicked: Subscription = new Subscription();
  isShowing:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void{
      this.getWhenCategoriesButtonIsClicked();
  }

  private getWhenCategoriesButtonIsClicked(): void{
    this.categoriesButtonClicked = fromEvent(this.categoriesButton.nativeElement, "click")
    .subscribe(()=>{
      if(!this.isShowing){ 
        this.ulCategories.nativeElement.classList.remove("ulCategories");
        this.isShowing = true;
      }else{
        this.ulCategories.nativeElement.classList.add("ulCategories");
        this.isShowing = false;
      }
    });
  }

  ngOnDestroy(){
    //For performance reasons
    this.categoriesButtonClicked.unsubscribe();
  }

}
