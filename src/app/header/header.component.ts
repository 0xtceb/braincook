import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent, SignupComponent } from '../auth/index';
import { AuthService } from '../index';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;

  constructor(private dialog: MatDialog, private auth: AuthService) {}

  ngOnInit(): void {
    this.loggedIn = this.auth.isLoggedIn;
  }

  signIn(): void {
    this.dialog.open(SigninComponent, { autoFocus: false, width: '30%' });
  }

  signUp(): void {
    this.dialog.open(SignupComponent, { autoFocus: false, width: '30%' });
  }
}
