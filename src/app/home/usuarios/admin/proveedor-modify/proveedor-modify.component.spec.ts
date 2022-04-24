import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorModifyComponent } from './proveedor-modify.component';

describe('ProveedorModifyComponent', () => {
  let component: ProveedorModifyComponent;
  let fixture: ComponentFixture<ProveedorModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
