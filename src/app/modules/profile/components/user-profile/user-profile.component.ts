import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {User} from '@data/schema/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {

  @Input()
  userInfo: User;
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.userInfo);
  }

}
