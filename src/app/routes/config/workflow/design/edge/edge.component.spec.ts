import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigWorkflowDesignEdgeComponent } from './edge.component';

describe('ConfigWorkflowDesignEdgeComponent', () => {
  let component: ConfigWorkflowDesignEdgeComponent;
  let fixture: ComponentFixture<ConfigWorkflowDesignEdgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigWorkflowDesignEdgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigWorkflowDesignEdgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
