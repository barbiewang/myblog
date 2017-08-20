import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  isEdit:boolean=false;
  isEditPassword:boolean=false;

  constructor(private authservice:AuthService,
              private router:Router,
              private validateService :ValidateService,
              private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(profile=>{
      this.user = profile.user;
    },
    err=>{
      console.log(err);
      return false;
    }
  )
  }

  editUser(){
    this.isEdit = !this.isEdit;
  }
  editPassword(){
    this.isEditPassword = !this.isEditPassword;
  }

  onChangeSubmit(){ 
    this.authservice.updateUser(this.user).subscribe(data=>{
      if(data.success){
         this.flashMessage.show("信息修改成功",{timeout:3000,cssClass:'alert-success'});
      } else {
         this.flashMessage.show("修改失败，请重试",{timeout:3000,cssClass:'alert-danger'});
      }
    });
  }
  onChangePassword() { 
    let password1 = (<HTMLInputElement> document.getElementById("password1") ).value;
    let password2 = (<HTMLInputElement>document.getElementById("password2")).value;
    console.log(password1,password2);
    if(password1 !== null &&  password1 !== undefined &&  password1 === password2) {
      this.authservice.changePassword(this.user).subscribe(data=>{
        if (data.success) {
          this.flashMessage.show("密码修改成功",{timeout:3000,cssClass:'alert-success'});
        } else {
          this.flashMessage.show("修改失败，请重试",{timeout:3000,cssClass:'alert-danger'});
        }
      });
    } else {
      this.flashMessage.show("两次密码不匹配，请输入相同密码",{timeout:3000,cssClass:'alert-danger'});
      return false;

    }
    
  }
  closeModify(){
    this.isEdit = false;
    this.isEditPassword = false;
  }
}