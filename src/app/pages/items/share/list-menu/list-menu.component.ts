import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html'
})
export class ListMenuComponent implements OnInit {

  listMenu:any = [];

  constructor() {

   this.listMenu = [
     { link: './allItems', name: 'All'},
     { link: './giItems', name: 'Gi'},
     { link: './trainingItems', name: 'Training'},
     { link: './apparelItems', name: 'Apparel'},
     { link: './beltsItems', name: 'Belt'},
     { link: './accessoriesItems', name: 'Accessories'},
     { link: './ordered', name: 'Ordered'}
    ];

   }

  ngOnInit(): void {
  }

}
