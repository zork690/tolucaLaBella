import { Component, OnInit, AfterViewInit } from '@angular/core';
declare let $ : any;

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void{
      $("#WAButton")
      .floatingWhatsApp({
      phone: '5214271000490', //WhatsApp Business phone number
               headerTitle: 'Platica con nosotros via WhatsApp!', //Popup Title
               popupMessage: 'Hola, ¿Cómo puedo ayudarte?', //Popup Message
               showPopup: true, //Enables popup display
               buttonImage: '<img src="/assets/imagenes/whatsapp.svg" />', //Button Image
               //headerColor: 'crimson', //Custom header color
               //backgroundColor: 'crimson', //Custom background button color
               position: "right" //Position: left | right
    });
  }

}
