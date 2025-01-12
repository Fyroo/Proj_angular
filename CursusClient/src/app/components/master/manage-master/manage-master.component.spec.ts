import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMasterComponent } from './manage-master.component';

describe('ManageMasterComponent', () => {
  let component: ManageMasterComponent;
  let fixture: ComponentFixture<ManageMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
