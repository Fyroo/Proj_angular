import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFaculteComponent } from './list-faculte.component';

describe('ListFaculteComponent', () => {
  let component: ListFaculteComponent;
  let fixture: ComponentFixture<ListFaculteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFaculteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFaculteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
