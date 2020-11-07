import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/index';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] })
  });

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<SigninComponent>) {}

  ngOnInit(): void {}

  signIn(): void {
    if (this.signInForm.valid) {
      this.authService
        .signIn(this.signInForm.get('email').value, this.signInForm.get('password').value)
        .subscribe(() => {
          this.dialogRef.close();
        });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
