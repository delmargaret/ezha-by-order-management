import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { LogInComponent } from './pages/log-in/log-in.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AuthModule } from './security/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { mainReducer } from './state/reducers/main.reducer';

@NgModule({
  declarations: [AppComponent, LogInComponent, OrdersComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    AuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(mainReducer),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
