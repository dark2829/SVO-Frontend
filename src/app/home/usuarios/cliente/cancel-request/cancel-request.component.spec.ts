import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelRequestComponent } from './cancel-request.component';

describe('CancelRequestComponent', () => {
  let component: CancelRequestComponent;
  let fixture: ComponentFixture<CancelRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
