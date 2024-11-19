import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TourService } from './services/tour.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private router: Router, private tourService: TourService) { }

  ngOnInit(): void {
    const authenticatedTourId = localStorage.getItem('authenticatedTourId');
    if (authenticatedTourId) {
      // Carrega el tour seleccionat a partir de l'id i redirigeix a home
      this.tourService.loadSelectedTourById(Number(authenticatedTourId)).subscribe({
        next: (tour) => {
          this.tourService.selectedTour.set(tour); // Assigna el tour complet
          this.router.navigate(['/home']);
        },
        error: () => {
          // Si hi ha algun error, redirigeix a login
          this.router.navigate(['/login']);
        }
      });
    } else {
      // Si no hi ha autenticació, redirigeix a login
      this.router.navigate(['/login']);
    }
  }

  showNavbar(): boolean {
    return this.router.url !== '/login';
  }
}
