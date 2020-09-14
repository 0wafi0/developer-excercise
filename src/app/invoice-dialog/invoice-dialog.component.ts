import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { item } from '../models';




@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.scss']
})
export class InvoiceDialogComponent implements AfterViewInit {
  total: item;
  constructor(
    public dialogRef: MatDialogRef<InvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      cart: item[],
    }) {
    this.total = this.data.cart.reduce((a, b) => ({ name: 'Total', price: a.price + b.price }))
  }

  ngAfterViewInit() {

  }

}
