import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigWorkflowDesignNodeComponent } from './node.component';

describe('ConfigWorkflowDesignNodeComponent', () => {
  let component: ConfigWorkflowDesignNodeComponent;
  let fixture: ComponentFixture<ConfigWorkflowDesignNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigWorkflowDesignNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigWorkflowDesignNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
