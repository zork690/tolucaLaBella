import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasSociosComercialesComponent } from './categorias-socios-comerciales.component';

describe('CategoriasSociosComercialesComponent', () => {
  let component: CategoriasSociosComercialesComponent;
  let fixture: ComponentFixture<CategoriasSociosComercialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasSociosComercialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasSociosComercialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
