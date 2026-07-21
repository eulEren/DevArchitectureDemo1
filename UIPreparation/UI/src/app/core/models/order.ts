export class Order {
    id:number=0;
    createdUserId:number=0;
    createdDate:Date=new Date();
    lastUpdatedUserId:number=0;
    lastUpdatedDate:Date=new Date();
    status:boolean=true;
    isDeleted:boolean=false;
    customerId:number=0;
    productId:number=0;
    quantity:number=0;
}