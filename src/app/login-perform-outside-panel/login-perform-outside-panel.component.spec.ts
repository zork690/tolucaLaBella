import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPerformOutsidePanelComponent } from './login-perform-outside-panel.component';

describe('LoginPerformOutsidePanelComponent', () => {
  let component: LoginPerformOutsidePanelComponent;
  let fixture: ComponentFixture<LoginPerformOutsidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPerformOutsidePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPerformOutsidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
