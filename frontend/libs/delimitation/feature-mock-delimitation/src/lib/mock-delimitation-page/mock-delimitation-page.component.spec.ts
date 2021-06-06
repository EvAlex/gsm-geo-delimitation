import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockDelimitationPageComponent } from './mock-delimitation-page.component';

describe('MockDelimitationPageComponent', () => {
  let component: MockDelimitationPageComponent;
  let fixture: ComponentFixture<MockDelimitationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockDelimitationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockDelimitationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
