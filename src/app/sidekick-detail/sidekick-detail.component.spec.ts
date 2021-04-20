import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidekickDetailComponent } from './sidekick-detail.component';

describe('SidekickDetailComponent', () => {
  let component: SidekickDetailComponent;
  let fixture: ComponentFixture<SidekickDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidekickDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidekickDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
