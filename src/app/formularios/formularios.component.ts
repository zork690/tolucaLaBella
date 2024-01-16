import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {

  texto = "";
  numero = 1000;
  selectCP: any ={};
  cplist: any[] = [
  {
    "cp":1000
  },
  {
    "cp":2000
  },
  {
    "cp":3000
  },
  {
    "cp":4000
  },
  {
    "cp":5000
  }
  ];

  constructor() { }

  ngOnInit(): void {
  }



/*****PARA CONVERTIR IMAGEN A BASE64*****/


  public convertir(evento){
    let fileList: FileList = evento.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      console.log("ARCHIVO: ", file);
      this.handleInputChange(file);
    }
  }

  private   _handleReaderLoaded(e) {
    let reader = e.target;
    let base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    console.log("BASE64: ", base64result);
  }

  private handleInputChange(files) {
    let file = files;
    let pattern = /image-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      console.log('PARECE QUE NO ES UNA IMAGEN');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

}
