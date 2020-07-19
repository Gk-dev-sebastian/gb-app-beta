export class PersonModel {

   name: string;
   lastname: string;
   photoUrl: string;
   id: string;
}

export class ItemOrderModel {

   product: string;
   brand: string;
   model: string;
   color: string;
   size: string;
   price:number;
   photoUrl: string;
   id: string;

}

export class OrderModel {

   id?: string;
   person: PersonModel;
   item: ItemOrderModel;
   orderQty: number;
   status: string;
   totalOrder:number;
   specialDiscount?:number;
   dateMade: string;
   dateLastUpdate?:string;
   made: string;
   lastUpdateBy?:string;
   active: boolean;

}
