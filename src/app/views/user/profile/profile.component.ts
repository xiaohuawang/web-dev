import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';

import {UserService} from '../../../service/user.service.client';
import {User} from '../../../model/user.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // properties
  userId: String;
  user: User;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
      }
    );
    console.log('profile-----userid' + this.userId);
    this.user = this.userService.findUserById(this.userId);
  }

  updateUser(user) {
    this.userService.updateUser(this.userId, user);
    this.user = user;
  }
}
