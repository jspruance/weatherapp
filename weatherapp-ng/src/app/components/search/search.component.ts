import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  location:string;
  weatherRetrieved: Boolean = false;
  private sub: any;
  onWeatherPg: Boolean = false;

  @Output()
  changeWeather: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  changeForecast: EventEmitter<any> = new EventEmitter<any>();

  constructor(private weatherService:WeatherService,
              private router: Router,
              private route: ActivatedRoute
             ) { }

  ngOnInit() {
    this.onWeatherPg = window.location.href.indexOf("/weather") > -1;

    // if the current url containes a location parameter, run the search using it
    this.sub = this.route.params.subscribe(params => {
      this.location = params['location'];
      if (this.location) {
        this.getWeather(this.location, true, this.onWeatherPg);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getWeather(locationinput, forecast, onWeatherPg) {
    this.location = locationinput;
    
    // if search is run from the weather page
    if(onWeatherPg) {

      // get current weather
      this.weatherService.getWeather(this.location).subscribe((data) => {
        this.weatherRetrieved = true; // for testing
        this.changeWeather.emit(data);
      });

      if(forecast === true) {
        // get extended forecast
        this.weatherService.getForecast(this.location).subscribe((data) => {
          this.changeForecast.emit(data);
        });
      }

    // if search is run from another page
    } else {
      this.router.navigate(['/weather', this.location]);
    }

    return false;
  }

}