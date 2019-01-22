import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFBComponent } from './login-fb.component';

describe('LoginFBComponent', () => {
  let component: LoginFBComponent;
  let fixture: ComponentFixture<LoginFBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
