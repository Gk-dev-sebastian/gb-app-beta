import { Component, OnInit } from '@angular/core';
import { ItemModel } from '../../../models/item.model';
import { ItemsService } from '../../../services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styles: []
})
export class ItemComponent implements OnInit {

  item:ItemModel;
  id:string = this.activeRoute.snapshot.paramMap.get( 'id' );
  origin:string = this.activeRoute.snapshot.paramMap.get( 'origin' );
  discount:number;

  user:string = null;

  constructor( private itemSrevice:ItemsService,
               private activeRoute:ActivatedRoute,
               private router:Router ) {
    this.user = localStorage.getItem( 'user');
  }

  ngOnInit(): void {

    this.itemSrevice.getById( this.id ).subscribe( res => {

        this.item = res;
        if( res != null ){

          if( this.item.price.discount != null ) {
            this.discount = ( this.item.price.discount * 100 ) / this.item.price.listPrice;
          }

        }

    });

  }

  qtyIncrement() {

    let newQty:number;
    newQty =  this.item.qty.qty + 1;

    const data = {

      qty: newQty,
      qtyNewShipment: this.item.qty.qtyNewShipment,
      lastChange: this.user,
      lastChangeData: new Date().toLocaleDateString('en-us')

    };

    this.itemSrevice.changeQty( data, this.id );

  }

  qtyDecrement() {

    let newQty:number;

    if( this.item.qty.qty <= 0 ) {
      newQty =  0;
    } else {
      newQty =  this.item.qty.qty - 1;
    }

    const data = {

      qty: newQty,
      qtyNewShipment: this.item.qty.qtyNewShipment,
      lastChange: this.user,
      lastChangeData: new Date().toLocaleDateString('en-us')

    };

    this.itemSrevice.changeQty( data, this.id );

  }

  disable( ) {

    Swal.fire({
      title: 'Are you sure?',
      text: "This Item will be disable!",
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

          this.itemSrevice.disable( this.id ).then( result => {

            Swal.fire({
                    title:'Disabled!',
                    text: 'Item: ' + this.item.product + ' has been disabled.',
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

            const data = {
                  qty: 0,
                  qtyNewShipment: 0,
                  lastChange: this.user,
                  lastChangeData: new Date().toLocaleDateString('en-us')
            };

            this.itemSrevice.changeQty( data, this.id );

          });

          this.router.navigateByUrl('/listitem');

        } // if codition

    });
  }

}
