import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../interfaces/tour.interface';
import { Dia } from '../interfaces/dia.interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


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
            next: (tours) => {
                this.tours.set(tours);
                console.log('Tours actualitzats al servei:', this.tours());
            },
            error: (err) => console.log('Error carregant tours:', err)
        });
    }

    loadSelectedTour(id_tour: number): void {
        this.http.get<Tour>(`${this.apiUrl}/${id_tour}`).subscribe({
            next: (tour) => this.selectedTour.set(tour),
            error: (err) => console.error('Error carregant el tour seleccionat:', err),
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

    //ADMIN-DASHBOARD
    deleteFullTour(tourId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete-full-tour/${tourId}`);
    }

    updateFullTour(tourId: number, data: any): void {
        this.http.put<void>(`${this.apiUrl}/update-full-tour/${tourId}`, data).subscribe({
            next: () => {
                console.log('Tour actualitzat correctament!');
                this.loadTours(); // Actualitza la llista de tours després de l'actualització
            },
            error: (err) => console.error('Error actualitzant el tour:', err),
        });
    }

    createFullTour(data: any): void {
        this.http.post<void>(`${this.apiUrl}/create-full-tour`, data).subscribe({
            next: () => {
                console.log('Tour creat correctament!');
                this.loadTours(); // Actualitza la llista de tours després de la creació
            },
            error: (err) => console.error('Error creant el tour:', err),
        });
    }

    //ADMIN FORM
    getTourById(id: number): Tour | null {
        const tour = this.tours().find((t) => t.id_tour === id) || null;
        return tour;
    }

}
