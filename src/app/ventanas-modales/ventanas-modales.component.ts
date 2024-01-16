import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions, NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ventanas-modales',
  templateUrl: './ventanas-modales.component.html',
  styleUrls: ['./ventanas-modales.component.css']
})
export class VentanasModalesComponent implements OnInit {

  modalOptions:NgbModalOptions;
  closeResult: string;


  constructor(
    private modalService: NgbModal
    ) {

this.modalOptions = {
        backdrop: 'static',
        backdropClass: 'customBackdrop'
      };

     }

  ngOnInit(): void {
  }

      public abrirModal(content) {
        this.modalService.open(content, this.modalOptions).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      /* funcion para capturar accion de teclado en modal */
      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }

}
