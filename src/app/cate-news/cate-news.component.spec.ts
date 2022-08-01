import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateNewsComponent } from './cate-news.component';

describe('TechNewsComponent', () => {
  let component: CateNewsComponent;
  let fixture: ComponentFixture<CateNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CateNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
