import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelimitationPageComponent } from './delimitation-page.component';

describe('DelimitationPageComponent', () => {
  let component: DelimitationPageComponent;
  let fixture: ComponentFixture<DelimitationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelimitationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelimitationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
