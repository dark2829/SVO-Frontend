import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilModifyComponent } from './perfil-modify.component';

describe('PerfilModifyComponent', () => {
  let component: PerfilModifyComponent;
  let fixture: ComponentFixture<PerfilModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
