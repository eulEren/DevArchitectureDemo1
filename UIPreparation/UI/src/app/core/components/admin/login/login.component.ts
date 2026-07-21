import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LookUp } from 'app/core/models/lookUp';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { LookUpService } from 'app/core/services/lookUp.service';
import { environment } from 'environments/environment';
import { LoginUser } from './model/login-user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username:string="";
  loginUser:LoginUser=new LoginUser();


  constructor(private auth:AuthService,
    private storageService:LocalStorageService) { }

  ngOnInit() {

    this.username=this.auth.userName;
  }

  getUserName(){
    return this.username;
  }

  login(){
    this.auth.login(this.loginUser);
  }

  logOut(){
      this.storageService.removeToken();
  }

}
