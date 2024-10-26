import { Component, OnInit, TemplateRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Locations } from './data/locations/Locations';
import { LocationsData } from './data/locations/LocationsData';
import { CategoriesData } from './data/locations/CategoriesData';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  providers: [BsModalService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'AngularMentorship';
  locations: Locations[] = [];

  get locationsFiltered() {
    if (this.categorySelected === 'All') {
      return this.locations;
    }
    return this.locations.filter((location: Locations) => {
      return location.category === this.categorySelected;
    });
  }

  get counters() {
    return this.categories.reduce(
      (accumulator: any, category: string) => {
        console.log(accumulator);
        accumulator[category.toLowerCase()] = this.locations.filter(
          (location: Locations) => {
            return location.category === category;
          }
        ).length;
        return accumulator;
      },
      { all: this.locations.length }
    );
  }

  categories: string[] = [];
  categorySelected?: string;

  modalRef?: BsModalRef;
  fb: FormBuilder = new FormBuilder();
  form = this.fb.group({
    id: new FormControl<number | null>(null),
    title: new FormControl<string>('', [Validators.required]),
    category: new FormControl<string>('', []),
    description: new FormControl<string>(''),
    url: new FormControl<string>('', [Validators.required]),
  });

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
    this.locations = LocationsData;
    this.categories = CategoriesData;
    this.categorySelected = 'All';
  }

  categoryButtons() {
    return ['All', ...this.categories];
  }

  setCategorySelected(category: string) {
    this.categorySelected = category;
  }

  openModal(template: TemplateRef<any>, location?: Locations) {
    if (location != null) {
      this.form.patchValue({
        id: location!.id,
        title: location.title,
        description: location.description,
        category: location.category,
        url: location.url,
      });
    } else {
      this.form.reset();
    }
    this.modalRef = this.modalService.show(template);
  }

  updateLocation() {
    if (this.form.value.id != null) {
      if (this.form.valid) {
        const index: number = this.locations.findIndex(
          (location: Locations) => location.id === this.form.value.id
        );

        if (index !== -1) {
          this.locations[index] = {
            id: this.form.value.id,
            title: this.form.value.title,
            description: this.form.value.description,
            category: this.form.value.category,
            url: this.form.value.url,
          } as Locations;
        }

        this.modalRef?.hide();
      }
    } else {
      if (this.form.valid) {
        const location: Locations = {
          id: this.locations.length,
          title: this.form.value.title,
          description: this.form.value.description,
          category: this.form.value.category,
          url: this.form.value.url,
        } as Locations;

        this.locations.push(location);

        this.modalRef?.hide();
      }
    }
  }

  deleteLocation(location: Locations) {
    if (location != null) {
      const index = this.locations.indexOf(location);
      this.locations.splice(index, 1);
    } else {
      alert('Location not found');
    }
  }
}
