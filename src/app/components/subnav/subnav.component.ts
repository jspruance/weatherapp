import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.css']
})
export class SubnavComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
