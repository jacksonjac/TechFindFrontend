import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent} from '../admin/admin.component'
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserlistComponent } from './userlist/userlist.component';
import { TechnicianlistComponent } from './technicianlist/technicianlist.component';
import { TechQuestionsComponent } from './tech-questions/tech-questions.component';
import { AdminManageDesiComponent } from './admin-manage-desi/admin-manage-desi.component';
import { authguardGuard } from './guards/guardauth.guard';
import {notokenGuardGuard} from './guards/notoken-guard.guard';

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "", component: AdminLoginComponent},
      { path: "adminhome",component: AdminHomeComponent },
      { path: "Userlist", component: UserlistComponent },
      { path: "Technicianlist", component: TechnicianlistComponent },
      { path:"Questionpage",  component:TechQuestionsComponent},
      {path:"Designationlist",component:AdminManageDesiComponent}

    ]
  }
];
  
  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
