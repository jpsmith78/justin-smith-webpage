import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { AccountService } from '../account.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        NgIf,
        NgFor,
        CommonModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['../app.component.css', './login.component.css']
})
export class LoginComponent {

    login_form = this.formBuilder.group({
        user_name: ['', Validators.required],
        email: ['', [Validators.required]]
    });

    constructor(
        private formBuilder: FormBuilder,
        private account_service: AccountService,
        private router: Router
    ) {
        if (localStorage.getItem('alert') === 'Login Successful!') {
            this.router.navigate(['/home'])
        }
    }

    submitLogin() {
        let login = this.account_service.loginUser(this.login_form);
        login.subscribe(data => {
            if (data.body.user_id) {
                localStorage.setItem('user_id', data.body.user_id);
                localStorage.setItem('user_name', data.body.user_name);
                localStorage.setItem('alert', 'Login Successful!');
                window.location.reload();
            } else  {
                localStorage.setItem('alert', 'Login Failed!');
                window.location.reload();

            }
        });
        this.login_form.controls.user_name.reset();
        this.login_form.controls.email.reset();

    }

}
