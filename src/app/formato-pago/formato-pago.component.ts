import { Component, OnInit, AfterViewInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { base64Images } from '../../app/constantes/base64Images';

@Component({
  selector: 'app-formato-pago',
  templateUrl: './formato-pago.component.html',
  styleUrls: ['./formato-pago.component.css']
})
export class FormatoPagoComponent implements OnInit, AfterViewInit {

  srcBase64ZorkTolucoLogo:string = base64Images.zorkTolucoLogo;
  srcBase64TolucaLaBellaLogo:string = base64Images.tolucaLaBellaLogo;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.clickButton();
  }

  private buildPDF(){
    console.log("Generating PDF ...");
    let invoicePayment = document.getElementById("mainContainer");
    html2canvas(invoicePayment,{useCORS: true}).then((canvas)=>{
      //convert the canvas  into a string url
      const image = canvas.toDataURL("image/png");
      //console.log(image);
      //letter page width
      const widthPage = 215.9;
      //letter page height
      const heightPage = 279.4;

      const heightCalculate = canvas.height * widthPage / canvas.width;

      //initialize the PDF
      const pdf = new jsPDF("p", "mm", "letter");
      pdf.addImage(image, 'PNG', 0, 0, widthPage, heightCalculate);
      pdf.save("reciboPago.pdf");
    });
  }


  
 
  private clickButton() {
    const buttonToPdf = document.getElementById("generatePDFButton");
    buttonToPdf.addEventListener("click", ()=>{
      this.buildPDF();
    });
  }


}
