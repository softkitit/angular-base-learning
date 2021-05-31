import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '@core/service/auth.service';
import {UserService} from '@data/service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  signupForm: FormGroup;
  $destroy = new Subject();
  signUpConflict = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService) {
    this.signupForm = this.buildForm();
  }

  get f() {
    return this.signupForm.controls;
  }

  buildForm() {
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.checkPasswords
    });
  }

  signup() {
    if (this.signupForm.valid) {
      this.userService.signup(this.signupForm.value)
        .subscribe(value => {
          this.router.navigate([ '/auth/login' ]);
        }, error => {
          if (error.status === 409) {
            this.signUpConflict = true;
            this.signupForm.markAsUntouched();
          } else if (error.status === 400) {

            const errors = (error.error || []).reduce((acc, v) => {
              acc = {...acc, ...v};
              return acc;
            }, {});

            Object.entries(errors).forEach(([k, v]) => {
              if(typeof k === 'string') {
                this.signupForm.controls[k].setErrors({backend: v});
              }
            })
          }
        });
    }
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : {notSame: true}
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
