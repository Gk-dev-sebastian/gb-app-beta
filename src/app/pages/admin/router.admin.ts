import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// routes
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { ItemsComponent } from './items/items.component';
import { StudentsComponent } from './students/students.component';

// user
import { ListuserComponent } from './users/listuser/listuser.component';
import { NewuserComponent } from './users/newuser/newuser.component';
import { UpdateuserComponent } from './users/updateuser/updateuser.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AuthGuard } from 'src/app/guards/auth.guard';

// items
import { DisablesComponent } from './items/disables/disables.component';
import { OrderedComponent } from './items/ordered/ordered.component';
import { InfoComponent } from './items/info/info.component';
import { StudensDisableComponent } from './students/studens-disable/studens-disable.component';
import { StudensInfoComponent } from './students/studens-info/studens-info.component';
import { OrdersDisableComponent } from './orders/orders-disable/orders-disable.component';
import { OrdersInfoComponent } from './orders/orders-info/orders-info.component';

//students




const routes: Routes = [
 {
     path: '',
     component: DashboardComponent,
     children:  [
        { path: 'main', component: MainComponent },
        {
          path: 'users',
          component: UsersComponent,
          children: [
            { path: 'listUsers', component:ListuserComponent },
            { path: 'newUser', component:NewuserComponent },
            { path: 'updateUser/:id', component:UpdateuserComponent },
            { path: '', pathMatch: 'full', redirectTo: 'listUsers'}
          ]
         },
        {
          path: 'orders',
          component: OrdersComponent,
          children: [
            { path: 'ordersDisables', component: OrdersDisableComponent },
            { path: 'ordersInfo', component: OrdersInfoComponent },
            { path: '', pathMatch: 'full', redirectTo: 'ordersDisables'}
          ]
        },
        {
          path: 'items',
          component: ItemsComponent,
          children: [
            { path: 'disables', component: DisablesComponent },
            { path: 'ordered', component: OrderedComponent },
            { path: 'info', component: InfoComponent },
            { path: '', pathMatch: 'full', redirectTo: 'disables'}
          ]
        },
        {
          path: 'students',
          component: StudentsComponent,
          children: [
            { path: 'studentsDisables', component: StudensDisableComponent },
            { path: 'studentsInfo', component: StudensInfoComponent },
            { path: '', pathMatch: 'full', redirectTo: 'studentsDisables'}
          ]
        },
        { path: '', pathMatch: 'full', redirectTo: '/main' }
     ],
     canActivate: [ AuthGuard, AdminGuard ]

 }
];

@NgModule({
  imports: [RouterModule.forChild( routes ) ],
  exports: [RouterModule]
})
export class RouterAdmin { }
