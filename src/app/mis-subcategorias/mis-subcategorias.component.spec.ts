import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisSubcategoriasComponent } from './mis-subcategorias.component';

describe('MisSubcategoriasComponent', () => {
  let component: MisSubcategoriasComponent;
  let fixture: ComponentFixture<MisSubcategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisSubcategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisSubcategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
