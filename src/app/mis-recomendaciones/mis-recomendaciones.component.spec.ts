import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRecomendacionesComponent } from './mis-recomendaciones.component';

describe('MisRecomendacionesComponent', () => {
  let component: MisRecomendacionesComponent;
  let fixture: ComponentFixture<MisRecomendacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisRecomendacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRecomendacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
