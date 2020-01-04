import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReimbursementApplyViewComponent } from './view.component';

describe('ReimbursementApplyViewComponent', () => {
  let component: ReimbursementApplyViewComponent;
  let fixture: ComponentFixture<ReimbursementApplyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementApplyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementApplyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
