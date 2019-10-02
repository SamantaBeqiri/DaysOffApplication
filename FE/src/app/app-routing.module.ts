import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserApplicationsComponent } from './user-applications/user-applications.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: "full" },
{ path: "login", component: LoginComponent }
  , {
    path: 'nav', component: NavComponent,
    children:[
      { path: '', redirectTo: "/nav/application", pathMatch: "full",canActivate: [AuthGaurdService] },
      { path: 'application', component: UserApplicationsComponent ,canActivate: [AuthGaurdService]},
     { path: 'user', component: UsersComponent ,canActivate: [AuthGaurdService]}
    ],
    canActivate: [AuthGaurdService]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
