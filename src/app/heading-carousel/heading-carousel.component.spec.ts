import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingCarouselComponent } from './heading-carousel.component';

describe('HeadingCarouselComponent', () => {
  let component: HeadingCarouselComponent;
  let fixture: ComponentFixture<HeadingCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadingCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadingCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
