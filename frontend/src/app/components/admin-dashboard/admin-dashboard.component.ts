import { Component, effect, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Tour } from '../../interfaces/tour.interface';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  filteredTours: Tour[] = []; // Emmagatzema els tours filtrats

  constructor(public tourService: TourService) {

    effect(() => {
      const tours = this.tourService.tours(); // Obté el valor actual dels tours
      this.filteredTours = tours.filter(tour => tour.nom_tour !== 'Admin Access'); // Filtra "Admin Access"
    });
  }

  ngOnInit(): void {

    // Carrega tours
    this.tourService.loadTours();
  }

  // Eliminar un tour
  deleteTour(tourId: number): void {
    if (confirm('Estàs segur que vols eliminar aquest tour?')) {
      this.tourService.deleteFullTour(tourId).subscribe({
        next: () => {
          alert('Tour eliminat amb èxit!');
          this.tourService.loadTours(); // Actualitza la llista després d'eliminar
        },
        error: (err) => {
          console.error('Error eliminant el tour:', err);
          alert('No s\'ha pogut eliminar el tour.');
        }
      });
    }
  }
}