import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SigninComponent, SignupComponent } from '../auth/index';
import { AuthService } from '../services/auth-service/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  openMenu: boolean;
  constructor(private dialog: MatDialog, public auth: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  signIn(): void {
    const dialogRef: MatDialogRef<SigninComponent> = this.dialog.open(SigninComponent, {
      autoFocus: false,
      width: '30%',
      panelClass: 'dialog-responsive'
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      switch (result) {
        case 'auth/wrong-password':
          this.snackBar.open('Wrong credentials', null, {
            duration: 5000
          });
          break;
        case 'loggedIn':
          this.snackBar.open('Successfully logged in !', null, {
            duration: 5000
          });
          break;
      }
    });
  }

  signUp(): void {
    const dialogRef: MatDialogRef<SignupComponent> = this.dialog.open(SignupComponent, {
      autoFocus: false,
      width: '30%',
      panelClass: 'dialog-responsive'
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      switch (result) {
        case 'mailSent':
          this.snackBar.open('A verification mail has been sent to your address, check it out !', null, {
            duration: 5000
          });
          break;
        case 'auth/email-already-in-use':
          this.snackBar.open('The email address you provided is already in use !', null, {
            duration: 5000
          });
          break;
      }
    });
  }

  logout(): void {
    this.auth.signOut().subscribe();
  }

  toggleNav(): void {
    this.openMenu = !this.openMenu;
  }
}
