import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoRegisterComponent } from './empleado-register.component';

describe('EmpleadoRegisterComponent', () => {
  let component: EmpleadoRegisterComponent;
  let fixture: ComponentFixture<EmpleadoRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
