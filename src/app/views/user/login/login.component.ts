import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../service/user.service.client';
import {User} from '../../../model/user.model.client';

import {ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: String; // see usage as two-way data binding
  password: String; // see usage as two-way data binding
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService, private router: Router) {
  }

  /*login(username: String, password: String) {
    //alert('username: ' + username);
   // if (username === 'alice' && password == "qqq") {
      const user: User = this.userService.findUserByCredential(username, password);
      if (user) {
        this.router.navigate(['/profile', user._id ]);
      }
   // }
  }*/

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    // console.log(this.username);
    // console.log(this.password);
    alert(this.username);

    const user: User = this.userService.findUserByCredentials(this.username, this.password);
    if (user) {
      console.log('login-----success');
      console.log('login-----username' + this.username);
      console.log('login-----password' + this.password);
      // this.router.navigate(['/profile']);
      // this.router.navigate(['/profile/123']);
      this.router.navigate(['/user', user._id]);
    } else {
      this.errorFlag = true;
      console.log('login-----fail');
    }
  }

  ngOnInit() {
  }

}
