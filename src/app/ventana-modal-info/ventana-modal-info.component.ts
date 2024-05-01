import { Component, OnInit, ViewChild, ElementRef, AfterViewInit
  , Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal, NgbModalOptions
  , ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventana-modal-info',
  templateUrl: './ventana-modal-info.component.html',
  styleUrls: ['./ventana-modal-info.component.css']
})
export class VentanaModalInfoComponent implements OnInit, AfterViewInit, OnChanges {

  modalOptions: NgbModalOptions;
  modalReference: NgbModalRef;
  closeResult: string;
  @ViewChild("modalcreatestore") ventanaModal: ElementRef<HTMLElement>;

  @Input() tituloModal: string;
  @Input() mensajeModal: string;

  constructor(private modalService: NgbModal
    , private router: Router
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.abrirModal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.mensajeModal.currentValue === "ok"){
      this.modalReference.close();
    }
  }

  private abrirModal() {
    this.modalReference = this.modalService.open(this.ventanaModal, this.modalOptions);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.router.navigate(["/inicio"]);
    });
  }

  /* funcion para capturar accion de teclado en modal */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
