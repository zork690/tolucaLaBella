import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisArticulosEditImagesComponent } from './mis-articulos-edit-images.component';

describe('MisArticulosEditImagesComponent', () => {
  let component: MisArticulosEditImagesComponent;
  let fixture: ComponentFixture<MisArticulosEditImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisArticulosEditImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisArticulosEditImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
