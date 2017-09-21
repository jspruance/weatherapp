import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: String;

  // notification defaults
  public options = {
    position: ["top", "right"],
    timeOut: 3000,
    pauseOnHover: true,
    lastOnBottom: true
  }

  constructor(private notificationsService: NotificationsService,
              private authService: AuthService,
              private router: Router
             ) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.username = user.name;
    }
  }

  onLogoutClick() {
    this.authService.logout();
    sessionStorage.setItem("userlogout", "true");
    this.router.navigate(['/home']);
    return false;
  }

}
