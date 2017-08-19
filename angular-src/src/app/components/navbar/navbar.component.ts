import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService,
              private flashMessage:FlashMessagesService,
              private router:Router) { }

  ngOnInit() {
  }
  onLogOutClick(){
     this.authService.logout();
     this.flashMessage.show("您已退出登录",{cssClass:"alert-success",timeout:3000});
     this.router.navigate(['']);
     return false;
  }
}
