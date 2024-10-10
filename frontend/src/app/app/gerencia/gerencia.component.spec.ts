import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciasComponent } from './gerencia.component';

describe('GerenciasComponent', () => {
  let component: GerenciasComponent;
  let fixture: ComponentFixture<GerenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
