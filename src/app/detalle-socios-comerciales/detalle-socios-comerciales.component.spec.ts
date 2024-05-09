import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSociosComercialesComponent } from './detalle-socios-comerciales.component';

describe('DetalleSociosComercialesComponent', () => {
  let component: DetalleSociosComercialesComponent;
  let fixture: ComponentFixture<DetalleSociosComercialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleSociosComercialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSociosComercialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
