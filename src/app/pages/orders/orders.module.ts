import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

// pages
import { MainOrdersComponent } from './main-orders.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { UpdateOrdersComponent } from './update-orders/update-orders.component';
import { OrderComponent } from './order/order.component';
import { ListPendComponent } from './list-pend/list-pend.component';
import { ListFinishedComponent } from './list-finished/list-finished.component';
import { ListReadyComponent } from './list-ready/list-ready.component';
import { ListMenuComponent } from './share/list-menu/list-menu.component';


// routes
import { RouterOrder } from './router.order';
import { ShareModule } from '../share/share.module';
import { SearchComponent } from './share/search/search.component';
import { TableComponent } from './share/table/table.component';




@NgModule({
  declarations: [
    MainOrdersComponent,
    ListOrdersComponent,
    NewOrdersComponent,
    UpdateOrdersComponent,
    OrderComponent,
    ListPendComponent,
    ListFinishedComponent,
    ListReadyComponent,
    ListMenuComponent,
    SearchComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    ReactiveFormsModule,
    FormsModule,
    RouterOrder,
    ScrollingModule
  ],
  exports: [
    MainOrdersComponent,
    ListOrdersComponent,
    NewOrdersComponent,
    UpdateOrdersComponent,
    OrderComponent
  ],
})
export class OrdersModule { }
