import { Component, OnInit } from '@angular/core';
import { Customer } from 'app/core/models/customer';
import { CustomerService } from 'app/core/services/customer.service';
import { AlertifyService } from 'app/core/services/alertify.service';
import { AuthService } from '../admin/login/services/auth.service';

@Component({
    selector: "app-customer",
    templateUrl: "./customer.component.html",
    styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {

    customers: Customer[] = [];
    customerName: string = "";
    customerCode: string = "";
    address: string = "";
    phoneNumber: string = "";
    email: string = "";
    selectedCustomer: Customer = new Customer();

    constructor(
        private customerService: CustomerService,
        private alertifyService: AlertifyService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.getCustomers();
    }

    getCustomers() {
        this.customerService.getCustomers().subscribe(data => {
            this.customers = data;
        }, error => {
            this.alertifyService.error("Müşteriler Getirilemedi");
        });
    }

    addCustomer() {
        var customer = new Customer();

        customer.customerName = this.customerName;
        customer.customerCode = this.customerCode;
        customer.address = this.address;
        customer.phoneNumber = this.phoneNumber;
        customer.email = this.email;
        customer.createdUserId = this.authService.getCurrentUserId();
        customer.createdDate = new Date();
        customer.lastUpdatedUserId = this.authService.getCurrentUserId();
        customer.lastUpdatedDate = new Date();
        customer.status = true;
        customer.isDeleted = false;

        this.customerService.add(customer).subscribe(data => {
            this.alertifyService.success("Müşteri Eklendi");
            this.customerName = "";
            this.customerCode = "";
            this.address = "";
            this.phoneNumber = "";
            this.email = "";
            this.getCustomers();
        }, error => {
            this.alertifyService.error("Müşteri Eklenemedi");
        });
    }

    selectCustomer(customer: Customer) {
        this.selectedCustomer = customer;
        this.customerName = customer.customerName;
        this.customerCode = customer.customerCode;
        this.address = customer.address;
        this.phoneNumber = customer.phoneNumber;
        this.email = customer.email;
    }

    updateCustomer() {
        if (this.selectedCustomer.id == 0) {
            this.alertifyService.warning("Güncellenecek Müşteriyi Seç");
            return;
        }

        this.selectedCustomer.customerName = this.customerName;
        this.selectedCustomer.customerCode = this.customerCode;
        this.selectedCustomer.address = this.address;
        this.selectedCustomer.phoneNumber = this.phoneNumber;
        this.selectedCustomer.email = this.email;
        this.selectedCustomer.lastUpdatedUserId = this.authService.getCurrentUserId();
        this.selectedCustomer.lastUpdatedDate = new Date();

        this.customerService.update(this.selectedCustomer).subscribe(data => {
            this.alertifyService.success("Müşteri Güncellendi");
            this.customerName = "";
            this.customerCode = "";
            this.address = "";
            this.phoneNumber = "";
            this.email = "";
            this.selectedCustomer = new Customer();
            this.getCustomers();
        }, error => {
            this.alertifyService.error("Müşteri Güncellenemedi");
        });
    }

    deleteCustomer(customer: Customer) {
        this.customerService.delete(customer.id).subscribe(data => {
            this.alertifyService.success("Müşteri Silindi");
            this.getCustomers();
        }, error => {
            this.alertifyService.error("Müşteri Silinemedi");
        });
    }

    checkClaim(claim: string): boolean {
        return this.authService.claimGuard(claim);
    }
        
}