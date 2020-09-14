import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { item } from '../models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() isCartItem: boolean;
  @Input() name: string;
  @Input() price: number;
  @Input() index?: number;

  @Output() click = new EventEmitter<item>();

  onClick(_event) {
    this.click.emit({
      name: this.name,
      price: this.price,
      index: this.isCartItem ? this.index : -1
    })
  }

}
