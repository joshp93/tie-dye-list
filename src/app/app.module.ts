import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/tasks/sidebar/sidebar.component';
import { HttpClientModule } from "@angular/common/http";
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskViewComponent } from './components/tasks/task-view/task-view.component';
import { TaskListComponent } from './components/tasks/sidebar/task-list/task-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    SidebarComponent,
    TaskViewComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }