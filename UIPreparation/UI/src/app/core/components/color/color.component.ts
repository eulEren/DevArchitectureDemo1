import { Component, OnInit } from '@angular/core';
import { Color } from 'app/core/models/color';
import { ColorService } from 'app/core/services/color.service';
import { AlertifyService } from 'app/core/services/alertify.service';
import { AuthService } from '../admin/login/services/auth.service';

@Component({
    selector: "app-color",
    templateUrl: "./color.component.html",
    styleUrls: ["./color.component.css"]
})
export class ColorComponent implements OnInit {

    colors: Color[] = [];
    colorName: string = "";
    selectedColor: Color = new Color();

    constructor(
        private colorService: ColorService,
        private alertifyService: AlertifyService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.getColors();
    }

    getColors() {
        this.colorService.getColors().subscribe(data => {
            this.colors = data;
        }, error => {
            this.alertifyService.error("Renkler Yüklenemedi");
        });
    }

    addColor() {
        var color = new Color();

        color.name = this.colorName;
        color.createdUserId = this.authService.getCurrentUserId();
        color.createdDate = new Date();
        color.lastUpdatedUserId = this.authService.getCurrentUserId();
        color.lastUpdatedDate = new Date();
        color.status = true;
        color.isDeleted = false;

        this.colorService.add(color).subscribe(data => {
            this.alertifyService.success("Renk Başarıyla Eklendi");
            this.colorName = "";
            this.getColors();
        }, error => {
            this.alertifyService.error("Renk Eklenemedi");
        });
    }

    selectColor(color: Color) {
        this.selectedColor = color;
        this.colorName = color.name;
    }

    updateColor() {
        if (this.selectedColor.id == 0) {
            this.alertifyService.warning("Güncellenecek Renk Seç");
            return;
        }

        this.selectedColor.name = this.colorName;
        this.selectedColor.lastUpdatedUserId = this.authService.getCurrentUserId();
        this.selectedColor.lastUpdatedDate = new Date();

        this.colorService.update(this.selectedColor).subscribe(data => {
            this.alertifyService.success("Renk Başarıyla Güncellendi");
            this.colorName = "";
            this.selectedColor = new Color();
            this.getColors();
        }, error => {
            this.alertifyService.error("Renk Güncellenemedi");
        });
    }

    deleteColor(color: Color) {
        this.colorService.delete(color.id).subscribe(data => {
            this.alertifyService.success("Renk silindi");
            this.getColors();
        }, error => {
            this.alertifyService.error("Renk silinemedi");
        });
    }

    checkClaim(claim: string): boolean {
        return this.authService.claimGuard(claim);
    }
}