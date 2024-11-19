import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../interfaces/tour.interface'


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  selectedTour = this.tourService.selectedTour; //obtenim el tour seleccionat del servei

  constructor(private tourService: TourService) { }

  ngOnInit(): void {
    const id_tour = localStorage.getItem('authenticatedTourId'); // Obtenim l'ID del tour emmagatzemat
    if (id_tour) {
      this.tourService.loadSelectedTour(Number(id_tour)); // Carreguem el tour seleccionat
    } else {
      console.error('No hi ha cap ID de tour autenticat');
    }
  }


}
