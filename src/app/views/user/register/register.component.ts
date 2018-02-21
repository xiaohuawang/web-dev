import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../../../service/user.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;

  user: any = {_id: '', username: '', password: ''};
  username: String;
  password: String;
  verifyPassword: String;
  errorFlag: boolean;
  errorMsg: String;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.verifyPassword = this.registerForm.value.verifyPassword;

    if (this.userService.findUserByUsername(this.username) != null) {
      this.errorMsg = 'This username is already exist.';
      this.errorFlag = true;
    }
    if (this.password !== this.verifyPassword) {
      this.errorMsg = 'Password and Verify Password do not match.';
      this.errorFlag = true;
    }
    if (!this.errorFlag) {
      this.user.username = this.username;
      this.user.password = this.password;
      this.userService.createUser(this.user);
      console.log('register username -----' + this.user.username);
      console.log('register password -----' + this.user.password);
      console.log('register user id ------' + this.userService.findUserByUsername(this.username)._id);
      // console.log(this.userService.findUserByUsername(this.username)._id);
      this.router.navigate(['/user', this.userService.findUserByUsername(this.username)._id]);
    }
  }
}
