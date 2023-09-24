import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  ConstsumRecipientsQuestionEditDetailsFormComponent,
} from './constsum-recipients-question-edit-details-form.component';

describe('ConstsumRecipientsQuestionEditDetailsFormComponent', () => {
  let component: ConstsumRecipientsQuestionEditDetailsFormComponent;
  let fixture: ComponentFixture<ConstsumRecipientsQuestionEditDetailsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConstsumRecipientsQuestionEditDetailsFormComponent],
      imports: [
        FormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstsumRecipientsQuestionEditDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prevent alphabetical character inputs in onPointsInput', () => {
    const event = new KeyboardEvent('keypress', {
      key: 'a',
    });

    const eventSpy = jest.spyOn(event, 'preventDefault');
    component.onPointsInput(event);
    expect(eventSpy).toHaveBeenCalled();
  });

  it('should prevent decimal point inputs in onPointsInput', () => {
    const event = new KeyboardEvent('keypress', {
      key: '.',
    });

    const eventSpy = jest.spyOn(event, 'preventDefault');
    component.onPointsInput(event);
    expect(eventSpy).toHaveBeenCalled();
  });

  it('should allow digit inputs in onPointsInput', () => {
    const event = new KeyboardEvent('keypress', {
      key: '6',
    });

    const eventSpy = jest.spyOn(event, 'preventDefault');
    component.onPointsInput(event);
    expect(eventSpy).not.toHaveBeenCalled();
  });

  it('should allow a 5 digit number input', () => {
    const inputElement = fixture.debugElement.query(By.css('#total-points')).nativeElement as HTMLInputElement;
    const inputEvent = new InputEvent('input');
    inputElement.dispatchEvent(inputEvent);
    (inputEvent.target as HTMLInputElement).value = '12345';
    component.restrictPointsLength(inputEvent, 'points');
    expect((inputEvent.target as HTMLInputElement).value).toEqual('12345');
  });

  it('should restrict a 15 digit number input', () => {
    const inputElement = fixture.debugElement.query(By.css('#total-points')).nativeElement as HTMLInputElement;
    const inputEvent = new InputEvent('input');
    inputElement.dispatchEvent(inputEvent);
    (inputEvent.target as HTMLInputElement).value = '123456789012345';
    component.restrictPointsLength(inputEvent, 'points');
    expect((inputEvent.target as HTMLInputElement).value).toEqual('123456789');
  });
});
