import { Component, AfterViewInit } from '@angular/core';
import { item } from './models';
import { MatDialog } from '@angular/material';
import { InvoiceDialogComponent } from './invoice-dialog/invoice-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  addNewTillItem = new FormGroup({
    name: new FormControl('', [Validators.required]),
    aws: new FormControl(null, Validators.compose([Validators.required, Validators.min(0), Validators.max(1000)])),
    clouds: new FormControl(null, Validators.compose([Validators.required, Validators.min(0), Validators.max(99)]))
  });


  tillItems: item[] = [];
  activeCart: string;
  cart: item[] = [];
  twoForThreeCart: item[] = [];
  secondHalfPriceCart: item[] = [];

  get isTwoForThreeCartActive(): boolean {
    return this.twoForThreeCart.length < 3
  }

  get isSecondHalfPriceCartActive(): boolean {
    return this.secondHalfPriceCart.length < 2
  }

  constructor(public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.addNewTillItem.markAllAsTouched();
  }

  reset() {
    this.cart = [];
    this.twoForThreeCart = [];
    this.secondHalfPriceCart = [];

  }

  add(item: item) {
    if (!item.name) {
      return;
    }
    switch (this.activeCart) {
      case '1': {
        if (this.isTwoForThreeCartActive) {
          this.twoForThreeCart.push(item);
        }
        break;
      }
      case '2': {
        if (this.isSecondHalfPriceCartActive && this.isItemForHalfPriceValid(item)) {
          this.secondHalfPriceCart.push(item);
        }
        break;
      }
      case '3': {
        this.cart.push(item);
      }
    }
  }

  isItemForHalfPriceValid(item: item) {
    // if there is already an item for the half price offer
    if (this.secondHalfPriceCart.length === 1) {
      return this.secondHalfPriceCart[0].name === item.name && this.secondHalfPriceCart[0].price === item.price
    }
    // if half price offer has not been used yet
    if (this.secondHalfPriceCart.length === 0) {
      return true
    }
    return false
  }

  removeTwoForThreeCart(item: item) {
    if (item.index > -1) {
      this.twoForThreeCart.splice(item.index, 1);
      return;
    }
  }

  removeSecondHalfPriceCart(item: item) {
    if (item.index > -1) {
      this.secondHalfPriceCart.splice(item.index, 1);
      return;
    }
  }

  removeCart(item: item) {
    if (item.index > -1) {
      this.cart.splice(item.index, 1);
      return;
    }
  }

  onInvoicePrint(): void {
    if (this.twoForThreeCart.length === 3) {
      const min = this.twoForThreeCart.reduce((a, b) => {
        const min = Math.min(a.price, b.price)
        return a.price === min ? a : b;
      });
      const index = this.twoForThreeCart.findIndex((i) => i.name === min.name && i.price === min.price);
      this.twoForThreeCart[index].price = 0;
    }

    if (this.secondHalfPriceCart.length === 2) {
      this.secondHalfPriceCart[1].price = Math.floor(this.secondHalfPriceCart[1].price / 2);
    }
    const dialogRef = this.dialog.open(InvoiceDialogComponent, {
      width: '35%',
      data: {
        cart: [...this.twoForThreeCart, ...this.secondHalfPriceCart, ...this.cart]
      }
    });

    dialogRef.afterClosed().subscribe(_result => {
      this.reset();
    });
  }

  onAddNewTillItem() {
    const rawItem = this.addNewTillItem.value;
    this.addNewTillItem.reset();
    const alreadyExists = this.tillItems.find(item => item.name === rawItem.name);
    if (alreadyExists) {
      return;
    }
    this.tillItems.push({
      name: rawItem.name,
      price: Math.ceil(rawItem.aws) * 100 + Math.ceil(rawItem.clouds)
    });
  }
}



