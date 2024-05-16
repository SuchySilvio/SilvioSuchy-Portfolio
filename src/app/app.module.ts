import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import Swiper from 'swiper';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Swiper
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
