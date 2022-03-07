import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorRegisterComponent } from './proveedor-register.component';

describe('ProveedorRegisterComponent', () => {
  let component: ProveedorRegisterComponent;
  let fixture: ComponentFixture<ProveedorRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
