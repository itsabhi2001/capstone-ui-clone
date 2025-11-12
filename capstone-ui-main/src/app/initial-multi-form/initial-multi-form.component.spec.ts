import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialMultiFormComponent } from './initial-multi-form.component';

describe('InitialMultiFormComponent', () => {
  let component: InitialMultiFormComponent;
  let fixture: ComponentFixture<InitialMultiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialMultiFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialMultiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
