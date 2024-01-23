import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgFor
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    response: string;

    login_form = this.formBuilder.group({
        user_name: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]]
    });

    constructor(
        private formBuilder: FormBuilder,
        private account_service: AccountService,
        private router: Router,
        private toast: ToastrService
    ) {
        this.response = '';
    }

    submitLogin() {
        let login = this.account_service.loginUser(this.login_form);
        login.subscribe(data => {
            console.log(data.body);
            if (data.body.user_id) {
                console.log(data.body);
                localStorage.setItem('user_id', data.body.user_id);
                localStorage.setItem('user_name', data.body.user_name);
                this.toast.success('Login Successful!');
                this.router.navigate(['/home']);
            } else  {
                this.response = data.body;
            }
        });

        this.login_form.controls.user_name.reset();
        this.login_form.controls.email.reset();
        console.log(this.response);

    }

}
