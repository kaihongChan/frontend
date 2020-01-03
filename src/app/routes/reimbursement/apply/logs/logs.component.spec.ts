import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReimbursementApplyLogsComponent } from './logs.component';

describe('ReimbursementApplyLogsComponent', () => {
  let component: ReimbursementApplyLogsComponent;
  let fixture: ComponentFixture<ReimbursementApplyLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementApplyLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementApplyLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
