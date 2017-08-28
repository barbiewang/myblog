import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  authToken:any;
  user:any;
  comment:any;

  constructor(private http:Http) { }
  registerUser(user){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(environment.api_base_url + "/users/register",user,{headers:headers})
          .map(res=>res.json());
  }
  validateUsername(user){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(environment.api_base_url + "/users/validate-username",{username:user.username},{headers:headers})
          .map(res=>res.json());
  }
  
  updateUser(user){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(environment.api_base_url+"/users/update",user,{headers:headers})
          .map(res=>res.json());
  }
  changePassword(user){
     let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(environment.api_base_url+"/users/password",user,{headers:headers})
          .map(res=>res.json());
  }
  authenticateUser(user){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(environment.api_base_url+"/users/authenticate",user,{headers:headers})
          .map(res=>res.json());
  }
  getProfile(){
     let headers = new Headers();
     this.loadToken();
    headers.append("Authorization",this.authToken);
    headers.append("Content-Type","application/json");
    return this.http.get(environment.api_base_url+"/users/profile",{headers:headers})
          .map(res=>res.json());
  }
  postBlog(blog){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(environment.api_base_url+"/blogs/post-blog",blog,{headers:headers})
          .map(res=>res.json());
  }
  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loggedIn(){
    var logged  = tokenNotExpired('id_token');
    return logged;
  }
  adminLoggedIn(){
    var logged  = tokenNotExpired('id_token');
    if (logged) {
      var userString = localStorage.getItem("user");
      var user = JSON.parse(userString);
      if (user.username === "jane"){
        return true;
      } else {
        return false;
      }
    } else {
      return logged;
    }
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  getOriginBlogs(){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.get(environment.api_base_url+"/blogs/blog-author?author=Jane",{headers:headers})
          .map(res=>res.json());
  }
  getShareBlogs(){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.get(environment.api_base_url+"/blogs/blog-author-notjane?author=Jane",{headers:headers})
          .map(res=>res.json());
  }
  getIdBlog(id){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.get(environment.api_base_url+"/blogs/blog/"+id,{headers:headers})
          .map(res=>res.json());
  }
  leaveComment(comment){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(environment.api_base_url+"/comments/comment",comment,{headers:headers})
          .map(res=>res.json());
  }
  getCommentsByBlogId(id){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.get(environment.api_base_url+"/comments/comment/"+id,{headers:headers})
          .map(res=>res.json());
  }
  
 
  
}
