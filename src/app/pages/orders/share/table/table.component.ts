import { Component, OnInit, Input } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: []
})
export class TableComponent implements OnInit {

  @Input() orders:OrderModel[];

  constructor( public oredersService:OrdersService ) { }

  ngOnInit(): void {
  }

}
