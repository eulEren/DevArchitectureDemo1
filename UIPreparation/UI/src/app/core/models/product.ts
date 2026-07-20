export class Product {
    id:number=0;
    createdUserId:number=0;
    createdDate:Date=new Date();
    lastUpdatedUserId:number=0;
    lastUpdatedDate:Date=new Date();
    status:boolean=true;
    isDeleted:boolean=false;
    name:string = "";
    colorId:number=0;
    size:string="";
}