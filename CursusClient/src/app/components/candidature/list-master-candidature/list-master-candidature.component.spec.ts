import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMasterCandidatureComponent } from './list-master-candidature.component';

describe('ListMasterCandidatureComponent', () => {
  let component: ListMasterCandidatureComponent;
  let fixture: ComponentFixture<ListMasterCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMasterCandidatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMasterCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
