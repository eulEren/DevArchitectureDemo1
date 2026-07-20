export class Customer {
    id: number = 0;
    createdUserId:number=0;
    createdDate:Date=new Date();
    lastUpdatedUserId:number=0;
    lastUpdatedDate:Date=new Date();
    status:boolean=true;
    isDeleted:boolean=false;
    customerName:string="";
    customerCode:string="";
    address:string="";
    phoneNumber:string="";
    email:string="";
}