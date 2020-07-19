import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../../../models/order.model';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styles: []
})
export class ListOrdersComponent implements OnInit {

  orders: OrderModel[] = [];

  constructor( private ordersService: OrdersService ) { }

  ngOnInit(): void {}

  searchOrders( event ){
    this.orders = event;
  }

}
