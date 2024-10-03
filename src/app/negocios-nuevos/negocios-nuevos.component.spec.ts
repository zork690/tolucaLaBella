import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociosNuevosComponent } from './negocios-nuevos.component';

describe('NegociosNuevosComponent', () => {
  let component: NegociosNuevosComponent;
  let fixture: ComponentFixture<NegociosNuevosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegociosNuevosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NegociosNuevosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
