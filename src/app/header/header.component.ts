import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SigninComponent, SignupComponent } from '../auth/index';
import { AuthService } from '../index';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;

  constructor(private dialog: MatDialog, public auth: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  signIn(): void {
    this.dialog.open(SigninComponent, { autoFocus: false, width: '30%' });
  }

  signUp(): void {
    const dialogRef: MatDialogRef<SignupComponent> = this.dialog.open(SignupComponent, {
      autoFocus: false,
      width: '30%',
      panelClass: 'dialog-responsive'
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'mailSent') {
        this.snackBar.open('A verification mail has been sent to your address, check it out !', null, {
          duration: 5000
        });
      }
    });
  }

  logout(): void {
    this.auth.signOut().subscribe();
  }
}
