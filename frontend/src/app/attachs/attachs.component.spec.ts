import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachsComponent } from './attachs.component';

describe('AttachsComponent', () => {
  let component: AttachsComponent;
  let fixture: ComponentFixture<AttachsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
