import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mq135Component } from './mq135.component';

describe('Mq135Component', () => {
  let component: Mq135Component;
  let fixture: ComponentFixture<Mq135Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Mq135Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Mq135Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
