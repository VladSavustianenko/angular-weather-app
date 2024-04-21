import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ConditionsMap } from "@forecast/models";
import { WeatherUIService } from "@forecast/services";

@Component({
  selector: 'app-weather-conditions',
  templateUrl: './weather-conditions.component.html',
  styleUrls: ['./weather-conditions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherConditionsComponent {
  protected readonly getWeatherIcon = WeatherUIService.getWeatherIcon
  
  @Input({ required: true }) condition?: ConditionsMap | null;
  @Output() onSelect = new EventEmitter();

  select(zipCode: string) {
    this.onSelect.emit(zipCode);
  }
}
