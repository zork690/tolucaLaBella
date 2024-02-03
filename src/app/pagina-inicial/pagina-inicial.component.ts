import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { ClienteService } from '../../app/servicios/clientes/cliente.service';
declare let $ : any;

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('categoriesButton') categoriesButton: ElementRef;
  @ViewChild('categoriesContainer') categoriesContainer: ElementRef;

  categoriesButtonClicked: Subscription = new Subscription();
  isShowing:boolean = false;
  categoria: string;
  conteo: number = 0;
  mensaje:string = "";
  isHappy: boolean = true;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.categoria = "Peluquerias";
  }

  ngAfterViewInit():void{
      //this.getWhenCategoriesButtonIsClicked();
      this.getConteoClientes();
      this.whatsAppChat();
      
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

  private getConteoClientes(){
    this.clienteService.getConteoClientes().subscribe((result: any) => {
      console.log("Result: ",result);

      this.conteo = 100 - result.conteo;
      if(this.conteo >= 50){
        this.mensaje = `¡Vamos menos de la mitad, lanzaremos en unos días más!`;
        this.isHappy = false;
      }else{
        this.mensaje = "¡Ya nos faltan menos de la mitad, ya casi lanzamos!"
        this.isHappy = true;
      }
    },
    (responseError) => {
      console.log("Ocurrio error en conteo clientes: ", responseError);
    });

  }

  private whatsAppChat(){
    $("#WAButton")
    .floatingWhatsApp({
    phone: '5217224304100', //WhatsApp Business phone number
             headerTitle: 'Platica con nosotros via WhatsApp!', //Popup Title
             popupMessage: 'Hola, mándanos un mensaje', //Popup Message
             showPopup: true, //Enables popup display
             buttonImage: '<img src="/assets/imagenes/whatsapp.jpeg" />', //Button Image
             //headerColor: 'crimson', //Custom header color
             //backgroundColor: 'crimson', //Custom background button color
             position: "right" //Position: left | right
    });
  }


  ngOnDestroy(){
    //For performance reasons
    this.categoriesButtonClicked.unsubscribe();
  }

}
