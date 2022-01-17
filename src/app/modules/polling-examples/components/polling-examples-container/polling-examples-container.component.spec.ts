import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingExamplesContainerComponent } from './polling-examples-container.component';

describe('PollingExamplesContainerComponent', () => {
  let component: PollingExamplesContainerComponent;
  let fixture: ComponentFixture<PollingExamplesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollingExamplesContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollingExamplesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
