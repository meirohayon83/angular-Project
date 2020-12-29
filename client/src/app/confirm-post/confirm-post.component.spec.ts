import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPostComponent } from './confirm-post.component';

describe('ConfirmPostComponent', () => {
  let component: ConfirmPostComponent;
  let fixture: ComponentFixture<ConfirmPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
