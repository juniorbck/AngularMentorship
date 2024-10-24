import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Locations } from './data/locations/Locations';
import { LocationsData } from './data/locations/LocationsData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'AngularMentorship';
  locations: Locations[] = []

  constructor() {}

  ngOnInit(): void {
  this.locations = LocationsData;
}

}
