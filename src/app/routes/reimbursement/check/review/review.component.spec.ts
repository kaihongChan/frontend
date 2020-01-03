import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReimbursementCheckReviewComponent } from './review.component';

describe('ReimbursementCheckReviewComponent', () => {
  let component: ReimbursementCheckReviewComponent;
  let fixture: ComponentFixture<ReimbursementCheckReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementCheckReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementCheckReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
