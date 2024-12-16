import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TourService } from '../../services/tour.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isMobile: boolean = false;

  constructor(private tourService: TourService) { }

  @HostListener('window:resize', [])
  onResize(): void {
    this.isMobile = window.innerWidth < 992; // Actualitza isMobile en redimensionar
  }
  ngOnInit() {
    this.isMobile = window.innerWidth < 992; // Inicialitza isMobile
  }

  onLogout(): void {
    this.tourService.logout();
  }
}