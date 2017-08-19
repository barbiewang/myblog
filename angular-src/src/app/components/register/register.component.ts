import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;

  constructor(private validateService :ValidateService,
              private flashMessage:FlashMessagesService,
              private authService:AuthService,
              private router:Router
  ) { }
  
  ngOnInit() {
  }
  onRegisterSubmit(){
    const user = {
      name:this.name,
      username:this.username,
      email:this.email,
      password:this.password
    }
    if(!this.validateService.validateRegister(user)){
       this.flashMessage.show("带*号的内容为必填，请填写完整",{timeout:3000,cssClass:'alert-danger'});
        return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("邮件地址格式不正确，请填写正确的邮件地址",{timeout:3000,cssClass:'alert-danger'});
      return false;
    }
    this.authService.registerUser(user).subscribe(data=>{
      if (data.success) {
         this.flashMessage.show("注册成功，请登录",{timeout:3000,cssClass:'alert-success'});
         this.router.navigate(['/login']);
      } else {
        if (data.msg) {
          this.flashMessage.show(data.msg,{timeout:3000,cssClass:'alert-danger'});
        } else {
          this.flashMessage.show("注册失败，请重试",{timeout:3000,cssClass:'alert-danger'});
        }
        this.router.navigate(['/register']);
      }
    
    })
  }

  
}
