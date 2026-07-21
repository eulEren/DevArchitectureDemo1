export class Stock {
    id:number=0;
    createdUserId:number=0;
    createdDate:Date=new Date();
    lastUpdatedUserId:number=0;
    lastUpdatedDate:Date=new Date();
    status:boolean=true;
    isDeleted:boolean=false;
    productId:number=0;
    quantity:number=0;
    isReadyForSale:boolean=false;
}