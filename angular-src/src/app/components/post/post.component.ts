import { Component, OnInit} from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  headline:String;
  author:String;
  time:String;
  content:String;
  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: "insert content..."
  };

  constructor(private validateService :ValidateService,
          private flashMessage:FlashMessagesService,
          private authService:AuthService,
          private router:Router
  ) { }

  ngOnInit() {
  }
  


  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({ quill, html, text }) {
    
  }

  onPostSubmit(){
    const blog = {
      headline:this.headline,
      author:this.author,
      content:this.content
    }
    this.authService.postBlog(blog).subscribe(data=>{
       if(data.success){
        this.flashMessage.show(data.msg,{timeout:3000,cssClass:'alert-success'});
        this.router.navigate(['/post']);
       }else{
        this.flashMessage.show(data.msg,{timeout:3000,cssClass:'alert-success'});
        this.router.navigate(['/post']);
       }
    })
  }

}
