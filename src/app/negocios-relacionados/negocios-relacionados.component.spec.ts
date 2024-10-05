import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociosRelacionadosComponent } from './negocios-relacionados.component';

describe('NegociosRelacionadosComponent', () => {
  let component: NegociosRelacionadosComponent;
  let fixture: ComponentFixture<NegociosRelacionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegociosRelacionadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NegociosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
