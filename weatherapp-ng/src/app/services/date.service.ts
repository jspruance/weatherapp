import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { }

  d = new Date();
  
  weekArry = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  monthArry = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  hourArry = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
  
  today = this.weekArry[this.d.getDay()];
  month = this.monthArry[this.d.getMonth()];
  date = this.d.getDate();
  hourMil = this.d.getHours();
  hour = this.hourArry[this.d.getHours()];
  minutesNum = this.d.getMinutes();
  minutes = (this.minutesNum < 10) ? "0" + this.minutesNum : this.minutesNum;
  ampm = (this.hourMil > 11) ? "pm" : "am";

  
  getDayAndDate() {
    return `${this.today}, ${this.month} ${this.date}`;
  }

  getDayAndTime() {
    return `${this.today} ${this.hour}:${this.minutes}${this.ampm}`;
  }

}
