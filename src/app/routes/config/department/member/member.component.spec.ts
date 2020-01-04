import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigDepartmentMemberComponent } from './member.component';

describe('ConfigDepartmentMemberComponent', () => {
  let component: ConfigDepartmentMemberComponent;
  let fixture: ComponentFixture<ConfigDepartmentMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigDepartmentMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDepartmentMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
