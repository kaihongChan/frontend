import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReimbursementProjectEditComponent } from './edit.component';

describe('ReimbursementProjectEditComponent', () => {
  let component: ReimbursementProjectEditComponent;
  let fixture: ComponentFixture<ReimbursementProjectEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementProjectEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementProjectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
