import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../interfaces/tour.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  tours: Tour[] = []; // Per emmagatzemar els tours carregats des del servei

  constructor(private tourService: TourService, private router: Router) { }

  ngOnInit(): void {
    this.loadTours(); // Carrega la informació dels tours al inicialitzar
  }

  // Mètode per carregar els tours
  loadTours(): void {
    this.tourService.loadTours(); // Actualitza el signal de tours
    this.tours = this.tourService.tours(); // Llegeix el signal per mostrar
  }

  // Navegar a la vista de detalls o edició
  viewTourDetails(tourId: number): void {
    this.router.navigate(['/admin/tour', tourId]); // Ruta configurada per a la vista de detall/edició
  }

  // Eliminar un tour
  deleteTour(tourId: number): void {
    if (confirm('Estàs segur que vols eliminar aquest tour?')) {
      this.tourService.deleteFullTour(tourId).subscribe({
        next: () => {
          alert('Tour eliminat amb èxit!');
          this.loadTours(); // Actualitza la llista després d'eliminar
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error eliminant el tour:', err.message);
          alert('No s\'ha pogut eliminar el tour.');
        }
      });
    }
  }
}
