import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisHistoriasDeExitoComponent } from './mis-historias-de-exito.component';

describe('MisHistoriasDeExitoComponent', () => {
  let component: MisHistoriasDeExitoComponent;
  let fixture: ComponentFixture<MisHistoriasDeExitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisHistoriasDeExitoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisHistoriasDeExitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
