import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';
import { OrdersService } from '../../../services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';

import Swal from 'sweetalert2';
import { ItemModel } from 'src/app/models/item.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit, OnDestroy {


  public listOrigin:string = null;
  public idItem:string = null;
  public id:string = null;

  public order:OrderModel;
  public item:ItemModel;

  user:string = null;


  constructor( private orderService:OrdersService,
               private itemService:ItemsService,
               private activatedRoute:ActivatedRoute,
               private router:Router ) {

    this.id = this.activatedRoute.snapshot.paramMap.get( 'id' );
    this.user = localStorage.getItem('user');

  }

  ngOnInit(): void {

    this.getOrders();


  }

  ngOnDestroy() {
    this.order == null;
    //console.log('order null');
  }

  getOrders() {
    this.orderService.getById( this.id ).subscribe( order => {

      this.order = order;

      if( this.order.status === 'ordered' ){
        this.listOrigin = '/listorder/listPend';
      }
      if( this.order.status === 'ready' ){
        this.listOrigin = '/listorder/listReady';
      }
      if( this.order.status === 'delivered' ){
        this.listOrigin = '/listorder/listFin';
      }

      this.itemService.getById( this.order.item.id ).subscribe( item => {
        this.item = item;

        if( this.item.qty.qty >= this.order.orderQty && this.order.status === 'ordered' ){
          this.orderService.changeStatus( 'ready', this.user, order.id );

        }
        if( this.item.qty.qty < this.order.orderQty && this.order.status === 'ready' ){
          this.orderService.changeStatus( 'ordered', this.user, order.id );
        }

      });
    });
  }

  delivery( id:string ) {

    this.orderService.delivered( this.user, id );
    this.updateItemQty();
    //this.router.navigateByUrl('/listorder/listFin');

  }

  updateItemQty() {

    const data = {
      qty: this.item.qty.qty - this.order.orderQty,
      qtyNewShipment: this.item.qty.qtyNewShipment - this.order.orderQty,
      lastChange: this.user,
      lastChangeData: new Date().toLocaleDateString('en-us')
    }

    this.itemService.changeQty( data, this.order.item.id );

  }

  disable(){

    Swal.fire({
      title: 'Are you sure?',
      text: "This order will be disable!",
      imageUrl: "../../../../../assets/img/icons/warning.png",
      //instead of imageSize use imageWidth and imageHeight
      imageWidth: 100,
      imageHeight: 100,
      showCancelButton: true,
      confirmButtonText: 'Yes, disable it!',
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

        this.orderService.disable( this.user, this.id );

        Swal.fire({
          title:'Disabled!',
          text: 'Order: ' + this.order.id + ' has been disabled.',
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
        });

        if( this.order.status != 'delivered'){

          const data = {
            qty: this.item.qty.qty,
            qtyNewShipment: this.item.qty.qtyNewShipment - this.order.orderQty,
            lastChange: this.user,
            lastChangeData: new Date().toLocaleDateString('en-us')
          }

          this.itemService.changeQty( data, this.order.item.id );

        }

        if( this.order.status == 'ready' ) { this.router.navigateByUrl('/listorder/listReady'); }
        if( this.order.status == 'ordered' ) { this.router.navigateByUrl('/listorder/listPend'); }
        if( this.order.status == 'delivered' ) { this.router.navigateByUrl('/listorder/listFin'); }

      }// if codition

    });
  }


}
