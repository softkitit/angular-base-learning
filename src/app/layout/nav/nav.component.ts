import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@core/service/auth.service';

import {ThemeService} from '@core/service/theme.service';
import {environment} from '@env';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public version = environment.version;
  public repoUrl = 'https://github.com/softkitit/angular-base-learning';

  public isDarkTheme$: Observable<boolean>;

  navItems = [
    {link: '/dashboard/home', title: 'Home'},
    {link: '/about', title: 'About'},
    {link: '/contact', title: 'Contact'}
  ];

  constructor(private themeService: ThemeService,
              private authService: AuthService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.isDarkTheme$ = this.themeService.getDarkTheme();
  }

  toggleTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login'])
  }
}
