import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoRequestComponent } from './pedido-request.component';

describe('PedidoRequestComponent', () => {
  let component: PedidoRequestComponent;
  let fixture: ComponentFixture<PedidoRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
