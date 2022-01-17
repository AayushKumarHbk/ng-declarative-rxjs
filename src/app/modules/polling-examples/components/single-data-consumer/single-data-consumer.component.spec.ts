import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDataConsumerComponent } from './single-data-consumer.component';

describe('SingleDataConsumerComponent', () => {
  let component: SingleDataConsumerComponent;
  let fixture: ComponentFixture<SingleDataConsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDataConsumerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDataConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
