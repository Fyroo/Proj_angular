import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserCandidatureComponent } from './list-user-candidature.component';

describe('ListUserCandidatureComponent', () => {
  let component: ListUserCandidatureComponent;
  let fixture: ComponentFixture<ListUserCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUserCandidatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
