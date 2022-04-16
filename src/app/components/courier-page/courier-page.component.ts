import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { PaymentTypes } from 'src/app/models/paymentTypes';
import { Towns } from 'src/app/models/towns';
import { OrdersService } from 'src/app/services/orders.service';
import * as _ from 'lodash';
import { CourierDish } from 'src/app/models/courierDish';
import { CourierStatuses } from 'src/app/models/courierStatuses';
import { OrderStatuses } from 'src/app/models/orderStatuses';

@Component({
  selector: 'app-courier-page',
  templateUrl: './courier-page.component.html',
  styleUrls: ['./courier-page.component.css'],
})
export class CourierPageComponent implements OnInit {
  interval: any;
  allOrders: Order[] = [];
  orders: Order[] = [];
  towns = Towns;
  paymentTypes = PaymentTypes;
  statuses = CourierStatuses;
  orderStatuses = OrderStatuses;
  dropdownStyles: any = {
    0: { 'background-color': 'rgb(176, 207, 167)' },
    1: { 'background-color': 'rgb(250, 207, 127)' },
    2: { 'background-color': 'rgb(161, 194, 255)' },
  };
  orderFilters: any = {
    0: 'active',
    1: 'closed',
    2: 'all',
  };
  selectedFilter: string = this.orderFilters[0];
  selected: string | null = null;
  courierStatus: CourierStatuses | null = null;
  openedOrders: string[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getCourierStatus();
    this.getOrders();
    this.interval = setInterval(() => {
      this.getOrders();
    }, 60 * 2 * 1000);
  }

  closePanel(id: string): void {
    const index = this.openedOrders.indexOf(id);
    if (index !== -1) {
      this.openedOrders.splice(index, 1);
    }
  }

  openPanel(id: string): void {
    if (!this.openedOrders.includes(id)) {
      this.openedOrders.push(id);
    }
  }

  getActive(event?: Event) {
    event ? event.preventDefault() : null;
    this.selectedFilter = this.orderFilters[0];
    this.orders = this.allOrders
      .filter((order) => order.orderStatus !== 3)
      .sort(
        (a, b) =>
          new Date(a.orderDateTime).valueOf() -
          new Date(b.orderDateTime).valueOf()
      );
  }

  getClosed(event?: Event) {
    event ? event.preventDefault() : null;
    this.selectedFilter = this.orderFilters[1];
    this.orders = this.allOrders
      .filter((order) => order.orderStatus === 3)
      .sort(
        (a, b) =>
          new Date(a.orderDateTime).valueOf() -
          new Date(b.orderDateTime).valueOf()
      );
  }

  getAll(event?: Event) {
    event ? event.preventDefault() : null;
    this.selectedFilter = this.orderFilters[2];
    this.orders = this.allOrders.sort(
      (a, b) =>
        new Date(a.orderDateTime).valueOf() -
        new Date(b.orderDateTime).valueOf()
    );
  }

  acceptOrder(event: Event, orderId: string) {
    event.preventDefault();
    event.stopPropagation();
    this.ordersService.AcceptOrder(orderId).subscribe(
      () => this.getOrders(),
      () => this.getOrders()
    );
  }

  rejectOrder(event: Event, orderId: string) {
    event.preventDefault();
    event.stopPropagation();
    this.ordersService.RejectOrder(orderId).subscribe(
      () => this.getOrders(),
      () => this.getOrders()
    );
  }

  onChangeStatus(event: Event, orderId: string) {
    event.preventDefault();
    event.stopPropagation();
    this.ordersService
      .SetOrderStatus(orderId, this.orderStatuses.Done)
      .subscribe(
        () => this.getOrders(),
        () => {}
      );
  }

  onChangeCourierStatus(value: string) {
    this.selected = value;

    this.ordersService.SetCourierStatus(Number(value)).subscribe(
      () => this.getCourierStatus(),
      () => {}
    );
  }

  getOrders() {
    this.ordersService.GetCourierOrders().subscribe(
      (orders: Order[]) => {
        this.allOrders = orders;
        this.allOrders.forEach((order) => {
          order.courierDishes = _.chain(order.orderDishes)
            .groupBy((x) => x.cateringFacilityName)
            .toPairs()
            .map(function (currentData) {
              return _.zipObject(['cafeName', 'dishes'], currentData);
            })
            .map<CourierDish>(function (item) {
              return {
                cafeName: item.cafeName,
                dishes: item.dishes,
              } as CourierDish;
            })
            .value();
        });
        // var a = Object.assign({}, this.allOrders[0]);
        // a.orderStatus = 3;
        // a.isOrderAccepted = true;
        // a.orderDateTime = Date.now().toString();
        // this.allOrders.push(a);
        // this.allOrders.push(Object.assign({}, this.allOrders[0]));
        switch (this.selectedFilter) {
          case this.orderFilters[0]:
            this.getActive();
            break;
          case this.orderFilters[1]:
            this.getClosed();
            break;
          case this.orderFilters[2]:
            this.getAll();
            break;
        }
      },
      () => {
        this.interval ? clearInterval(this.interval) : null;
        this.allOrders = [];
      }
    );
  }

  getCourierStatus() {
    this.ordersService.GetCourierStatus().subscribe(
      (status: CourierStatuses) => (this.courierStatus = status),
      () => {}
    );
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
