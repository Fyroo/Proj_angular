import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCandidatureComponent } from './manage-candidature.component';

describe('ManageCandidatureComponent', () => {
  let component: ManageCandidatureComponent;
  let fixture: ComponentFixture<ManageCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCandidatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
