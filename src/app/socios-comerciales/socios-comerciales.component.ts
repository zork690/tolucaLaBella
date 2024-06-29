import { Component, OnInit, ViewChild, ElementRef
  ,ViewChildren, QueryList, AfterViewInit
  , OnDestroy
 } from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
//import { negociosInfo } from '../../assets/mockDemoNegociosInfo';
import {AppConfig} from '../../app/servicios/config/app.config';
import { NegociosService } from '../servicios/negocios/negocios.service';
import { Meta } from '@angular/platform-browser';

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
  //negociosInfo:any = negociosInfo;
  negociosInfo:any;
  imagenesBasePath: string;
  apiEndPoint: string;
  tituloModal:string;
  mensajeModal: string;

  constructor(private config: AppConfig
    , private negocioService: NegociosService
    , private meta: Meta) {
    this.apiEndPoint = this.config.getConfig('apiEndPoint');
    //this.apiEndPoint = "https://backend.zorktech.com.mx";
    this.imagenesBasePath = this.config.getConfig('pathImages');
   }

  ngOnInit(): void {
    //this.categoria = "Peluquerias";
    this.categoria = "Entretenimiento";
    this.meta.updateTag( 
      { name: "title", content: "Directorio Toluca la Bella" }, 
      "name=title");
    this.meta.updateTag( 
      { name: "description", content: "Conecta con empresas locales de confianza y descubre todo lo que Toluca tiene que ofrecer." }, 
      "name=description");
    this.meta.updateTag( 
      { name: "keywords", content: "Directorio, Negocios Toluca, Productos, Servicios" }, 
      "name=keywords");
    this.fetchNegocios();
  }

  ngAfterViewInit(): void{
    //this.getWhenCategoriesButtonIsClicked();
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

  public getDetailsNegocio(negocio:any):void{
    console.log("NEGOCIO A DETALLAR:", negocio);
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

  private fetchNegocios(){
    this.tituloModal = "CARGANDO NEGOCIOS";
    this.mensajeModal = "CARGANDO NEGOCIOS POR FAVOR ESPERE...";
    this.negocioService.getNegocios().subscribe((result)=>{
      console.log("Negocios list: ",result);
      this.negociosInfo = result;
      this.mensajeModal = "ok";
    }
    , (error)=>{
      console.log("An error occured fetching data: ",error);
      this.mensajeModal = `LOS NEGOCIOS NO SE HAN PODIDO CARGAR DEBIDO A UN PROBLEMA TÉCNICO
      QUE EN BREVE SOLUCIONAREMOS, POR FAVOR MANDANOS UN MENSAJE A LOS TELÉFONOS DE CONTACTO
      SI DESEAS LEVANTAR TU QUEJA.`;
    });
  }

  // PARA PROBAR EN LOCAL
  /*private fetchNegocios(){
    this.tituloModal = "CARGANDO NEGOCIOS";
    this.mensajeModal = "CARGANDO NEGOCIOS POR FAVOR ESPERE...";
    setTimeout(()=>{
      this.mensajeModal = "ok";
    }, 1000);
  }*/

  private setColorAboutCategory(): void{
    let linksArr = this.gettingLinksArr();
      linksArr[0].firstChild.style.backgroundColor = "#dab78f";
  }

  ngOnDestroy(){
    //For performance reasons
    this.categoriesButtonClicked.unsubscribe();
  }

}
