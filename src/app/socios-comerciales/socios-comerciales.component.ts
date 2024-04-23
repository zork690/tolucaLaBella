import { Component, OnInit, ViewChild, ElementRef
  ,ViewChildren, QueryList, AfterViewInit
  , OnDestroy
 } from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { negociosInfo } from '../../assets/mockDemoNegociosInfo';
import {AppConfig} from '../../app/servicios/config/app.config';

@Component({
  selector: 'app-socios-comerciales',
  templateUrl: './socios-comerciales.component.html',
  styleUrls: ['./socios-comerciales.component.css']
})
export class SociosComercialesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('categoriesContainer') categoriesContainer: ElementRef;
  @ViewChild('categoriesButton') categoriesButton: ElementRef;
  @ViewChildren("categories") private categories: QueryList<ElementRef<HTMLElement>>;
  categoriesButtonClicked: Subscription = new Subscription();

  categoria: string;
  isShowing:boolean = false;
  negociosInfo = negociosInfo;
  imagenesBasePath: string;
  apiEndPoint: string;

  constructor(private config: AppConfig) {
    this.apiEndPoint = this.config.getConfig('apiEndPoint');
    this.imagenesBasePath = this.config.getConfig('pathImages');
   }

  ngOnInit(): void {
    this.categoria = "Peluquerias";
    console.log("MOCK INFO: ",negociosInfo);
  }

  ngAfterViewInit(): void{
    this.getWhenCategoriesButtonIsClicked();
    //this.setColorAboutCategory();
  }

  public changingColorSelectedCategori(event: any):void {
    if(event.target.tagName == "DIV") return;
    let linksArr = this.gettingLinksArr();
    for(let i=0; i<linksArr.length; i++){
      linksArr[i].style.backgroundColor = "";
    }
    //event.target.style.backgroundColor = "#dab78f";
    this.isShowing = true;
    this.changeCategoryName(event.target.text);
    this.x();
  }

  private changeCategoryName(category: string): void{
    this.categoria = category;
  }

  private gettingLinksArr(): Array<any>{
    let arr = this.categories.toArray();
    let ulTag = arr[0].nativeElement;
    let linksArr: Array<any> = Array.from(ulTag.children);
    return linksArr;
  }

  private x():void{
    this.categoriesContainer.nativeElement.classList.add("backgroundCategories");
    if(!this.isShowing){
      this.categoriesContainer.nativeElement.classList.remove("divCategories");
      this.isShowing = true;
    }else{
      this.categoriesContainer.nativeElement.classList.add("divCategories");
      this.isShowing = false;
    }
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

  ngOnDestroy(){
    //For performance reasons
    this.categoriesButtonClicked.unsubscribe();
  }

}
