import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {User} from '@data/schema/user';
import {UserService} from '@data/service';
import {of, Subject} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {catchError, delay, finalize, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  
  userInfo: Observable<User>;
  $destroy = new Subject();
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userInfo = this.userService.userInformation().pipe(
      catchError(e => {
        console.error(e);
        return of(e);
      }),
      delay(1000),
      finalize(() => this.isLoading = false),
      
      takeUntil(this.$destroy));
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
