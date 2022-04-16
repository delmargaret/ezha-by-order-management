import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { CafePageComponent } from './cafe-page/cafe-page.component';
import { CourierPageComponent } from './courier-page/courier-page.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { OrdersService } from '../services/orders.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    CafePageComponent,
    CourierPageComponent,
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    CafePageComponent,
    CourierPageComponent,
  ],
  providers: [OrdersService],
})
export class ComponentsModule {}
