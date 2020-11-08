import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild(MatSidenav) menu: MatSidenav;

  private navOpened: boolean;

  @Input() set openNav(open: boolean) {
    if (this.menu) {
      this.navOpened = open;
      this.menu.toggle(open);
    }
  }
  constructor() {}

  ngOnInit(): void {}
}
