
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  private userUId: string = null;
  private admin:any = null;

  constructor( private usersService:UsersService,
               private router:Router ) {


  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any | UrlTree> | Promise<any | UrlTree> | any | UrlTree {

       this.userUId = localStorage.getItem( 'uid' );

       if( this.userUId === 'f77rBJL91rTvK1Bv97x3mh3HDuv2') {

        return true;

       } else {

        this.router.navigateByUrl('/listorder');
        return false;

       }



  }

}

