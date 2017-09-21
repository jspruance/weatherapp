import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // notification defaults
  public options = {
    position: ["top", "right"],
    timeOut: 3000,
    pauseOnHover: true,
    lastOnBottom: true
  }

  constructor(private notificationsService: NotificationsService,
              private authService: AuthService
             ) { }

  ngOnInit() {

    // set logout notification when necessary
    if (sessionStorage.userlogout) {
      sessionStorage.removeItem('userlogout');
      let ns = this.notificationsService;
      setTimeout(function() {
        ns.success("Success", "You are now logged out.", this.options);
      }, 30);
    }

  }

}
