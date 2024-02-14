import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css', './register.component.css']
})

export class RegisterComponent implements OnInit {
    user_names: string[] = [];
    emails: string[] = [];

    register_form = this.formBuilder.group({
        user_name: ['',[ Validators.required, this.user_nameExistsValidator()]],
        email: ['', [Validators.email, Validators.required, this.emailExistsValidator()]]
    });

    constructor(
        private formBuilder: FormBuilder,
        private account_service: AccountService,
        private toast: ToastrService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.getAllUsers();
    }

    submitRegistration() {
        let response = this.account_service.addUser(this.register_form);
        response.subscribe(data=> {
            if (data.body == 'Registration Successful') {
                this.toast.success(data.body, '', { positionClass:'toast-custom' })
                this.router.navigate(['/login'])
            } else {
                this.toast.error(data.body, '', { positionClass:'toast-custom' })
            }
        });

        this.register_form.controls.user_name.reset();
        this.register_form.controls.email.reset();
    }

    getAllUsers() {
        let users = this.account_service.getAllUsers();
        users.subscribe(data => {
            for (let user of data.body) {
                this.user_names.push(user.user_name);
                this.emails.push(user.email);
            }
        });
    }

    user_nameExistsValidator(): ValidatorFn {
        return (control:AbstractControl) : ValidationErrors | null => {
            const user_name = control.value;

            if (this.user_names.includes(user_name)) {
                return {unique: true};
            } else {
                return null;
            }
        }
    }

    emailExistsValidator(): ValidatorFn {
        return (control:AbstractControl) : ValidationErrors | null => {
            const email = control.value;

            if (this.emails.includes(email)) {
                return {unique: true};
            } else {
                return null;
            }
        }
    }

}
