import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigDepartmentViewComponent } from './view.component';

describe('ConfigDepartmentViewComponent', () => {
  let component: ConfigDepartmentViewComponent;
  let fixture: ComponentFixture<ConfigDepartmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigDepartmentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDepartmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
