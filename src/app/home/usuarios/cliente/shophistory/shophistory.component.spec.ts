import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShophistoryComponent } from './shophistory.component';

describe('ShophistoryComponent', () => {
  let component: ShophistoryComponent;
  let fixture: ComponentFixture<ShophistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShophistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShophistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
