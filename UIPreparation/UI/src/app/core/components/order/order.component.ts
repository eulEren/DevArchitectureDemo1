import { Component, OnInit } from '@angular/core';
import { Order } from 'app/core/models/order';
import { OrderService } from 'app/core/services/order.service';
import { AlertifyService } from 'app/core/services/alertify.service';
import { AuthService } from '../admin/login/services/auth.service';
import { Customer } from 'app/core/models/customer';
import { CustomerService } from 'app/core/services/customer.service';
import { Product } from 'app/core/models/product';
import { ProductService } from 'app/core/services/product.service';

@Component({
    selector: "app-order",
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {

    orders: Order[] = [];
    customers: Customer[] = [];
    products: Product[] = [];
    orderCustomerId: number = 0;
    orderProductId: number = 0;
    orderQuantity: number = 0;
    selectedOrder: Order = new Order();

    constructor(
        private orderService: OrderService,
        private customerService: CustomerService,
        private productService: ProductService,
        private alertifyService: AlertifyService,
        private authService: AuthService
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
            this.alertifyService.error("Siparişler Getirilemedi");
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

    addOrder() {
        var order = new Order();

        order.customerId = this.orderCustomerId;
        order.productId = this.orderProductId;
        order.quantity = this.orderQuantity;
        order.createdUserId = this.authService.getCurrentUserId();
        order.createdDate = new Date();
        order.lastUpdatedUserId = this.authService.getCurrentUserId();
        order.lastUpdatedDate = new Date();
        order.status = true;
        order.isDeleted = false;

        this.orderService.add(order).subscribe(data => {
            this.alertifyService.success("Sipariş Eklendi");
            this.orderCustomerId = 0;
            this.orderProductId = 0;
            this.orderQuantity = 0;
            this.getOrders();
        }, error => {
            this.alertifyService.error(error.error || "Sipariş Eklenemedi");
        });
    }

    selectOrder(order: Order) {
        this.selectedOrder = order;
        this.orderCustomerId = order.customerId;
        this.orderProductId = order.productId;
        this.orderQuantity = order.quantity;
    }

    updateOrder() {
        if (this.selectedOrder.id == 0) {
            this.alertifyService.warning("Güncellenecek Siparişi Seç");
            return;
        }

        this.selectedOrder.customerId = this.orderCustomerId;
        this.selectedOrder.productId = this.orderProductId;
        this.selectedOrder.quantity = this.orderQuantity;
        this.selectedOrder.lastUpdatedUserId = this.authService.getCurrentUserId();
        this.selectedOrder.lastUpdatedDate = new Date();

        this.orderService.update(this.selectedOrder).subscribe(data => {
            this.alertifyService.success("Sipariş Güncellendi");
            this.orderCustomerId = 0;
            this.orderProductId = 0;
            this.orderQuantity = 0;
            this.selectedOrder = new Order();
            this.getOrders();
        }, error => {
            this.alertifyService.error(error.error || "Sipariş Güncellenemedi");
        });
    }

    deleteOrder(order: Order) {
        this.orderService.delete(order.id).subscribe(data => {
            this.alertifyService.success("Sipariş Silindi");
            this.getOrders();
        }, error => {
            this.alertifyService.error("Sipariş Silinemedi");
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

    checkClaim(claim: string): boolean {
        return this.authService.claimGuard(claim);
    }

}