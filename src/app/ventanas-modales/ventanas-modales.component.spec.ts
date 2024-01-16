import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanasModalesComponent } from './ventanas-modales.component';

describe('VentanasModalesComponent', () => {
  let component: VentanasModalesComponent;
  let fixture: ComponentFixture<VentanasModalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanasModalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanasModalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
