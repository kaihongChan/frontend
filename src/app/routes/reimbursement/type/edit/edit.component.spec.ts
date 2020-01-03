import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReimbursementTypeEditComponent } from './edit.component';

describe('ReimbursementTypeEditComponent', () => {
  let component: ReimbursementTypeEditComponent;
  let fixture: ComponentFixture<ReimbursementTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
