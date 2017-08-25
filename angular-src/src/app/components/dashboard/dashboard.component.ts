import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BlogComponent } from '../blog/blog.component';
import {AboutblogService} from '../../services/aboutblog.service';

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
  blog:Object;
  isEdit:boolean=false;


  constructor(private authService:AuthService,
              private flashMessage:FlashMessagesService,
              private router:Router,
              private validateService :ValidateService,
              private aboutBlog:AboutblogService
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
  // getBlogId(item){
  //   let originblog =  this.originblogs[item];
  //   let id = originblog["_id"];
  //   this.authService.getIdBlog(id).subscribe(data=>{
  //     this.blog = data.blog;
  //   })
  //   console.info(id);
  //   return false;
  // }
  deleteBlog(id){
     this.aboutBlog.deleteBlog(id).subscribe(data=>{
      this.authService.getShareBlogs().subscribe(data=>{
        this.shareblogs = data.blogs;
      });
      this.authService.getOriginBlogs().subscribe(data=>{
        this.originblogs = data.blogs;
      })
     })
  } 

  editBlog(id){
    this.isEdit = false;
    this.aboutBlog.editBlog(id).subscribe(result=>{
      this.blog = result.blog;
      this.isEdit = true;
    })
  }  
  onUpdateSubmit(){
    this.aboutBlog.updateBlog(this.blog).subscribe(result=>{
      this.blog = result.blog;
    })
  }
  }

