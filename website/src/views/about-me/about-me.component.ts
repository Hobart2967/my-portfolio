import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { stations } from '../../configuration/stations';
import { CareerStation } from '../../models/career-station.interface';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutMeComponent {
  //#region Properties
  public get stations(): CareerStation[] {
    return stations;
  }
  //#endregion
}