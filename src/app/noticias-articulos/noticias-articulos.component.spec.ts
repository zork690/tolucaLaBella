import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasArticulosComponent } from './noticias-articulos.component';

describe('NoticiasArticulosComponent', () => {
  let component: NoticiasArticulosComponent;
  let fixture: ComponentFixture<NoticiasArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasArticulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
