import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BlogComponent } from '../blog/blog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // text:String;
  // time:String;
  // username:String;
  shareblogs:Object;
  originblogs:Array<Object>;
  blogId:String;

  constructor(private authService:AuthService,
              private flashMessage:FlashMessagesService,
              private router:Router,
              private validateService :ValidateService
  ) { }

  ngOnInit() {
  this.authService.getShareBlogs().subscribe(data=>{
            this.shareblogs = data.blogs;
  },
    err=>{
      console.log(err);
      return false;
    }
  )
  }
  onReqShareBlogs(){
    this.authService.getShareBlogs().subscribe(data=>{
      this.shareblogs = data.blogs;
    })
  }
  onReqOriginBlogs() {
    this.authService.getOriginBlogs().subscribe(data => {
      this.originblogs = data.blogs;
      console.log(data.blogs);
      
    })
  }
  


 }
