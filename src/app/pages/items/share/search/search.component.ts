import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//model
import { ItemModel } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  @Output() searchItems:EventEmitter<any> = new EventEmitter();

  items:ItemModel[]=[];
  orderBy:any[] = [ 'product', 'brand', 'model', 'size' ];

  constructor( public itemService:ItemsService ) { }

  ngOnInit(): void {}

  search( term ) {

    if ( term.length > 0 ) {

      this.orderBy.forEach( property => {
        this.itemService.searchItem( property, term ).subscribe( res => {
            if ( res.length > 0 ){ this.items = res; }
        });
      });

     } else {

         this.items = [];

     }

     this.searchItems.emit( this.items );

  }

}
