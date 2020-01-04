import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigWorkflowEditComponent } from './edit.component';

describe('ConfigWorkflowEditComponent', () => {
  let component: ConfigWorkflowEditComponent;
  let fixture: ComponentFixture<ConfigWorkflowEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigWorkflowEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigWorkflowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
