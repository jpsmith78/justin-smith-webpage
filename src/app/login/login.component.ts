import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { AccountService } from '../account.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        NgIf,
        NgFor
    ],
    templateUrl: './login.component.html',
    styleUrls: ['../app.component.css', './login.component.css']
})
export class LoginComponent {
    response: string;

    login_form = this.formBuilder.group({
        user_name: ['', Validators.required],
        email: ['', [Validators.required]]
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
            if (data.body.user_id) {
                localStorage.setItem('user_id', data.body.user_id);
                localStorage.setItem('user_name', data.body.user_name);
                this.toast.success('Login Successful!', '', { positionClass:'toast-custom' });
                this.router.navigate(['/home'])
                    // Don't reload right away. We want the user to be able to read the success message.
                    .then(()=> {
                        setTimeout(function() {
                            window.location.reload();
                        }, 2000);
                    });
            } else  {
                this.toast.warning('Login Failed!', '', { positionClass:'toast-custom' });

            }
        });
        this.login_form.controls.user_name.reset();
        this.login_form.controls.email.reset();

    }

}
