import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  location:string;

  @Output()
  changeWeather: EventEmitter<any> = new EventEmitter<any>();

  constructor(private weatherService:WeatherService) { }

  ngOnInit() {
  }

  getWeather(locationinput) {
    this.location = locationinput;
    
    this.weatherService.getWeather(this.location).subscribe((data) => {
      this.changeWeather.emit(data);
    });

    return false;
  }

}