import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blog:String;

  constructor(private authService:AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router,
    private validateService :ValidateService) { }

  ngOnInit() {
    
  }

  getDivId(){
    let divId = document.getElementById('container');
    return divId;
  }

}
