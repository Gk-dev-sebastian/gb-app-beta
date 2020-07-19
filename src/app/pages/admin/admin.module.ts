import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// extra modules
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

// pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { UsersComponent } from './users/users.component';
import { ItemsComponent } from './items/items.component';
import { OrdersComponent } from './orders/orders.component';

//route
import { RouterAdmin } from './router.admin';
import { ShareModule } from '../share/share.module';

// users
import { NewuserComponent } from './users/newuser/newuser.component';
import { ListuserComponent } from './users/listuser/listuser.component';
import { UpdateuserComponent } from './users/updateuser/updateuser.component';
// items
import { DisablesComponent } from './items/disables/disables.component';
import { OrderedComponent } from './items/ordered/ordered.component';
import { InfoComponent } from './items/info/info.component';
// students
import { StudensInfoComponent } from './students/studens-info/studens-info.component';
import { StudensDisableComponent } from './students/studens-disable/studens-disable.component';
import { OrdersDisableComponent } from './orders/orders-disable/orders-disable.component';
import { OrdersInfoComponent } from './orders/orders-info/orders-info.component';



@NgModule({
  declarations:
  [
    DashboardComponent,
    StudentsComponent,
    UsersComponent,
    ItemsComponent,
    OrdersComponent,
    NewuserComponent,
    ListuserComponent,
    UpdateuserComponent,
    DisablesComponent,
    OrderedComponent,
    InfoComponent,
    StudensInfoComponent,
    StudensDisableComponent,
    OrdersDisableComponent,
    OrdersInfoComponent
  ],
  imports:
  [
    CommonModule,
    ShareModule,
    RouterAdmin,
    ReactiveFormsModule,
    FormsModule,
    ScrollingModule
  ],
  exports:
  [
    DashboardComponent,
    StudentsComponent,
    UsersComponent,
    ItemsComponent,
    OrdersComponent,
    NewuserComponent,
    ListuserComponent,
    UpdateuserComponent,
    DisablesComponent,
    OrderedComponent,
    InfoComponent,
    StudensInfoComponent,
    StudensDisableComponent
  ]
})
export class AdminModule { }
