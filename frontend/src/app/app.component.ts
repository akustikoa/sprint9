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
      this.tourService.loadSelectedTourById(Number(authenticatedTourId)).subscribe({
        next: (tour) => {
          this.tourService.selectedTour.set(tour); // Assigna el tour

          // si l'usuari està a la ruta arrel va a la home
          if (this.router.url === '/' || this.router.url === '/login') {
            this.router.navigate(['/home']);
          }
        },
        error: () => {
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  showNavbar(): boolean {
    return this.router.url !== '/login';
  }
}
