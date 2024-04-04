import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioNegociosComponent } from './formulario-negocios.component';

describe('FormularioNegociosComponent', () => {
  let component: FormularioNegociosComponent;
  let fixture: ComponentFixture<FormularioNegociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioNegociosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioNegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
