import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourService } from '../../services/tour.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss',
})
export class DiscoverComponent implements OnInit {
  private tourService = inject(TourService);

  // Accessos als signals del servei
  tourDiscovers = this.tourService.tourDiscovers;
  tourLocations = this.tourService.tourLocations;
  tourHotels = this.tourService.tourHotels;

  expandedDiscoverIds = new Set<number>();

  toggleDiscover(id: number): void {
    if (this.expandedDiscoverIds.has(id)) {
      this.expandedDiscoverIds.delete(id);
    } else {
      this.expandedDiscoverIds.add(id);
    }
  }

  isExpanded(id: number): boolean {
    return this.expandedDiscoverIds.has(id);
  }

  expandedSection: 'discover' | 'locations' | 'hotels' | null = null;

  toggleSection(section: 'discover' | 'locations' | 'hotels'): void {
    this.expandedSection = this.expandedSection === section ? null : section;
  }


  ngOnInit(): void {
    const selectedTour = this.tourService.selectedTour();
    if (selectedTour) {
      const id = selectedTour.id_tour;
      this.tourService.loadDiscoverByTourId(id);
      this.tourService.loadLocationsByTourId(id);
      this.tourService.loadHotelsByTourId(id);
    } else {
      console.error('No s’ha trobat cap tour seleccionat.');
    }
  }
}