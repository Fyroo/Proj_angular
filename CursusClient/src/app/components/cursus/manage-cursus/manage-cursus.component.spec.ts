import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCursusComponent } from './manage-cursus.component';

describe('ManageCursusComponent', () => {
  let component: ManageCursusComponent;
  let fixture: ComponentFixture<ManageCursusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCursusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCursusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
