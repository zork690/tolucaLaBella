import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaModalInfoComponent } from './ventana-modal-info.component';

describe('VentanaModalInfoComponent', () => {
  let component: VentanaModalInfoComponent;
  let fixture: ComponentFixture<VentanaModalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaModalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaModalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
