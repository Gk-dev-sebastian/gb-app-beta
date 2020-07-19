

export class ItemPhoto {
  name:string;
  url:string;
}

export class Qty {

  qty:number;
  qtyNewShipment:any;
  lastChange?:string;
  lastChangeData?:string;

}

export class Price {

  listPrice:number;
  discount?:number;
  total?:number;

}

export class ItemModel {

    id?: string;
    product: string;
    brand: string;
    model: string;
    color: string;
    size: string;
    qty: Qty;
    price:Price;
    photo?: ItemPhoto;
    description: string;
    active: boolean;

 }




