import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemModel } from 'src/app/models/item.model';
import { ItemsService } from '../../../services/items.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styles: []
})
export class UpdateItemsComponent implements OnInit {

  item:ItemModel;

  selectionFile: any = null;
  imgTemp: any;

  id:string = this.activeRoute.snapshot.paramMap.get( 'id' );
  origin:string = this.activeRoute.snapshot.paramMap.get( 'origin' );

  itemForm = new FormGroup({

    id: new FormControl(''),
    product: new FormControl ('', Validators.required ),
    brand: new FormControl ('', Validators.required ),
    model: new FormControl ('', Validators.required ),
    color: new FormControl ('', Validators.required ),
    size: new FormControl ('', Validators.required ),
    listPrice: new FormControl ('', Validators.required ),
    discount: new FormControl (''),
    desc: new FormControl ('')

  });

  user:string = null;

  constructor( private itemService:ItemsService,
               private activeRoute:ActivatedRoute,
               private router:Router ) {
    this.user = localStorage.getItem( 'user');
  }

  ngOnInit(): void {



    this.itemService.getById( this.id ).subscribe(

      res => {

        this.itemForm = new FormGroup({

          id: new FormControl(res.id),
          product: new FormControl (res.product, Validators.required ),
          brand: new FormControl (res.brand, Validators.required ),
          model: new FormControl (res.model, Validators.required ),
          color: new FormControl (res.color, Validators.required ),
          size: new FormControl (res.size, Validators.required ),
          listPrice: new FormControl (res.price.listPrice, Validators.required ),
          discount: new FormControl (res.price.discount),
          desc: new FormControl (res.description)

        });

        this.item = res;
        //console.log( res );

      }
    );
  }

  updateItem( form ) {

    if ( this.selectionFile != null ) {

      const data = form;
      const newData = {
        ...data,
        qty: this.item.qty.qty,
        qtyNewShipment: this.item.qty.qtyNewShipment,
        lastChange: this.user,
        lastChangeData: new Date().toLocaleDateString('en-us')
      }
      this.itemService.updateItem( newData, this.selectionFile );

    } else {

      const image = null;
      const data = form;
      const newData = {
        ...data,
        qty: this.item.qty.qty,
        qtyNewShipment: this.item.qty.qtyNewShipment,
        lastChange: this.user,
        lastChangeData: new Date().toLocaleDateString('en-us'),
        photo: {
          name: this.item.photo.name,
          url: this.item.photo.url
        }
      }

      this.itemService.updateItem( newData, image );

    }

    this.router.navigateByUrl(`/item/${this.item.id}/allItems`);


  }

  handlerImage( file: any ) {

    this.selectionFile = file;

    if ( file != null ) {

       // temp image
        const reader = new FileReader();
        const urlImageTemp = reader.readAsDataURL( file );
        reader.onloadend = () => this.imgTemp = reader.result;

    }
  }

}
