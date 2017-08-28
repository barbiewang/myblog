import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AboutblogService {

  constructor(private http:Http) { }

  deleteBlog(id){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.delete(environment.api_base_url+"/blogs/blog-delete/"+id,{headers:headers})
          .map(res=>res.json());
  }
  deleteComment(id){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.delete(environment.api_base_url+"/comments/comment-delete/"+id,{headers:headers})
          .map(res=>res.json());
  }
  editBlog(id){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.get(environment.api_base_url+"/blogs/blog-edit/"+id,{headers:headers})
          .map(res=>res.json());
  }
  updateBlog(blog){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(environment.api_base_url+"/blogs/blog-update/"+blog._id,blog,{headers:headers})
           .map(res=>res.json());
  }
  addLike(blog){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(environment.api_base_url+"/blogs/blog-addlike/"+blog._id,blog,{headers:headers})
           .map(res=>res.json());
  }
  cancelLike(blog){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(environment.api_base_url+"/blogs/blog-cancellike/"+blog._id,blog,{headers:headers})
           .map(res=>res.json());
  }
}
