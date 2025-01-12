import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFaculteComponent } from './manage-faculte.component';

describe('ManageFaculteComponent', () => {
  let component: ManageFaculteComponent;
  let fixture: ComponentFixture<ManageFaculteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFaculteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFaculteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
