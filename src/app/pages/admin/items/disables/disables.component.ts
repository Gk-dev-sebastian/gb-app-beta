import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-disables',
  templateUrl: './disables.component.html',
  styles: []
})
export class DisablesComponent implements OnInit {

  items:ItemModel[]=[];

  constructor( private itemsService: ItemsService) { }

  ngOnInit(): void {

     this.itemsService.getDesablesItems().subscribe(
       items => this.items = items
     )

  }

  reactive( id:string ){

    this.itemsService.reActive( id );
    Swal.fire({
      position: 'top-end',
      imageUrl: "../../../../../assets/img/icons/done.png",
      //instead of imageSize use imageWidth and imageHeight
      imageWidth: 100,
      imageHeight: 100,
      title: 'Item Reactive',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        container: 'swal-update-container-class',
        popup: 'swal-update-popup-class',
        title: 'swal-update-title-class'
      }
    });

    return;
  }

  delete( id:string ) {

    Swal.fire({
      title: 'Are you sure?',
      text: "This Item will be deleted!",
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

          this.itemsService.delete( id ).then( result => {

                Swal.fire(
                  {
                    title:'Deleted!',
                    text: 'This item has been deleted.',
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

          });

        }

    });

  }

}
