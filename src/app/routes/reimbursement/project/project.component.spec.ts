import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReimbursementProjectComponent } from './project.component';

describe('ReimbursementProjectComponent', () => {
  let component: ReimbursementProjectComponent;
  let fixture: ComponentFixture<ReimbursementProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
