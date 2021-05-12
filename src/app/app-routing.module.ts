import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './components/lists/lists.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "lists" },
  { path: "lists", component: ListsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
