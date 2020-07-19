import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// models
import { StudentModel } from 'src/app/models/student.model';
import { ItemModel } from 'src/app/models/item.model';
import { OrderModel } from '../../../models/order.model';

// services
import { StudentsService } from '../../../services/students.service';
import { ItemsService } from '../../../services/items.service';
import { OrdersService } from '../../../services/orders.service';

// swal
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styles: []
})
export class NewOrdersComponent implements OnInit {

  students: StudentModel[] = [];
  totalStudents: number;

  items: ItemModel[] = [];
  totalItems:number;
  orderBy:any[] = [ 'product', 'brand', 'model', 'size' ];

  itemSelected:ItemModel;
  studentSelected:StudentModel;
  qtyOrder:any = 1;

  specialDiscount:number = 0;
  //user
  user:string = null;

  constructor( private studentService: StudentsService,
               private itemService: ItemsService,
               private orderService: OrdersService,
               private router:Router ) {
   this.user = localStorage.getItem('user');
  }

  ngOnInit(): void {

    this.getStudents();
    this.getItems();

  }

  getStudents() {
    this.studentService.getStudent().subscribe(
      res => {
        this.students = res;
        this.totalStudents = res.length;
      }
    );
  }

  getItems() {
    this.itemService.getItems().subscribe(
      res => {
        this.items = res;
        this.totalItems = res.length;
      }
    );
  }

  searchStudent( term ) {

    if ( term != null ) {
      this.studentService.searchStudent( term ).subscribe(
        res => {

          this.students = res;
          this.totalStudents = res.length;

        }
      );
    } else {
      return;
    }
  }

  searchItem( term ) {

    if ( term != null ) {

      this.orderBy.forEach( property => {

        this.itemService.searchItem( property, term ).subscribe(

          res => {

            if ( res.length > 0 ) {

              this.items = res;
              this.totalItems = res.length;

            }

          }
         );

       });

    } else {

      return;

    }
  }

  setItem( item ) {
    this.itemSelected = item;
  }

  setStudent( student ) {
    this.studentSelected = student;
  }

  setQty( qty ) {
     this.qtyOrder = qty;
  }

  saveOrder() {

    if( this.itemSelected == null || this.studentSelected == null) { this.errors(); }
    if( this.qtyOrder <= 0 ) { this.errorQty(); }

    if ( this.itemSelected != null && this.studentSelected != null && this.qtyOrder > 0 ) {

        let status:string = '';
        let totalOrder:number = this.qtyOrder * this.itemSelected.price.total;
        let specialDis:number = 0;

        if( this.itemSelected.qty.qty >= this.qtyOrder ) { status = 'ready'; } else { status = 'ordered'; }

        const order:OrderModel = {

          orderQty: this.qtyOrder,
          status: status,
          totalOrder: totalOrder,
          specialDiscount: specialDis,
          dateMade: new Date().toLocaleDateString('en-us'),
          dateLastUpdate: new Date().toLocaleDateString('en-us'),
          made: this.user,
          lastUpdateBy: this.user,
          active: true,
          person: {
                    name: this.studentSelected.name,
                    lastname: this.studentSelected.lastname,
                    photoUrl: this.studentSelected.photo.url,
                    id: this.studentSelected.id
          },
          item: {
                   product: this.itemSelected.product,
                   brand: this.itemSelected.brand,
                   model: this.itemSelected.model,
                   color: this.itemSelected.color,
                   size: this.itemSelected.size,
                   price: this.itemSelected.price.total,
                   photoUrl: this.itemSelected.photo.url,
                   id: this.itemSelected.id
                 }
        }

        this.createNew( order );
        this.reset();
        this.createSuccess();

        //if( status = 'ready' ) { this.router.navigateByUrl('/listorder/listReady'); }
        //if( status = 'ordered' ) { this.router.navigateByUrl('/listorder'); }

    }

  }

  //create new
  createNew( order:any ){

    this.orderService.createNew( order );

    let newOrder:number = parseInt(this.itemSelected.qty.qtyNewShipment) + parseInt(this.qtyOrder) ;
    const data = {
        qty: this.itemSelected.qty.qty,
        qtyNewShipment: newOrder,
        lastChange: this.user,
        lastChangeData: new Date().toLocaleDateString('en-us')
    };

    this.itemService.changeQty( data, this.itemSelected.id );

  }

  // Swal message
  createSuccess(){

    Swal.fire({
      position: 'top-end',
      imageUrl: "../../../../../assets/img/icons/done.png",
      //instead of imageSize use imageWidth and imageHeight
      imageWidth: 100,
      imageHeight: 100,
      title: 'Order created',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        container: 'swal-update-container-class',
        popup: 'swal-update-popup-class',
        title: 'swal-update-title-class'
      }
    });

  }
  errorQty(){

    Swal.fire({
      position: 'top-end',
      imageUrl: "../../../../../assets/img/icons/warning.png",
      //instead of imageSize use imageWidth and imageHeight
      imageWidth: 100,
      imageHeight: 100,
      title: 'Quantity must be greater than 0',
      showConfirmButton: false,
      timer: 2500,
      customClass: {
        container: 'swal-update-container-class',
        popup: 'swal-update-popup-class',
        title: 'swal-update-title-class'
      }
    });

  }
  errors(){

    Swal.fire({
      position: 'top-end',
      imageUrl: "../../../../../assets/img/icons/warning.png",
      //instead of imageSize use imageWidth and imageHeight
      imageWidth: 100,
      imageHeight: 100,
      title: 'You must complete all fields',
      showConfirmButton: false,
      timer: 2500,
      customClass: {
        container: 'swal-update-container-class',
        popup: 'swal-update-popup-class',
        title: 'swal-update-title-class'
      }
    });

  }

  reset(){

    this.itemSelected = null;
    this.studentSelected = null;
    this.qtyOrder = 1;
    this.specialDiscount = 0;

  }


}
