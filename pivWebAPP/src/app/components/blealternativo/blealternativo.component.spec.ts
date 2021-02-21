import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlealternativoComponent } from './blealternativo.component';

describe('BlealternativoComponent', () => {
  let component: BlealternativoComponent;
  let fixture: ComponentFixture<BlealternativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlealternativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlealternativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
