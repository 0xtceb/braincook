import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../index';
export function MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
      return { mustMatch: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loading = false;

  signUpForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(/\d/),
          Validators.pattern(/[A-Z]/),
          Validators.pattern(/[a-z]/),
          Validators.pattern(/[!@#$%^&*)(+=._-]/),
          Validators.minLength(8)
        ]
      }),
      confirmPassword: new FormControl({ value: '', disabled: true }, { validators: [Validators.required] })
    },
    { validators: [MustMatch('password', 'confirmPassword')] }
  );

  constructor(private dialogRef: MatDialogRef<SignupComponent>, private auth: AuthService) {}

  ngOnInit(): void {
    this.signUpForm.get('password').valueChanges.subscribe((_) => {
      if (this.signUpForm.get('password').valid) {
        this.signUpForm.get('confirmPassword').enable();
      } else {
        this.signUpForm.get('confirmPassword').disable();
        this.signUpForm.get('confirmPassword').reset();
      }
    });
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      this.dialogRef.disableClose = true;
      this.loading = true;
      this.signUpForm.disable();
      this.auth.signUp(this.signUpForm.get('email').value, this.signUpForm.get('password').value).subscribe((_) => {
        this.dialogRef.close();
      });
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

  clearMail(): void {
    this.signUpForm.get('email').reset();
    this.signUpForm.updateValueAndValidity();
  }
}
