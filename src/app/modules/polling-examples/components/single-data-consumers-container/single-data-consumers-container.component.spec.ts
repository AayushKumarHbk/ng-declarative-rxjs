import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDataConsumersContainerComponent } from './single-data-consumers-container.component';

describe('SingleDataConsumersContainerComponent', () => {
  let component: SingleDataConsumersContainerComponent;
  let fixture: ComponentFixture<SingleDataConsumersContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDataConsumersContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDataConsumersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
