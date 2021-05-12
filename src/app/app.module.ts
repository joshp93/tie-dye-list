import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/lists/sidebar/sidebar.component';
import { HttpClientModule } from "@angular/common/http";
import { ListsComponent } from './components/lists/lists.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
