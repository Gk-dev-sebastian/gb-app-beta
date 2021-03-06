import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../../services/items.service';
import { ItemModel } from '../../../models/item.model';

@Component({
  selector: 'app-list-apparel',
  templateUrl: './list-apparel.component.html',
  styles: []
})
export class ListApparelComponent implements OnInit {

  items:ItemModel[] = [];
  allitems:ItemModel[] = [];
  term:any[] = [
    't-shirt',
    'short',
    'pullover',
    'jacket',
    'pants',
    'tanks',
    'shorts',
    'pullovers',
    'jackets',
    'hat',
    'hats'
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
