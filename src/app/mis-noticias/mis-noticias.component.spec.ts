import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisNoticiasComponent } from './mis-noticias.component';

describe('MisNoticiasComponent', () => {
  let component: MisNoticiasComponent;
  let fixture: ComponentFixture<MisNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisNoticiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
