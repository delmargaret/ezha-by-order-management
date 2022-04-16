import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/models/userRole';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private authService: AuthService) { }

  get isCourier() {
    return this.authService.getUserRole() === UserRole.Courier;
  }

  ngOnInit(): void {
  }

}
