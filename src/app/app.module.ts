import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, MatRadioModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './item/item.component';
import { PriceComponent } from './price/price.component';
import { InvoiceDialogComponent } from './invoice-dialog/invoice-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    PriceComponent,
    InvoiceDialogComponent
  ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    InvoiceDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
