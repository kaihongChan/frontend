import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReimbursementCheckComponent } from './check.component';

describe('ReimbursementCheckComponent', () => {
  let component: ReimbursementCheckComponent;
  let fixture: ComponentFixture<ReimbursementCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
