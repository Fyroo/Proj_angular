import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherComponent } from './afficher.component';

describe('AfficherComponent', () => {
  let component: AfficherComponent;
  let fixture: ComponentFixture<AfficherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
