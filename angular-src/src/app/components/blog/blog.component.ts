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
  isLogged:boolean = false;
  text:String;
  time:String;
  username:String;
  blogs:String;
  content:String;

  constructor(private authService:AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router,
    private validateService :ValidateService) { }

  ngOnInit() {
    this.authService.getOriginBlogs().subscribe(data=>{
      this.blogs = data.blogs;
      let blog3 = this.blogs[2];
      let content3 = blog3["content"];
      let container =(<HTMLBodyElement> document.getElementById("container"));
      container.innerHTML = content3;
    });
    err=>{
      console.error(err);
      return false;
    }
  }

  getDivId(){
    let divId = document.getElementById('container');
    return divId;
  }
  goBackToList(){
    this.router.navigate(['/dashboard']);
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
