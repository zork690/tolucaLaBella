import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisNegociosAddImagesComponent } from './mis-negocios-add-images.component';

describe('MisNegociosAddImagesComponent', () => {
  let component: MisNegociosAddImagesComponent;
  let fixture: ComponentFixture<MisNegociosAddImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisNegociosAddImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisNegociosAddImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
