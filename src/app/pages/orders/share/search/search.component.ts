import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderModel } from 'src/app/models/order.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  @Output() searchOrders:EventEmitter<any> = new EventEmitter;

  orders:OrderModel[] = [];
  orderBy:any[] = [ 'person.name', 'person.lastname', 'item.product'];

  constructor(public oredersService:OrdersService ) { }

  ngOnInit(): void { }

  search( term ) {

    //console.log( term );

   if ( term.length > 0 ) {

      this.orderBy.forEach( properties => {
        this.oredersService.searchOrders( properties, term ).subscribe( res => {
          if ( res.length > 0 ){ this.orders = res; }
        })
      });

    } else {
      this.orders = []
    }

    this.searchOrders.emit( this.orders );


  }

}
