import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AboutblogService {

  constructor(private http:Http) { }

  deleteBlog(id){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.delete("http://localhost:3000/blogs/blog-delete/"+id,{headers:headers})
          .map(res=>res.json());
  }
  editBlog(id){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.get("http://localhost:3000/blogs/blog-edit/"+id,{headers:headers})
          .map(res=>res.json());
  }
  updateBlog(blog){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post("http://localhost:3000/blogs/blog-update/"+blog._id,blog,{headers:headers})
           .map(res=>res.json());
  }
}
