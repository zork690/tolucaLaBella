import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoPagoComponent } from './formato-pago.component';

describe('FormatoPagoComponent', () => {
  let component: FormatoPagoComponent;
  let fixture: ComponentFixture<FormatoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatoPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
