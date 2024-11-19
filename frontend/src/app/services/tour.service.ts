import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../interfaces/tour.interface';
import { Dia } from '../interfaces/dia.interface';
import { Router } from '@angular/router';


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

    constructor(private http: HttpClient, private router: Router) { } // injectemm Httpclient per fet peticions http




    // Verificar l'usuari per email i contrasenya
    verifyUserTour(email: string, password: string) {
        return this.http.post<{ valid: boolean; id_tour: number }>(`${this.apiUrl}/verify-user-tour`, { email, password });
    }

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

    loadSelectedTour(id_tour: number): void {
        this.http.get<Tour>(`${this.apiUrl}/${id_tour}`).subscribe({
            next: (tour) => this.selectedTour.set(tour),
            error: (err) => console.error('Error carregant el tour seleccionat:', err)
        });
    }


    //Pel login
    loadSelectedTourById(id: number) {
        return this.http.get<Tour>(`${this.apiUrl}/${id}`);
    }


    loadDaysBytourId(id_tour: number): void {
        this.http.get<Dia[]>(`${this.daysUrl}/tour/${id_tour}`).subscribe({
            next: (dies) => this.tourDays.set(dies),
            error: (err) => console.log('Error carregant dies', err)
        });
    }

    //busquemm dia de la llista tourDays carregada a loadDaysBytourId
    getDayById(id_dia: number): Dia | undefined {
        return this.tourDays().find((dia) => dia.id_dia === id_dia);
    }

    //!!!!!!!(BORRAR SI NO EL FEM SERVIR?) carregar un tour específic per ID i actualitzar el signal 
    loadTour(id: string): void {
        this.http.get<Tour>(`${this.apiUrl}/${id}`).subscribe({
            next: (tour) => this.selectedTour.set(tour),
            error: (err) => console.log('Error carregant el tour', err)
        });
    }
    logout(): void {
        localStorage.removeItem('authenticatedTourId'); // Elimina l'ID autenticat
        this.selectedTour.set(null); // Neteja el signal de Tour seleccionat
        this.router.navigate(['/login']); // Redirigeix al login
    }




}
