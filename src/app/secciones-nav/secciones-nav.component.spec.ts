import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionesNavComponent } from './secciones-nav.component';

describe('SeccionesNavComponent', () => {
  let component: SeccionesNavComponent;
  let fixture: ComponentFixture<SeccionesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionesNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
