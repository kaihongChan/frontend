import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReimbursementTypeComponent } from './type.component';

describe('ReimbursementTypeComponent', () => {
  let component: ReimbursementTypeComponent;
  let fixture: ComponentFixture<ReimbursementTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
