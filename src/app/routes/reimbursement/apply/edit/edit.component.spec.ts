import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReimbursementApplyEditComponent } from './edit.component';

describe('ReimbursementApplyEditComponent', () => {
  let component: ReimbursementApplyEditComponent;
  let fixture: ComponentFixture<ReimbursementApplyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementApplyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementApplyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
