import { Component, OnInit } from '@angular/core';

import { ItemsService } from '../../../services/items.service';
import { ItemModel } from 'src/app/models/item.model';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styles: []
})
export class ListAllComponent implements OnInit {

  items:ItemModel[] = [];

  constructor( private itemsService:ItemsService ) {  }

  ngOnInit(): void {

    this.getItems();

  }

  getItems() {

    this.itemsService.getItems().subscribe(

      res => this.items = res

    )

  }


}
