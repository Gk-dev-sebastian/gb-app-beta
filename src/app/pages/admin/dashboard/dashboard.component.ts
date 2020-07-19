import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  listMenu:any = [];

  constructor() {

    this.listMenu = [
      { link: '/main', name: 'Main'},
      { link: '/users', name: 'Users'},
      { link: '/orders', name: 'Orders'},
      { link: '/items', name: 'items'},
      { link: '/students', name: 'Students'}
     ];

  }

  ngOnInit(): void {
  }

}
