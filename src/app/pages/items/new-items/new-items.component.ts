import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/services/items.service';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-items',
  templateUrl: './new-items.component.html',
  styles: []
})
export class NewItemsComponent implements OnInit {

  selectionFile: any = null;
  imgTemp: any;
  origin:string = this.activeRoute.snapshot.paramMap.get( 'origin' );

  itemForm = new FormGroup({

    product: new FormControl ('', Validators.required ),
    brand: new FormControl ('', Validators.required ),
    model: new FormControl ('', Validators.required ),
    color: new FormControl ('', Validators.required ),
    size: new FormControl ('', Validators.required ),
    qty: new FormControl ('', Validators.required ),
    listPrice: new FormControl ('', Validators.required ),
    discount: new FormControl (''),
    desc: new FormControl ('')//

  });

  user:string = null;

  constructor( private itemsService: ItemsService,
               public router:Router,
               public activeRoute:ActivatedRoute ) {
    this.user = localStorage.getItem( 'user');
  }

  ngOnInit(): void {
  }

  createNew( data ) {

    if( data.status !== 'VALID' ){

      Swal.fire({
        position: 'top-end',
        imageUrl: "../../../../../assets/img/icons/warning.png",
        //instead of imageSize use imageWidth and imageHeight
        imageWidth: 100,
        imageHeight: 100,
        title: 'You must complete all fields',
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

    const newData = {

      ...data.value,
      qtyNewShipment: 0,
      lastChange: this.user,
      lastChangeData:  new Date().toLocaleDateString('en-us')

    };

   this.itemsService.createnew( newData, this.selectionFile );

   if( this.origin === '../../neworder'){
     this.origin = '/neworder';
   }

   this.router.navigateByUrl( this.origin );

  }

  handlerImage( file: any ) {

    this.selectionFile = file;

    if ( file != null ) {

       // temp image
        const reader = new FileReader();
        const urlImageTemp = reader.readAsDataURL( file );
        reader.onloadend = () => this.imgTemp = reader.result;

    }
  }//

}
