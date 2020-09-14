import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  @Input() price: number;
  displayPrice: string;

  ngOnInit() {
    const aws = Math.floor(this.price / 100);
    if (aws === 0) {
      this.displayPrice = `${this.price} clouds`
      return;
    }
    this.displayPrice = `${aws} aws and ${this.price - aws * 100} clouds`
  }
}
