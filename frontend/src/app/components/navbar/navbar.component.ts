import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TourService } from '../../services/tour.service';

declare var bootstrap: any; //per tancar el collapse fora del menu

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

  ngOnInit() {
    this.isMobile = window.innerWidth < 992;
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.isMobile = window.innerWidth < 992;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const navbarCollapse = document.getElementById('navbarNav');

    if (
      navbarCollapse?.classList.contains('show') &&
      !target.closest('.navbar')
    ) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  }

  onLogout(): void {
    this.tourService.logout();
  }
}
