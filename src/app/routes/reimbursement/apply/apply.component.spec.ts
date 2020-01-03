import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReimbursementApplyComponent } from './apply.component';

describe('ReimbursementApplyComponent', () => {
  let component: ReimbursementApplyComponent;
  let fixture: ComponentFixture<ReimbursementApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
