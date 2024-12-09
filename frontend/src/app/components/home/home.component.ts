import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TourService } from '../../services/tour.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  selectedTour = this.tourService.selectedTour;

  constructor(private tourService: TourService) { }

  ngOnInit(): void {
    const id_tour = localStorage.getItem('authenticatedTourId');
    if (id_tour) {
      this.tourService.loadSelectedTour(Number(id_tour));
    } else {
      console.error('No hi ha cap ID de tour autenticat');
    }
  }


}
