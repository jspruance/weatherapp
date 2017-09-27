import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnavComponent } from './subnav.component';
import { AuthService } from '../../services/auth.service';
import { HttpModule } from '@angular/http';

describe('SubnavComponent', () => {
  let component: SubnavComponent;
  let fixture: ComponentFixture<SubnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubnavComponent ],
      providers:[AuthService],
      imports: [
        HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
