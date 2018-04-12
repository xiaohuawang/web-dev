import {Component, OnInit} from '@angular/core';
import {RouterLink, ActivatedRoute, Router} from '@angular/router';

import {UserService} from '../../../service/user.service.client';
import {User} from '../../../model/user.model.client';
import {SharedService} from '../../../service/shared.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // properties
  user: any = {};
  userId: String;
  errorFlag: boolean;
  errorMessage: String;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) {
  }

  ngOnInit() {

    console.log(this.sharedService.user);
    if (this.sharedService.user === '') {
      const url: any = '/login';
      this.router.navigate([url]);
    } else {
      this.user = this.sharedService.user;
      this.userId = this.user._id;
      console.log('this uid= ' + this.user._id);
      return this.userService.findUserById(this.user._id).subscribe(
        (user: any) => {
          this.user = user;
        },
        (error: any) => {
          this.errorFlag = true;
          this.errorMessage = error.toString();
        }
      );
    }
  }

  updateUserInfo(updatedUser) {
    this.userService.updateUser(this.userId, updatedUser).subscribe(
      (user: any) => {
        console.log('profile user update user name = ' + user.username);
        this.errorFlag = false;
        this.user = user;
        this.ngOnInit();
      },
      (error: any) => {
        this.errorFlag = true;
        this.errorMessage = error;
      }
    );
  }

  deleteUser() {
    this.userService.deleteUser(this.userId).subscribe(
      (user: any) => {
        const url: any = '/login';
        this.router.navigate([url]);
      },
      (error: any) => {
        this.errorFlag = true;
        this.errorMessage = error;
      }
    );
  }

  logout() {
    this.userService.logout().subscribe(
      (data: any) => this.router.navigate(['/login'])
    );
  }
}
