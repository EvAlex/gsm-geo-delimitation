import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationShellModule } from '@gsm-geo-delimitation/navigation/shell';
import { AppRoutingModule } from './app-routing.module';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NavigationShellModule,
    AppRoutingModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
