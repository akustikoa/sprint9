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
  filteredTours: Tour[] = []; // Variable per emmagatzemar els tours filtrats

  constructor(public tourService: TourService) {

    effect(() => {
      const tours = this.tourService.tours(); // Obté el valor actual dels tours
      console.log('Tours carregats abans de filtrar:', tours);
      this.filteredTours = tours.filter(tour => tour.nom_tour !== 'Admin Access'); // Filtra "Admin Access"
      console.log('Tours visibles al panell d\'administració:', this.filteredTours);
    });
  }

  ngOnInit(): void {
    console.log('AdminDashboard carregat');

    // Reacciona als canvis en els tours


    // Carrega els tours inicialment
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

  trackById(index: number, tour: Tour): number {
    return tour.id_tour; // Utilitza l'id del tour per al tracking
  }
}