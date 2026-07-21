import { Component, OnInit } from '@angular/core';
import { Order } from 'app/core/models/order';
import { OrderService } from 'app/core/services/order.service';
import { AlertifyService } from 'app/core/services/alertify.service';
import { Customer } from 'app/core/models/customer';
import { CustomerService } from 'app/core/services/customer.service';
import { Product } from 'app/core/models/product';
import { ProductService } from 'app/core/services/product.service';

@Component({
    selector: "app-order-report",
    templateUrl: "./order-report.component.html",
    styleUrls: ["./order-report.component.css"]
})
export class OrderReportComponent implements OnInit {

    orders: Order[] = [];
    customers: Customer[] = [];
    products: Product[] = [];

    constructor(
        private orderService: OrderService,
        private customerService: CustomerService,
        private productService: ProductService,
        private alertifyService: AlertifyService
    ) { }

    ngOnInit(): void {
        this.getOrders();
        this.getCustomers();
        this.getProducts();
    }

    getOrders() {
        this.orderService.getOrders().subscribe(data => {
            this.orders = data;
        }, error => {
            this.alertifyService.error("Sipariş Raporu Getirilemedi");
        });
    }

    getCustomers() {
        this.customerService.getCustomers().subscribe(data => {
            this.customers = data;
        }, error => {
            this.alertifyService.error("Müşteriler Getirilemedi");
        });
    }

    getProducts() {
        this.productService.getProducts().subscribe(data => {
            this.products = data;
        }, error => {
            this.alertifyService.error("Ürünler Getirilemedi");
        });
    }

    getCustomerName(customerId: number): string {
        var customer = this.customers.find(c => c.id == customerId);
        return customer ? customer.customerName : "Müşteri Silinmiş";
    }

    getProductName(productId: number): string {
        var product = this.products.find(p => p.id == productId);
        return product ? product.name : "Ürün Silinmiş";
    }

}