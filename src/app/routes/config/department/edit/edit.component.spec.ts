import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigDepartmentEditComponent } from './edit.component';

describe('ConfigDepartmentEditComponent', () => {
  let component: ConfigDepartmentEditComponent;
  let fixture: ComponentFixture<ConfigDepartmentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigDepartmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDepartmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
