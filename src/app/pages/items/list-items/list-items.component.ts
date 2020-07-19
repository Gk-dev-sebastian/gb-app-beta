import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styles: []
})
export class ListItemsComponent implements OnInit {

  items:ItemModel[] = [];

  constructor( ) {}

  ngOnInit(): void {}

  searchItems( event ){ this.items = event; }



}
