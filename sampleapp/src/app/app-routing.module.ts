import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Train1Component } from './train1/train1.component'; 
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';
import { TaskComponent } from './task/task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [
  {path:'t1',component:Train1Component},
  {path:'t2',component:LoginComponent},
  {path:'t3',component:ViewComponent},
  {path:'t4',component:TaskComponent},
  {path:'t5',component:ViewTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
