import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigWorkflowComponent } from './workflow.component';

describe('ConfigWorkflowComponent', () => {
  let component: ConfigWorkflowComponent;
  let fixture: ComponentFixture<ConfigWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
