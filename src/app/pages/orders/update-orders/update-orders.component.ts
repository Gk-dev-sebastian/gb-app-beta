import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// models
import { OrderModel } from '../../../models/order.model';

// services
import { StudentsService } from '../../../services/students.service';
import { ItemsService } from '../../../services/items.service';
import { OrdersService } from '../../../services/orders.service';

// swal
import Swal from 'sweetalert2';
import { ItemModel } from 'src/app/models/item.model';
import { StudentModel } from 'src/app/models/student.model';

@Component({
  selector: 'app-update-orders',
  templateUrl: './update-orders.component.html',
  styles: []
})
export class UpdateOrdersComponent implements OnInit {

  // studen list
  students: StudentModel[] = [];
  totalStudents: number;
  // item list
  items: ItemModel[] = [];
  totalItems: number;
  orderBy: any[] = [ 'product', 'brand', 'model', 'size' ];
  //order
  order:OrderModel;
  orderId:string;
  // selection
  itemSelected: ItemModel;
  studentSelected: StudentModel;
  qtyOrder: any;
  specialDiscount:number = 0;
  //olditem
  oldItem:ItemModel;
  // user
  user:string = null;

  origin:string;


  constructor( private studentService: StudentsService,
               private itemService: ItemsService,
               private orderService: OrdersService,
               private router:Router,
               private activeRoute:ActivatedRoute) {

    this.orderId = this.activeRoute.snapshot.paramMap.get('id');
    this.user = localStorage.getItem('user');
    this.origin = `/order/${this.orderId}`;

               }

  ngOnInit(): void {

    this.getStudents();
    this.getItems();
    this.getOrder();

  }

  //get data
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

  getOrder() {
      this.orderService.getById( this.orderId ).subscribe(
        res => {

          this.order = res;
          this.studentService.getById( this.order.person.id ).subscribe( res => this.studentSelected = res );
          this.itemService.getById( this.order.item.id ).subscribe( (res:any) => {
            this.itemSelected = res;
            this.oldItem = res;
          } );
          this.qtyOrder = this.order.orderQty;

        }
      )
  }

  // search data
  searchStudent( term ) {

    if ( term != null ) {
      this.studentService.searchStudent( term ).subscribe(
        (res:any) => {

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

          (res:any) => {

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

  //set data
  setItem( item ) {
    this.itemSelected = item;
  }

  setStudent( student ) {
    this.studentSelected = student;
  }

  setQty( qty ) {
     this.qtyOrder = qty;

  }

  //save data
  saveOrder() {

    if( this.order.status != 'delivered') {

      if ( this.itemSelected != null && this.studentSelected != null && this.qtyOrder > 0 ) {

        let status:string = '';
        let totalOrder:number = this.qtyOrder * this.itemSelected.price.total;
        let specialDis:number = this.specialDiscount - totalOrder;

        if( this.itemSelected.qty.qty >= this.qtyOrder ) { status = 'ready'; } else { status = 'ordered'; }

        const order:OrderModel = {

          orderQty: this.qtyOrder,
          status: status,
          totalOrder: totalOrder,
          specialDiscount: specialDis,
          dateMade: this.order.dateMade,
          dateLastUpdate: new Date().toLocaleDateString('en-us'),
          made: this.order.made,
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

        this.updateOrder( this.order.id, order );

        this.router.navigateByUrl(`/order/${this.order.id}`);

        this.updateSuccess();

        return false;


      } else {

        if( this.qtyOrder <= 0){
          this.errorQty();
          return;
        } else {
          this.errorItems();
          return;
        }

      }

    } else {

      return false;

    }

  }

  updateOrder( id:string, data:any ){

    if( this.itemSelected.id != this.order.item.id ){

      //old item recovery

      let oldQtyOrder = this.order.orderQty; //old order qty
      let oldQtyItem:any = this.oldItem.qty.qty;// new qty - old order qty
      let oldOrderedItem = this.oldItem.qty.qtyNewShipment - oldQtyOrder ;

      const oldItemData = {
        qty: oldQtyItem,
        qtyNewShipment: oldOrderedItem,
        lastChange: this.user,
        lastChangeData: new Date().toLocaleDateString('en-us')
      };

      this.itemService.changeQty( oldItemData, this.oldItem.id );

      // new item ordered

      let newOrder = parseInt(this.itemSelected.qty.qtyNewShipment) + parseInt(this.qtyOrder) ;

      const itemData = {
        qty: this.itemSelected.qty.qty,
        qtyNewShipment: newOrder,
        lastChange: this.user,
        lastChangeData: new Date().toLocaleDateString('en-us')
      };

      this.itemService.changeQty( itemData, this.itemSelected.id );


    }else {

      let newQ = this.order.orderQty - this.qtyOrder; //old order qty
      let newOrder = this.itemSelected.qty.qtyNewShipment - newQ ;

      const itemData = {
        qty: this.itemSelected.qty.qty,
        qtyNewShipment: newOrder,
        lastChange: this.user,
        lastChangeData: new Date().toLocaleDateString('en-us')
      };

      this.itemService.changeQty( itemData, this.itemSelected.id );

    }

    this.orderService.update( id, data );


  }

  // Swal messages!

  updateSuccess(){

    Swal.fire({
      position: 'top-end',
      imageUrl: "../../../../../assets/img/icons/done.png",
      //instead of imageSize use imageWidth and imageHeight
      imageWidth: 100,
      imageHeight: 100,
      title: 'Order updeted',
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
  errorItems(){

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

}
