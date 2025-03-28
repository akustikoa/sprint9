import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../interfaces/tour.interface';
import { Dia } from '../interfaces/dia.interface';
import { Discover } from '../interfaces/discover.interface';
import { Hotel } from '../interfaces/hotel.interface';
import { Location } from '../interfaces/location.interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TourPayload } from '../interfaces/tour-payload.interface';


@Injectable({
    providedIn: 'root'
})

export class TourService {
    private apiUrl = 'http://localhost:3001/api/tours';
    private daysUrl = 'http://localhost:3001/api/days';
    private discoverUrl = 'http://localhost:3001/api/discovers';
    private hotelsUrl = 'http://localhost:3001/api/hotels';
    private locationsUrls = 'http://localhost:3001/api/locations';

    public isLoading = signal(false);
    public errorMessage = signal<string | null>(null);

    tours = signal<Tour[]>([]);
    selectedTour = signal<Tour | null>(null);
    tourDays = signal<Dia[]>([]); // dies d'un tour seleccionat
    tourDiscovers = signal<Discover[]>([]);
    tourHotels = signal<Hotel[]>([]);
    tourLocations = signal<Location[]>([]);



    constructor(private http: HttpClient, private router: Router) { }



    // LOGIN (enviem al backend)

    verifyUserTour(email: string, password: string) {
        return this.http.post<{ valid: boolean; id_tour: number }>(`${this.apiUrl}/verify-user-tour`, { email, password });
    }



    //ADMIN - DASHBOARD

    loadTours(): void {
        this.http.get<Tour[]>(this.apiUrl).subscribe({
            next: (tours) => {
                this.tours.set(tours);
            },
            error: (err) => console.log('Error carregant tours:', err)
        });
    }

    getTourDetailsById(id: number): Observable<TourPayload> {
        return this.http.get<TourPayload>(`${this.apiUrl}/details/${id}`);
    }

    createFullTour(tourData: TourPayload): void {
        this.isLoading.set(true);
        this.errorMessage.set(null);

        this.http.post(`${this.apiUrl}/create-full-tour`, tourData).subscribe({
            next: () => {
                this.isLoading.set(false);
            },
            error: (error) => {
                this.isLoading.set(false);
                this.errorMessage.set('Hi ha hagut un error en crear el tour.');
            },
        });
    }

    updateFullTour(tourId: number, tourData: TourPayload): void {
        this.isLoading.set(true);
        this.errorMessage.set(null);

        this.http.put(`${this.apiUrl}/update-full-tour/${tourId}`, tourData).subscribe({
            next: () => {
                this.isLoading.set(false);
            },
            error: (error) => {
                this.isLoading.set(false);
                this.errorMessage.set('Hi ha hagut un error en actualitzar el tour.');
            },
        });
    }

    deleteFullTour(tourId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete-full-tour/${tourId}`);
    }

    // Pujar imatges al backend
    uploadImage(file: File): Observable<{ url: string }> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<{ url: string }>(
            'http://localhost:3001/api/upload',
            formData
        );
    }



    //HOME

    loadSelectedTour(id_tour: number): void {
        this.http.get<Tour>(`${this.apiUrl}/${id_tour}`).subscribe({
            next: (tour) => this.selectedTour.set(tour),
            error: (err) => console.error('Error carregant el tour seleccionat:', err),
        });
    }



    //LIST-DAYS

    loadDaysBytourId(id_tour: number): void {
        this.http.get<Dia[]>(`${this.daysUrl}/tour/${id_tour}`).subscribe({
            next: (dies) => this.tourDays.set(dies),
            error: (err) => console.log('Error carregant dies', err)
        });
    }



    //DETAILS

    getDayById(id_dia: number): Dia | undefined {
        return this.tourDays().find((dia) => dia.id_dia === id_dia);
    }



    //DISCOVER

    loadDiscoverByTourId(id_tour: number): void {
        this.http.get<Discover[]>(`${this.discoverUrl}/tour/${id_tour}`).subscribe({
            next: (discovers) => this.tourDiscovers.set(discovers),
            error: (err) => console.error('Error carregant discovers:', err),
        });
    }

    loadHotelsByTourId(id_tour: number): void {
        this.http.get<Hotel[]>(`${this.hotelsUrl}/tour/${id_tour}`).subscribe({
            next: (hotels) => this.tourHotels.set(hotels),
            error: (err) => console.error('Error carregant hotels:', err),
        });
    }

    loadLocationsByTourId(id_tour: number): void {
        this.http.get<Location[]>(`${this.locationsUrl}/tour/${id_tour}`).subscribe({
            next: (locations) => this.tourLocations.set(locations),
            error: (err) => console.error('Error carregant locations:', err),
        });
    }



    //NAVBAR

    logout(): void {
        localStorage.removeItem('authenticatedTourId');
        this.selectedTour.set(null);
        this.router.navigate(['/login']);
    }



    //APP.COMPONENTS

    loadSelectedTourById(id: number) {
        return this.http.get<Tour>(`${this.apiUrl}/${id}`);
    }
}
