import { Component, OnInit, AfterViewInit
  , OnDestroy, ViewChildren, QueryList, ElementRef, ViewChild } 
  from '@angular/core';
  import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-secciones-nav',
  templateUrl: './secciones-nav.component.html',
  styleUrls: ['./secciones-nav.component.css']
})
export class SeccionesNavComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren("categories") private categories: QueryList<ElementRef<HTMLElement>>;
  categoriesButtonClicked: Subscription = new Subscription();
  @ViewChild('categoriesButton') categoriesButton: ElementRef;
  @ViewChild('categoriesContainer') categoriesContainer: ElementRef;
  isShowing:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.getWhenCategoriesButtonIsClicked();
    this.setColorAboutCategory();
  }

  public changingColorSelectedCategori(event: any):void {
    if(event.target.tagName == "DIV") return;
    let linksArr = this.gettingLinksArr();
    for(let i=0; i<linksArr.length; i++){
      linksArr[i].firstChild.style.backgroundColor = "";
    }
    event.target.style.backgroundColor = "#dab78f";
    this.x();
  }

  private getWhenCategoriesButtonIsClicked(): void{
    this.categoriesButtonClicked = fromEvent(this.categoriesButton.nativeElement, "click")
    .subscribe(()=>{
      this.x();
    });
  }

  private setColorAboutCategory(): void{
    let linksArr = this.gettingLinksArr();
      linksArr[0].firstChild.style.backgroundColor = "#dab78f";
  }

  private gettingLinksArr(): Array<any>{
    let arr = this.categories.toArray();
    let ulTag = arr[0].nativeElement;
    let linksArr: Array<any> = Array.from(ulTag.children);
    return linksArr;
  }

  private x():void{
    if(!this.isShowing){ 
      this.categoriesContainer.nativeElement.classList.remove("divCategories");
      this.isShowing = true;
    }else{
      this.categoriesContainer.nativeElement.classList.add("divCategories");
      this.isShowing = false;
    }
  }

  ngOnDestroy(){
    //For performance reasons
    this.categoriesButtonClicked.unsubscribe();
  }

}
