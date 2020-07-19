import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderModel } from '../../../models/order.model';
import { OrdersService } from '../../../services/orders.service';
import { ItemsService } from '../../../services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ready',
  templateUrl: './list-ready.component.html',
  styles: []
})
export class ListReadyComponent implements OnInit, OnDestroy {

  public orders: OrderModel[] = [];
  private filterOrders: OrderModel[] = [];
  user:string = null;


  constructor(  private ordersService: OrdersService,
                private itemsService: ItemsService,
                private router:Router ) {

      this.user = localStorage.getItem('uid');

  }

  ngOnInit(): void {
    this.getOrders();
  }

  ngOnDestroy() {
    this.getOrders().unsubscribe();
  }

  getOrders() {

    return this.ordersService.getOrders().subscribe( (res:any) => {

      res.forEach( order =>{

          if( order.status != 'delivered') {

          this.itemsService.getStatus( order.item.id ).subscribe( itemStatus =>  {

            if( itemStatus == true ){

              this.itemsService.getQty( order.item.id ).subscribe( itemQty => {

                if( order.orderQty  <= itemQty && order.status != 'delivered'){

                  /*if( order.status == 'ordered' && order.status != 'delivered'){
                    this.ordersService.changeStatus( 'ready', this.user, order.id );
                  }*/

                  this.filterOrders.push( order );
                  this.filter( this.filterOrders );

                }

              });

            } else {
              this.ordersService.disable( this.user, order.id );
            }

          });

          } else {
            return false;
          }

      });

    });

  }


  filter( orders:any ) {

    let i;
    let getOrders = [];
    for( i in orders ) {
      getOrders.push( orders[i] );
    }
    if( getOrders.length > 0 ){
      this.orders = getOrders;
    }

  }

}
