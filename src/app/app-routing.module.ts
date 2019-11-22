import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component'
import { ListsComponent } from './lists/lists.component';
import { TodayComponent } from './today/today.component';
import { ScheduledComponent } from './scheduled/scheduled.component';
import { NewlistsComponent } from './newlists/newlists.component';
import { TaskComponent } from './task/task.component';
const routes: Routes = [
  { path: '', redirectTo: '/lists', pathMatch: 'full' },

  { path: 'header', component: HeaderComponent },
  { path: 'newlist', component: NewlistsComponent },
  { path: 'lists', component: ListsComponent },
  { path: 'today', component: TodayComponent },
  { path: 'scheduled', component: ScheduledComponent },
  { path: 'tasklist/:index', component: TaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }