import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRestaurant } from './new-restaurant';

describe('NewRestaurant', () => {
  let component: NewRestaurant;
  let fixture: ComponentFixture<NewRestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRestaurant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRestaurant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
