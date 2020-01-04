import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigDepartmentComponent } from './department.component';

describe('ConfigDepartmentComponent', () => {
  let component: ConfigDepartmentComponent;
  let fixture: ComponentFixture<ConfigDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
