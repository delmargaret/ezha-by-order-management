import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/security/auth.service';
import { AppState } from 'src/app/state/app.state';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoginState } from 'src/app/models/loginState';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private $unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store
      .select<LoginState>((state) => state.loginState)
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe((loginState) => {
        this.isLoggedIn = loginState.isLoggedIn;
      });
  }

  logOut() {
    this.authService.removeUser();
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
