import { Component, OnInit } from '@angular/core';
import { AuthService } from './index';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'braincook';
  constructor(public auth: AuthService, private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use(this.translate.getBrowserLang());
  }

  ngOnInit(): void {}
}
