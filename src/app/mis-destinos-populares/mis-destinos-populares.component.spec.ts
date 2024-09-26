import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDestinosPopularesComponent } from './mis-destinos-populares.component';

describe('MisDestinosPopularesComponent', () => {
  let component: MisDestinosPopularesComponent;
  let fixture: ComponentFixture<MisDestinosPopularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisDestinosPopularesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisDestinosPopularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
