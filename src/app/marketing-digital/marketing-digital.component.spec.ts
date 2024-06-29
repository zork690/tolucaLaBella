import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingDigitalComponent } from './marketing-digital.component';

describe('MarketingDigitalComponent', () => {
  let component: MarketingDigitalComponent;
  let fixture: ComponentFixture<MarketingDigitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingDigitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
