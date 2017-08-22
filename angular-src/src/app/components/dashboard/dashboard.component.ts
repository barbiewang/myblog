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
  text:String;
  time:String;
  username:String;
  isLogged:boolean = false;
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
  
  IfLogged(){
    if(this.authService.loggedIn()){
      this.isLogged = !this.isLogged;
    }else{
      this.isLogged = false;
      this.flashMessage.show("请登录后留言",{cssClass:'alert-danger',timeout:3000});
    }
  }
  closeComment(){
    this.isLogged = false;
  }
  onSubmitComment(){
    const userString = localStorage.getItem("user");
    let user=JSON.parse(userString);
    let content = (<HTMLTextAreaElement> document.getElementById("textArea")).value
     const comment = {
       text:content,
       username:user.username
        }
      console.log(comment);
    this.authService.leaveComment(comment).subscribe(data=>{
      if (data.success){
        this.flashMessage.show("谢谢留言",{timeout:3000,cssClass:'alert-success'});
        this.router.navigate(['/dashboard']);
        this.isLogged = false;
        

      } else {
          this.flashMessage.show("评论失败，请重试",{timeout:3000,cssClass:'alert-danger'});
      }
    
  })
  }


}
