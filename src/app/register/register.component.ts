import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
    usernames: string[] = [];
    emails: string[] = [];
    response: string;

    register_form = this.formBuilder.group({
        username: ['',[ Validators.required, this.userNameExistsValidator()]],
        email: ['', [Validators.email, Validators.required, this.emailExistsValidator()]]
    });

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private account_service: AccountService,
    ) {
        this.response = '';
    }

    ngOnInit(): void {
        this.getAllUsers();
    }

    onSubmit() {
        let response = this.account_service.addUser(this.register_form);
        response.subscribe(data=> this.response = data.body);

        this.register_form.controls.username.reset();
        this.register_form.controls.email.reset();
    }

    getAllUsers() {
        let users = this.account_service.getAllUsers();
        users.subscribe(data => {
            for (let user of data.body) {
                this.usernames.push(user.user_name);
                this.emails.push(user.email);
            }
        });
    }

    userNameExistsValidator(): ValidatorFn {
        return (control:AbstractControl) : ValidationErrors | null => {
            const username = control.value;

            if (this.usernames.includes(username)) {
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
