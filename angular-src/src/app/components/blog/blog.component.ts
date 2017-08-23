import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {AboutblogService} from '../../services/aboutblog.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  isLogged:boolean = false;
  isclicked:boolean = false;
  text:String;
  blog:String;
  originblogs:Array<Object>;

  constructor(private authService:AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router,
    private validateService :ValidateService,
    private aboutBlog:AboutblogService
  ) { }

  ngOnInit() {
    let blogId = document.location.pathname.split("/").pop()
    this.authService.getIdBlog(blogId).subscribe(data=>{
      this.blog = data.blog;  
      console.log(this.blog);
      let container = (<HTMLBodyElement> document.getElementById("container"));
      container.innerHTML+=this.blog["content"];
    })
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

  editBlog(id){
    this.aboutBlog.editBlog(id).subscribe(data=>{
      this.blog = data.blog;
      this.isclicked = !this.isclicked;

    })
  }
  onUpdateSubmit(){
    console.log(this.blog)
    this.aboutBlog.updateBlog(this.blog).subscribe(data=>{
      this.blog = data.blog;
      console.log(this.blog);
    })
  }

}
