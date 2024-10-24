import { Component, OnInit, TemplateRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Locations } from './data/locations/Locations';
import { LocationsData } from './data/locations/LocationsData';
import { CategoriesData } from './data/locations/CategoriesData';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [BsModalService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'AngularMentorship';
  locations: Locations[] = []
  categories: string[] = []

  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  
  openModal(template: TemplateRef<any>) {    
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  this.locations = LocationsData;
  this.categories = CategoriesData;
}

}
