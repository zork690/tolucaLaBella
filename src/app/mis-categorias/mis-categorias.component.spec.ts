import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCategoriasComponent } from './mis-categorias.component';

describe('MisCategoriasComponent', () => {
  let component: MisCategoriasComponent;
  let fixture: ComponentFixture<MisCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
