import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisArticulosAddImagesComponent } from './mis-articulos-add-images.component';

describe('MisArticulosAddImagesComponent', () => {
  let component: MisArticulosAddImagesComponent;
  let fixture: ComponentFixture<MisArticulosAddImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisArticulosAddImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisArticulosAddImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
