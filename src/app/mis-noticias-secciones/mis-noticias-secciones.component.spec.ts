import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisNoticiasSeccionesComponent } from './mis-noticias-secciones.component';

describe('MisNoticiasSeccionesComponent', () => {
  let component: MisNoticiasSeccionesComponent;
  let fixture: ComponentFixture<MisNoticiasSeccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisNoticiasSeccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisNoticiasSeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
