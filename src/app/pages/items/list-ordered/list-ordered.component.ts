import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ItemModel } from '../../../models/item.model';

@Component({
  selector: 'app-list-ordered',
  templateUrl: './list-ordered.component.html',
  styles: []
})
export class ListOrderedComponent implements OnInit {

  items:ItemModel[] = [];
  origin:string = null;

  constructor( private itemsService:ItemsService ) {

    this.origin = 'ordered';

   }

  ngOnInit(): void {

    this.getData();

  }

  getData(){

    this.itemsService.getByOrdered().subscribe(
      items => this.items = items
    )
  }

}
