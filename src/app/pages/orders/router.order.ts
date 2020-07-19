import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// routes
import { MainOrdersComponent } from './main-orders.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { UpdateOrdersComponent } from './update-orders/update-orders.component';
import { OrderComponent } from './order/order.component';
import { ListPendComponent } from './list-pend/list-pend.component';
import { ListFinishedComponent } from './list-finished/list-finished.component';
import { ListReadyComponent } from './list-ready/list-ready.component';

//guard
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
 {
     path: '',
     component: MainOrdersComponent,
     children:  [
        { path: 'listorder',
          component: ListOrdersComponent,
          children: [
            { path: 'listPend', component: ListPendComponent },
            { path: 'listFin', component: ListFinishedComponent },
            { path: 'listReady', component: ListReadyComponent },
            { path: '', pathMatch: 'full', redirectTo: 'listPend' }
          ]
        },
        { path: 'neworder', component: NewOrdersComponent },
        { path: 'updateorder/:id', component: UpdateOrdersComponent },
        { path: 'order/:id', component: OrderComponent },
        { path: '', pathMatch: 'full', redirectTo: '/listorder' }
     ],
     canActivate: [ AuthGuard ]
 }
];

@NgModule({
  imports: [RouterModule.forChild( routes ) ],
  exports: [RouterModule]
})
export class RouterOrder { }
