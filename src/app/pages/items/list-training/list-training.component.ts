import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../../../services/items.service';
import { ItemModel } from 'src/app/models/item.model';

@Component({
  selector: 'app-list-training',
  templateUrl: './list-training.component.html',
  styles: []
})
export class ListTrainingComponent implements OnInit {

  items:ItemModel[] = [];
  allitems:ItemModel[] = [];

  term:any[] = [ 'short', 'rashguard', 'pant', 'shorts', 'rashguards', 'pants' ];

  constructor( private itemsService:ItemsService ) { }

  ngOnInit(): void {

     this.term.forEach( term => {

      this.itemsService.getByProducts( term ).subscribe( res => {

        let i;
        for( i in res ) { this.allitems.push( res[i] ); }
        this.filter( this.allitems );//

      })

     })

  }

  filter( data:any ) {

      let i;
      let getProducts = [];
      for( i in data ) { getProducts.push( data[i] ); }
      if( getProducts.length > 0 ){ this.items = getProducts; }

  }

}
