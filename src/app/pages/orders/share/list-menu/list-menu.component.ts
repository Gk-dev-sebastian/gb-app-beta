import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styles: []
})
export class ListMenuComponent implements OnInit {

  listMenu:any = [];

  constructor() {

    this.listMenu = [
      { link: './listPend', name: 'Pending'},
      { link: './listReady', name: 'Ready'},
      { link: './listFin', name: 'Delivered'},
     ];

  }

  ngOnInit(): void {
  }

}
