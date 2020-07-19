import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';

import Swal from 'sweetalert2';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-orders-disable',
  templateUrl: './orders-disable.component.html',
  styles: []
})
export class OrdersDisableComponent implements OnInit {

  orders:OrderModel [] = [];

  constructor( private ordersSevice:OrdersService ) { }

  ngOnInit(): void {

    this.ordersSevice.getDesablesOrders().subscribe(
      orders => this.orders = orders
    )
  }


  delete( id:string ){

    Swal.fire({
      title: 'Are you sure?',
      text: "This Order will be deleted!",
      imageUrl: "../../../../../assets/img/icons/warning.png",
      //instead of imageSize use imageWidth and imageHeight
      imageWidth: 100,
      imageHeight: 100,
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      customClass: {
        container: 'container-class',
        popup: 'popup-class',
        title: 'title-class',
        content: 'content-class',
        confirmButton: 'confirm-button-class',
        cancelButton: 'cancel-button-class',
      }
    }).then( (result) => {

        if( result.value ) {

          this.ordersSevice.delete( id ).then( result => {

                Swal.fire(
                  {
                    title:'Deleted!',
                    text: 'This Order has been deleted.',
                    imageUrl: "../../../../../assets/img/icons/done.png",
                    //instead of imageSize use imageWidth and imageHeight
                    imageWidth: 100,
                    imageHeight: 100,
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                      container: 'container-class',
                      popup: 'popup-class',
                      title: 'title-class',
                      content: 'content-class',
                      closeButton: 'close-button-class',
                    }
                  }
                );

          return;

          });

        }

    });
  }

}
