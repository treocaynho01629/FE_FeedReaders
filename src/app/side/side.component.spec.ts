import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideComponent } from './side.component';

describe('LeftComponent', () => {
  let component: SideComponent;
  let fixture: ComponentFixture<SideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
