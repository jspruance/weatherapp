import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AuthService } from './services/auth.service';
import { HttpModule } from '@angular/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, NavbarComponent
      ],
      imports: [
        HttpModule,
        RouterTestingModule,
        SimpleNotificationsModule.forRoot()
      ],
      providers: [AuthService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Weather App'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Weather App');
  }));
});
