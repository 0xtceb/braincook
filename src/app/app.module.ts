import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { components, providers, modules } from './index';

@NgModule({
  declarations: [AppComponent, ...components],
  imports: [BrowserModule, BrowserAnimationsModule, ...modules],
  providers: [...providers],
  bootstrap: [AppComponent]
})
export class AppModule {}
