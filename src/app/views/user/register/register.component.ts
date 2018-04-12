import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../../../service/user.service.client';
import {User} from '../../../model/user.model.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;

  user: any = {};
  username: String;
  password: String;
  verifyPassword: String;
  errorFlag: boolean;
  errorMsg: String;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  register(username: String, password: String, verifyPassword: String) {
    this.errorFlag = false;
    console.log('this is user register method');
    this.username = username;
    this.password = password;
    this.verifyPassword = verifyPassword;
    // if (this.userService.findUserByUsername(this.username) != null) {
    //   this.errorMsg = 'This username is already exist.';
    //   this.errorFlag = true;
    // }
    // updated code here
    if (username == null || username.trim() === '') {
      this.errorMsg = 'Username cannot be empty';
      this.errorFlag = true;
    }
    if (password == null || password.trim() === '') {
      this.errorMsg = 'password cannot be empty';
      this.errorFlag = true;
    }
    if (password !== verifyPassword) {
      this.errorMsg = 'the two password do not match!';
      this.errorFlag = true;
    }
    // if (this.errorFlag === true) {
    //   return;
    // }
    if (!this.errorFlag) {
      console.log('creating user');
      // this.user.username = this.username;
      // this.user.password = this.password;
      // this.userService.createUser(this.user);
      // this.router.navigate(['/user', this.userService.findUserByUsername(this.username)._id]);

      this.userService.register(username, password).subscribe(
        (user: any) => {
          this.errorFlag = false;
          console.log('register id -----' + this.user._id);
          this.router.navigate(['/profile']);
        },
        (error: any) => {
          this.errorFlag = true;
          this.errorMsg = error;
        }
      );
      console.log('register username -----' + this.user.username);
      console.log('register password -----' + this.user.password);
      // this.errorFlag = false;
      // console.log(this.userService.findUserByUsername(this.username)._id);
    }
  }
}
