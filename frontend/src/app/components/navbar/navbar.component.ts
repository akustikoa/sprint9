import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router, private tourService: TourService) { }

  logout(): void {
    localStorage.removeItem('authenticatedEmail'); // Eliminem el correu electrònic autenticat
    this.tourService.selectedTour.set(null); // Resetegem el tour seleccionat
    this.router.navigate(['/login']); // Redirigim a la pàgina de login
  }
}