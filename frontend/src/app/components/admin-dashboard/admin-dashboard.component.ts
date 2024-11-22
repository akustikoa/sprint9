import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  constructor(public tourService: TourService) { }

  ngOnInit(): void {
    this.tourService.loadTours(); // Carrega la informació dels tours al servei
    console.log('AdminDashboard carregat');
  }

  // Navegar a la vista de detalls o edició
  viewTourDetails(tourId: number): void {
    console.log('Detalls del tour:', tourId); // Aquí pots implementar la navegació
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

