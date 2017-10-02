import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location, CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AuthService } from '../../services/auth.service';
import { HttpModule } from '@angular/http';

@Component({
  template: ''
})
class DummyComponent {
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent, DummyComponent ],
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: DummyComponent },
          { path: 'weather', component: DummyComponent }
        ]),
        SimpleNotificationsModule.forRoot()
      ],
      providers:[AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click on "home" link should go to home page',
    async(inject([Router, Location], (router: Router, location: Location) => {

    fixture.detectChanges();

    fixture.debugElement.query(By.css('.home-link')).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/');
      console.log('after expect');
    });
  })));

  it('click on "weather" link should go to weather page',
    async(inject([Router, Location], (router: Router, location: Location) => {

    fixture.detectChanges();

    fixture.debugElement.query(By.css('.weather-link')).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/weather');
      console.log('after expect');
    });
  })));

});
