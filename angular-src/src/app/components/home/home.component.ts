import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  isclicked:boolean = false;

  constructor(private authService:AuthService,
             private flashMessage:FlashMessagesService,
              private router:Router
  ) { }

  ngOnInit() {
  
  }
  onLogOutClick(){
     this.authService.logout();
     this.flashMessage.show("您已退出登录",{cssClass:"alert-success",timeout:3000});
     this.router.navigate(['']);
     return false;
  }
  showQRcode(){
    this.isclicked = !this.isclicked;
  }

}
