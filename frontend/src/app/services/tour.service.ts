import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../interfaces/tour.interface';
import { Dia } from '../interfaces/dia.interface';

@Injectable({
    providedIn: 'root'
})

export class TourService { //declarem la classe TourService com a servei per poder gestionar tours
    private apiUrl = 'http://localhost:3001/api/tours'; // endponit per tours
    private daysUrl = 'http://localhost:3001/api/days'; //endpoint per carregar dies del tour 

    //definició signals
    tours = signal<Tour[]>([]);
    selectedTour = signal<Tour | null>(null);
    tourDays = signal<Dia[]>([]); // Emmagatzema els dies del tour seleccionat

    constructor(private http: HttpClient) { } // injectemm Httpclient per fet peticions http

    //verifiquem l'ID i password introduit al login
    verifyTourPassword(id_tour: string, password: string) {
        return this.http.post<{ valid: boolean }>(`${this.apiUrl}/verify-password`, { id_tour, password });
    }

    //carreguem tots els tours i actualitzem el signal per al Login
    loadTours(): void {
        this.http.get<Tour[]>(this.apiUrl).subscribe({
            next: (tours) => this.tours.set(tours),
            error: (err) => console.log('Error loading tours', err)
        });
    }

    loadSelectedTour(): void {
        const id = this.selectedTour();
        if (id) {
            this.http.get<Tour>(`${this.apiUrl}/${id}`).subscribe({ //fem la peticio get a l'endpoint
                next: (tour) => this.selectedTour.set(tour),
                error: (err) => console.log('Error carregant el tour', err)
            });
        }
    }

    loadDaysBytourId(id_tour: number): void {
        this.http.get<Dia[]>(`${this.daysUrl}/tour/${id_tour}`).subscribe({
            next: (dies) => this.tourDays.set(dies),
            error: (err) => console.log('Error carregant dies', err)
        });
    }
    //!!!!!!!(BORRAR SI NO EL FEM SERVIR?) carregar un tour específic per ID i actualitzar el signal 
    loadTour(id: string): void {
        this.http.get<Tour>(`${this.apiUrl}/${id}`).subscribe({
            next: (tour) => this.selectedTour.set(tour),
            error: (err) => console.log('Error carregant el tour', err)
        });
    }
}
