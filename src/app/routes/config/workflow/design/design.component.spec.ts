import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigWorkflowDesignComponent } from './design.component';

describe('ConfigWorkflowDesignComponent', () => {
  let component: ConfigWorkflowDesignComponent;
  let fixture: ComponentFixture<ConfigWorkflowDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigWorkflowDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigWorkflowDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
