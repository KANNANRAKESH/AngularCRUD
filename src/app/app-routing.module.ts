import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { FormApiComponent } from './form-api/form-api.component';
import { TableApiComponent } from './table-api/table-api.component';

const routes: Routes = [
  {path:"User", component:UsersComponent},
  {path:"Form", component:FormApiComponent},
  { path:"Table", component:TableApiComponent},
 { path:"Form/:id", component:FormApiComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
