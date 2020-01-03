import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigWorkflowDesignNodeReviewerSetComponent } from './reviewer-set.component';

describe('ConfigWorkflowDesignNodeReviewerSetComponent', () => {
  let component: ConfigWorkflowDesignNodeReviewerSetComponent;
  let fixture: ComponentFixture<ConfigWorkflowDesignNodeReviewerSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigWorkflowDesignNodeReviewerSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigWorkflowDesignNodeReviewerSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
