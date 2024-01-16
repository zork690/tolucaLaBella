import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontsIconosComponent } from './fonts-iconos.component';

describe('FontsIconosComponent', () => {
  let component: FontsIconosComponent;
  let fixture: ComponentFixture<FontsIconosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FontsIconosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FontsIconosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
