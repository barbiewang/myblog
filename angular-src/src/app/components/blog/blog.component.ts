import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AboutblogService } from '../../services/aboutblog.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
  isLogged: boolean = false;
  isclicked: boolean = false;
  isadded: boolean = false;
  isreplyed:Array<Boolean> = Array<Boolean>();
  text: String;
  blog: Object;
  comments: Array<Object>;
  baseurl : String;
  
  constructor(private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private validateService: ValidateService,
    private aboutBlog: AboutblogService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.baseurl = environment.api_base_url;
    let blogId = document.location.pathname.split("/").pop()
    this.authService.getIdBlog(blogId).subscribe(data => {
      this.blog = data.blog;
      let container = (<HTMLBodyElement>document.getElementById("container"));
      container.innerHTML += this.blog["content"];

      let shareBtn = (<HTMLButtonElement>document.getElementById("share-btn"));
      shareBtn.setAttribute("data-shareUrl", this.baseurl + "/blog/" + this.blog["_id"]);
      shareBtn.setAttribute("data-shareTitle", this.blog["headline"]);
    })

    this.authService.getCommentsByBlogId(blogId).subscribe(data => {
      this.comments = data.comments;
      console.log(this.comments);
    })
  }
  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/js/basicShare.min.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  getDivId() {
    let divId = document.getElementById('container');
    return divId;
  }
  goBackToList() {
    this.router.navigate(['/dashboard']);
  }
  IfLogged() {
    if (this.authService.loggedIn()) {
      this.isLogged = !this.isLogged;
    } else {
      this.isLogged = false;
      this.flashMessage.show("请登录后留言", { cssClass: 'alert-danger', timeout: 3000 });
      alert("请登录后留言");
    }
  }
  closeComment() {
    this.isLogged = false;
  }
  onSubmitComment() {
    const userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    let content = (<HTMLTextAreaElement>document.getElementById("textArea")).value;
    const comment = {
      text: content,
      username: user.username,
      blogid: this.blog["_id"],
      time: (new Date()).toLocaleString,

    }
    this.authService.leaveComment(comment).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("谢谢留言", { timeout: 3000, cssClass: 'alert-success' });
        this.isLogged = false;
      } else {
        this.flashMessage.show("评论失败，请重试", { timeout: 3000, cssClass: 'alert-danger' });
      }
    })
    let blogId = document.location.pathname.split("/").pop();
    this.authService.getCommentsByBlogId(blogId).subscribe(data => {
      this.comments = data.comments;

    })
  }

  editBlog(id) {
    this.aboutBlog.editBlog(id).subscribe(data => {
      this.blog = data.blog;
      this.isclicked = !this.isclicked;

    })
  }
  onUpdateSubmit() {
    this.aboutBlog.updateBlog(this.blog).subscribe(data => {
      this.blog = data.blog;
    })
  }
  Zan() {
    this.isadded = !this.isadded;
    let like = (<HTMLBodyElement>document.getElementById("like"));
    console.log("like", this.isadded);

    if (this.isadded) {
      this.aboutBlog.addLike(this.blog).subscribe(data => {
        this.blog = data.blog;
        console.log("add", this.blog["like"]);
        like.innerText = this.blog["like"];
      })
    } else {
      this.aboutBlog.cancelLike(this.blog).subscribe(data => {
        this.blog = data.blog;
        console.log("cancel", this.blog["like"]);
        like.innerText = this.blog["like"];
      })
    }


  }
  deletecomment(id) {
    let blogId = document.location.pathname.split("/").pop()
    this.aboutBlog.deleteComment(id).subscribe(data => {
      this.authService.getCommentsByBlogId(blogId).subscribe(data => {
        this.comments = data.comments;
      });
    })
  }
  isreply(idx){
    this.isreplyed[idx] = !this.isreplyed[idx];                              
  }
  replyComment(id,rootid,name){
    this.IfLogged();
    if (rootid == undefined ) {
      rootid=id;
    }
    const userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    const replycomment = {
      text:this.text,
      username:user.username,
      blogid:this.blog["_id"],
      replyid:id,
      rootid:rootid,
      replyusername:name
    }
    this.authService.leaveComment(replycomment).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("谢谢留言", { timeout: 3000, cssClass: 'alert-success' });
        this.isLogged = false;

      } else {
        this.flashMessage.show("评论失败，请重试", { timeout: 3000, cssClass: 'alert-danger' });
      }
    })
    let blogId = document.location.pathname.split("/").pop();
    this.authService.getCommentsByBlogId(blogId).subscribe(data => {
      let cs = <Array<Object>>data.comments;
      let as = Array<Boolean>(cs.length);
      this.comments = data.comments;
      console.log(this.comments);
      this.isreplyed = as;
  })
  }

}
