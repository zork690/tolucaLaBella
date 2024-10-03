import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociosFavoritosComponent } from './negocios-favoritos.component';

describe('NegociosFavoritosComponent', () => {
  let component: NegociosFavoritosComponent;
  let fixture: ComponentFixture<NegociosFavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegociosFavoritosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NegociosFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
