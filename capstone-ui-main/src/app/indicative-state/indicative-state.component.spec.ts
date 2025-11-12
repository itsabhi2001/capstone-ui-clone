import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicativeStateComponent } from './indicative-state.component';

describe('IndicativeStateComponent', () => {
  let component: IndicativeStateComponent;
  let fixture: ComponentFixture<IndicativeStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicativeStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicativeStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
