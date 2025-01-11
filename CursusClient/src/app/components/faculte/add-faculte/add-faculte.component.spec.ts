import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFaculteComponent } from './add-faculte.component';

describe('AddFaculteComponent', () => {
  let component: AddFaculteComponent;
  let fixture: ComponentFixture<AddFaculteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFaculteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFaculteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
