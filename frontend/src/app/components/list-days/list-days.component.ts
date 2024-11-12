import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { RouterModule } from '@angular/router';
import { Dia } from '../../interfaces/dia.interface';

@Component({
  selector: 'app-list-days',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-days.component.html',
  styleUrl: './list-days.component.scss'
})

export class ListDaysComponent implements OnInit {
  tourDays = this.tourService.tourDays;

  constructor(private tourService: TourService) { }

  ngOnInit(): void {
    const selectedTour = this.tourService.selectedTour();
    if (selectedTour) {
      this.tourService.loadDaysBytourId(selectedTour.id_tour);
    }
  }
}
