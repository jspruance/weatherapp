import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SearchComponent } from './search.component';
import { WeatherService } from '../../services/weather.service';
import {Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location, CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

@Component({
  template: ''
})
class DummyComponent {
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let weatherService: WeatherService;
  let testWeather = {
    "weather":[
      {
         "main":"Rain",
         "description":"moderate rain"
      }
   ],
   "main":{
      "temp":284.81,
      "pressure":1018,
      "humidity":93,
      "temp_min":282.15,
      "temp_max":287.15
   },
   "visibility":16093,
   "wind":{
      "speed":1.5,
      "deg":170
   },
   "clouds":{
      "all":75
   },
   "name":"Redmond"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent, DummyComponent ],
      imports:[
        HttpModule,
        RouterTestingModule.withRoutes([
          { path: 'weather/Redmond', component: DummyComponent }
        ]),
      ],
      providers:[WeatherService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    // WeatherService actually injected into the component
    weatherService = fixture.debugElement.injector.get(WeatherService);

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('button'));
    el = de.nativeElement;

    // Setup spy on the 'getWeather' method
    spyOn(weatherService, 'getWeather')
    .and.returnValue(Observable.of(testWeather));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test 'getWeather' from '/weather' page - async' example
  it('set variable after getWeather promise (async)', async(() => {
    component.getWeather("Redmond", false, true);

    fixture.detectChanges();

    fixture.whenStable().then(() => { // wait for async getWeather
      fixture.detectChanges();        // update view with weather data
      expect(component.weatherRetrieved).toBe(true);
    });
  }));
   
  
  // test 'getWeather' from '/weather' page - 'fakeAsync' example
  it('set variable after getWeather promise (fakeAsync)', fakeAsync(() => {
    component.getWeather("Redmond", false, true);
    fixture.detectChanges();

    tick(3000);
    expect(component.weatherRetrieved).toBe(true);
  }));

  it('search from home page should redirect to weather page',
    async(inject([Router, Location], (router: Router, location: Location) => {
    component.getWeather("Redmond", false, false);

    fixture.detectChanges();
      
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(location.path()).toEqual('/weather/Redmond');
      console.log('after expect');
    });
  })));
  

});
