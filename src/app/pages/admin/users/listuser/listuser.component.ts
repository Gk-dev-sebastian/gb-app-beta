import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styles: []
})
export class ListuserComponent implements OnInit {

  constructor( private usersService:UsersService ) { }

  users:UserModel[] = [];

  ngOnInit(): void {

    this.usersService.getUsers().subscribe(
      (res:any) => {
        this.users = res;
        //console.log( this.users );
      }
    )

  }




}
