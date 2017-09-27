import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ValidateService } from '../../services/validate.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { WeatherService } from '../../services/weather.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        HttpModule,
        FormsModule,
        RouterTestingModule,
        SimpleNotificationsModule.forRoot()
      ],
      providers:[AuthService,ValidateService,WeatherService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
