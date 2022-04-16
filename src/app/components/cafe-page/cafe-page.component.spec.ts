import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafePageComponent } from './cafe-page.component';

describe('CafePageComponent', () => {
  let component: CafePageComponent;
  let fixture: ComponentFixture<CafePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CafePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CafePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
