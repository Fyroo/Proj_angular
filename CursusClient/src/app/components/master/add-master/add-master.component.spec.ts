import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMasterComponent } from './add-master.component';

describe('AddMasterComponent', () => {
  let component: AddMasterComponent;
  let fixture: ComponentFixture<AddMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
