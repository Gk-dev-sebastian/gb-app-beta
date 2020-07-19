import { Component, OnInit, Input } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styles: []
})
export class TableListComponent implements OnInit {

  @Input('childData') items:ItemModel[];
  @Input() origin:string;

  constructor() {}

  ngOnInit(): void {

    //console.log( this.items );

  }

}
