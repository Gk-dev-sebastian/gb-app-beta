import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  user:UserModel;
  id:string = '';
  masterAdmin:any = null;
  listMenu:any = [];

  constructor( private authService:AuthService,
               private userService:UsersService,
               private router:Router ) { }

  ngOnInit(): void {

    this.getCurrentUser();

    this.listMenu = [
      { link: '/listorder', name: 'ORDERS'},
      { link: '/listitem', name: 'ITEMS'},
      { link: '/listStudent', name: 'STUDENT'}
     ];

  }

  logOut() {

     this.authService.logOut();
     localStorage.clear();
     this.router.navigateByUrl('/login');
     return false;

  }

  getCurrentUser() {

    this.authService.isAuth().subscribe( res => {
      if ( res != null ){
         this.userService.emailValidate( res.email ).subscribe( (res:any) => {

            this.user = res[0];
            if( this.user.role === 'A'){
              this.masterAdmin = true;
              this.listMenu = [
               { link: '/listorder', name: 'ORDERS'},
               { link: '/listitem', name: 'ITEMS'},
               { link: '/listStudent', name: 'STUDENT'},
               { link: '/main', name: 'ADMIN'}
              ];
            }

         })
      }
    });
  }

}
