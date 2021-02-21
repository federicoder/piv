import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyallertComponent } from './myallert.component';

describe('MyallertComponent', () => {
  let component: MyallertComponent;
  let fixture: ComponentFixture<MyallertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyallertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyallertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
