import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockGsmTracksPageComponent } from './mock-gsm-tracks-page.component';

describe('MockGsmTracksPageComponent', () => {
  let component: MockGsmTracksPageComponent;
  let fixture: ComponentFixture<MockGsmTracksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockGsmTracksPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockGsmTracksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
