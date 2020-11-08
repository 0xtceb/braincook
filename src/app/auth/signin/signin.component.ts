import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/index';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loading = false;

  signInForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] })
  });

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<SigninComponent>) {}

  ngOnInit(): void {}

  signIn(): void {
    if (this.signInForm.valid) {
      this.loading = true;
      this.dialogRef.disableClose = true;
      this.signInForm.disable();
      this.authService
        .signIn(this.signInForm.get('email').value, this.signInForm.get('password').value)
        .pipe(
          catchError((err) => {
            this.dialogRef.close(err.code);
            return throwError(err);
          })
        )
        .subscribe(() => {
          this.dialogRef.close('loggedIn');
        });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
