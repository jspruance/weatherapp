import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { LoginComponent } from './login.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let authService: AuthService;
  
  let authServiceStub = {
    "success":true,
    "token":"abc123",
    "user":{
       "id":"123",
       "name":"test",
       "username":"test",
       "email":"test@t.com",
       "locations":[]
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpModule,
        FormsModule,
        RouterTestingModule,
        SimpleNotificationsModule.forRoot()
      ],
      providers:[{provide: AuthService, useValue: authServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    
    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h2'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no title in the DOM until manually call `detectChanges`', () => {
    expect(el.textContent).toEqual('');
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(component.title);
  });

  it('component "loggedIn" property should be set to "true"', () => {
    fixture.detectChanges();
    component.loggedIn === 'true';
  });

});
