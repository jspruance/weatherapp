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
  private sub: any;

  @Output()
  changeWeather: EventEmitter<any> = new EventEmitter<any>();

  constructor(private weatherService:WeatherService,
              private router: Router,
              private route: ActivatedRoute
             ) { }

  ngOnInit() {
    // if the current url containes a location parameter, run the search using it
    this.sub = this.route.params.subscribe(params => {
      this.location = params['location'];
      if (this.location) {
        this.getWeather(this.location);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getWeather(locationinput) {
    this.location = locationinput;
    
    // if search is run from the weather page
    if(window.location.href.indexOf("weather") > -1) {
      this.weatherService.getWeather(this.location).subscribe((data) => {
        this.changeWeather.emit(data);
      });
    // if search is run from another page
    } else {
      this.router.navigate(['/weather', this.location]);
    }
    
    return false;
  }

}