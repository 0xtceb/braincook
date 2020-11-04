import { Component, OnInit } from '@angular/core';
import { AuthService, SigninComponent } from './index';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'braincook';
  constructor(private auth: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {}
}
