import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoModifyComponent } from './empleado-modify.component';

describe('EmpleadoModifyComponent', () => {
  let component: EmpleadoModifyComponent;
  let fixture: ComponentFixture<EmpleadoModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
