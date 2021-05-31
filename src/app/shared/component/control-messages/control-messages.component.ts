import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ValidationService} from '../../service/validation.service';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  @Input() labelName?: string;

  get errorMessage(): string {
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        const error = this.control.errors[propertyName];
        
        if(propertyName === 'backend') {
          return error.join(" ");
        }

        return ValidationService.getValidationErrorMessage(
          propertyName,
          error,
          this.labelName
        );
      }
    }

    return undefined;
  }
}
