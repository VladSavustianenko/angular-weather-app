import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-forecast-form',
  templateUrl: './forecast-form.component.html',
})
export class ForecastFormComponent {
  @Output() addLocation = new EventEmitter();

  onAddLocation(zipCode : string) {
    this.addLocation.emit(zipCode);
  }
}
