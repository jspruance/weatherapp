import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherdetailsComponent } from './weatherdetails.component';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { SearchComponent } from '../../components/search/search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WeatherService } from '../../services/weather.service';
import { DateService } from '../../services/date.service';
import { SavedlocationsService } from '../../services/savedlocations.service';
import { HttpModule } from '@angular/http';

describe('WeatherdetailsComponent', () => {
  let component: WeatherdetailsComponent;
  let fixture: ComponentFixture<WeatherdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherdetailsComponent, SearchComponent ],
      imports: [
        HttpModule,
        RouterTestingModule,
        SimpleNotificationsModule.forRoot()
      ],
      providers:[WeatherService, SavedlocationsService, DateService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
