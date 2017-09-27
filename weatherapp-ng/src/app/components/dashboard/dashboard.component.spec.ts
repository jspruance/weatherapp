import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { RouterTestingModule } from '@angular/router/testing';
import { SubnavComponent } from '../../components/subnav/subnav.component';
import { WeatherService } from '../../services/weather.service';
import { SavedlocationsService } from '../../services/savedlocations.service';
import { AuthService } from '../../services/auth.service';
import { HttpModule } from '@angular/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, SubnavComponent ],
      imports: [
        HttpModule,
        RouterTestingModule,
        SimpleNotificationsModule.forRoot()
      ],
      providers: [WeatherService,AuthService,SavedlocationsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
