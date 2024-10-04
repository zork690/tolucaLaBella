import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriasSociosComercialesComponent } from './subcategorias-socios-comerciales.component';

describe('SubcategoriasSociosComercialesComponent', () => {
  let component: SubcategoriasSociosComercialesComponent;
  let fixture: ComponentFixture<SubcategoriasSociosComercialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoriasSociosComercialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoriasSociosComercialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
