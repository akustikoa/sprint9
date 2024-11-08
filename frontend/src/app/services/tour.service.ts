import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../interfaces/tour.interface';

@Injectable({
    providedIn: 'root'
})

export class TourService { //declarem la classe TourService com a servei per poder gestionar tours
    private apiUrl = 'http://localhost:3001/api/tours'; // emmagatzema la url base per fer les peticions

    //definició signals
    tours = signal<Tour[]>([]);
    selectedTour = signal<Tour | null>(null);

    constructor(private http: HttpClient) { } // injectemm Httpclient per fet peticions http

    //carreguem tots els tours i actualitzem el signal
    loadTours(): void {
        this.http.get<Tour[]>(this.apiUrl).subscribe({
            next: (tours) => this.tours.set(tours),
            error: (err) => console.log('Error loading tours', err)
        });
    }

}