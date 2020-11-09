import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild(MatSidenav) menu: MatSidenav;
  openedMenu = '';
  @Input() set openNav(open: boolean) {
    if (this.menu) {
      this.menu.toggle(open);
    }
  }
  constructor() {}

  ngOnInit(): void {}

  open(menuName: string): void {
    this.openedMenu = menuName;
  }
}
