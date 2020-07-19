import { Component, OnInit } from '@angular/core';

import { OrderModel } from '../../../models/order.model';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-list-finished',
  templateUrl: './list-finished.component.html',
  styles: []
})
export class ListFinishedComponent implements OnInit {

  orders: OrderModel[] = [];

  constructor( private ordersService: OrdersService ) { }

  ngOnInit(): void {

    this.ordersService.getOrdersFinished().subscribe(
      res => {

        this.orders = res;

      }
    );

  }

}
