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
  @ViewChild('categoriesContainer') categoriesContainer: ElementRef;

  categoriesButtonClicked: Subscription = new Subscription();
  isShowing:boolean = false;
  categoria: string;

  constructor() { }

  ngOnInit(): void {
    this.categoria = "Peluquerias";
  }

  ngAfterViewInit():void{
      this.getWhenCategoriesButtonIsClicked();
      
  }

  public changeCategoryName(category: string): void{
    this.categoria = category;
    this.isShowing = false;
    this.categoriesContainer.nativeElement.classList.add("divCategories");
  }

  private getWhenCategoriesButtonIsClicked(): void{
    this.categoriesButtonClicked = fromEvent(this.categoriesButton.nativeElement, "click")
    .subscribe(()=>{
      if(!this.isShowing){ 
        this.categoriesContainer.nativeElement.classList.remove("divCategories");
        this.isShowing = true;
      }else{
        this.categoriesContainer.nativeElement.classList.add("divCategories");
        this.isShowing = false;
      }
    });
  }



  ngOnDestroy(){
    //For performance reasons
    this.categoriesButtonClicked.unsubscribe();
  }

}
