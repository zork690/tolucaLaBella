import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosSociosComercialesComponent } from './comentarios-socios-comerciales.component';

describe('ComentariosSociosComercialesComponent', () => {
  let component: ComentariosSociosComercialesComponent;
  let fixture: ComponentFixture<ComentariosSociosComercialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentariosSociosComercialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosSociosComercialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
