import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriasDeExitoComponent } from './historias-de-exito.component';

describe('HistoriasDeExitoComponent', () => {
  let component: HistoriasDeExitoComponent;
  let fixture: ComponentFixture<HistoriasDeExitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriasDeExitoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriasDeExitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
