import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../../services/items.service';
import { ItemModel } from 'src/app/models/item.model';


@Component({
  selector: 'app-list-accessories',
  templateUrl: './list-accessories.component.html',
  styles: []
})
export class ListAccessoriesComponent implements OnInit {

  items:ItemModel[] = [];
  allitems:ItemModel[] = [];
  term:any[] = [
    'bag',
    'hat',
    'tape',
    'sticker',
    'keychains',
    'mouthguard',
    'bagpack',
    'hats',
    'tapes',
    'stickers',
    'keychains',
    'mouthguards'
  ];

  constructor( private itemsService:ItemsService ) { }

  ngOnInit(): void {

    this.getData();

  }

  getData() {

    this.term.forEach( term => {

      this.itemsService.getByProducts( term ).subscribe( res => {

        let i;
        for( i in res ) { this.allitems.push( res[i] ); }
        this.filter( this.allitems );//

      })

     });
  }

  filter( data:any ) {

    let i;
    let getProducts = [];
    for( i in data ) { getProducts.push( data[i] ); }
    if( getProducts.length > 0 ){ this.items = getProducts; }

  }

}
