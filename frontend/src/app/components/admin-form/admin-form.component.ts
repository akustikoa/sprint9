import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TourService } from '../../services/tour.service';
import { TourPayload } from '../../interfaces/tour-payload.interface';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent implements OnInit {
  adminForm!: FormGroup;
  tourId!: number | null;

  constructor(
    public fb: FormBuilder,
    public tourService: TourService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();

    // Si ID carrega detalls al formulari
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.tourId = +id;
        this.loadTourDetails(this.tourId);
      }
    });
  }

  initForm(): void {
    this.adminForm = this.fb.group({
      nom_tour: [''],
      imatge_tour: [''],
      data_inici: [''],
      data_final: [''],
      password: [''],
      days: this.fb.array([]),
      users: this.fb.array([]),
      hotels: this.fb.array([]),
      locations: this.fb.array([]),
      discovers: this.fb.array([]),
    });
  }

  addDay(): void {
    const dayGroup = this.fb.group({
      numero_dia: [''],
      data_dia: [''],
      titol_etapa: [''],
      imatge_etapa: [''],
      descripcio: [''],
      reliveUrl: [''],
      elevationImage: [''],
      coordenades_inici: [''],
      coordenades_final: [''],
    });

    this.days.push(dayGroup);
  }

  addUser(): void {
    const userGroup = this.fb.group({
      email: ['']
    });

    this.users.push(userGroup);
  }

  addHotel(): void {
    const hotelGroup = this.fb.group({
      nom_hotel: [''],
      descripcio: [''],
      imatge_url: [''],
      enllac: [''],
      nits: [1],
    });
    this.hotels.push(hotelGroup);
  }

  addLocation(): void {
    const locationGroup = this.fb.group({
      nom_location: [''],
      descripico: [''],
      imatge_url: [''],
    })
    this.locations.push(locationGroup);
  }

  addDiscover(): void {
    const discoverGroup = this.fb.group({
      titol: [''],
      descripcio: [''],
      imatge_url: [''],
    });
    this.discovers.push(discoverGroup);
  }


  get days(): FormArray<FormGroup> {
    return this.adminForm.get('days') as FormArray<FormGroup>;
  }

  get users(): FormArray<FormGroup> {
    return this.adminForm.get('users') as FormArray<FormGroup>;
  }

  get hotels(): FormArray<FormGroup> {
    return this.adminForm.get('hotels') as FormArray<FormGroup>;
  }

  get locations(): FormArray<FormGroup> {
    return this.adminForm.get('locations') as FormArray<FormGroup>;
  }

  get discovers(): FormArray<FormGroup> {
    return this.adminForm.get('discovers') as FormArray<FormGroup>;
  }


  loadTourDetails(id: number): void {
    this.tourService.getTourDetailsById(id).subscribe({
      next: (tourPayload) => {
        console.log('Payload rebut:', tourPayload);

        if (tourPayload && tourPayload.tour) {
          // Carregar dades principals
          this.adminForm.patchValue({
            nom_tour: tourPayload.tour.nom_tour || '',
            imatge_tour: tourPayload.tour.imatge_tour || '',
            data_inici: tourPayload.tour.data_inici || '',
            data_final: tourPayload.tour.data_final || '',
            password: tourPayload.tour.password || '',
          });

          // Carregar dies associats
          this.days.clear();
          if (Array.isArray(tourPayload.days) && tourPayload.days.length > 0) {
            tourPayload.days.forEach((day) => {
              const dayGroup = this.fb.group({
                numero_dia: day.numero_dia || '',
                data_dia: day.data_dia || '',
                titol_etapa: day.titol_etapa || '',
                imatge_etapa: day.imatge_etapa || '',
                descripcio: day.descripcio || '',
                reliveUrl: day.reliveUrl || '',
                elevationImage: day.elevationImage || '',
                coordenades_inici: day.coordenades_inici || '',
                coordenades_final: day.coordenades_final || '',
              });
              this.days.push(dayGroup);
            });
          }

          // Carregar usuaris associats
          this.users.clear();
          if (Array.isArray(tourPayload.users) && tourPayload.users.length > 0) {
            tourPayload.users.forEach((user) => {
              const userGroup = this.fb.group({
                email: user.email || '',
              });
              this.users.push(userGroup);
            });
          }

          // Carregar hotels associats
          this.hotels.clear();
          if (Array.isArray(tourPayload.hotels)) {
            tourPayload.hotels.forEach((hotel) => {
              const hotelGroup = this.fb.group({
                nom_hotel: hotel.nom_hotel || '',
                descripcio: hotel.descripcio || '',
                enllac: hotel.enllac || '',
                nits: hotel.nits || 0,
                imatge_url: hotel.imatge_url || '',
              });
              this.hotels.push(hotelGroup);
            });
          }

          // Carregar locations associats
          this.locations.clear();
          if (Array.isArray(tourPayload.locations)) {
            tourPayload.locations.forEach((location) => {
              const locationGroup = this.fb.group({
                nom_location: location.nom_location || '',
                descripcio: location.descripcio || '',
                imatge_url: location.imatge_url || '',
              });
              this.locations.push(locationGroup);
            });
          }

          // Carregar discovers associats
          this.discovers.clear();
          if (Array.isArray(tourPayload.discovers)) {
            tourPayload.discovers.forEach((discover) => {
              const discoverGroup = this.fb.group({
                titol: discover.titol || '',
                descripcio: discover.descripcio || '',
                imatge_url: discover.imatge_url || '',
              });
              this.discovers.push(discoverGroup);
            });
          }

        } else {
          console.error('El payload rebut no conté informació vàlida:', tourPayload);
          alert('No s\'han trobat dades vàlides per aquest tour.');
          this.router.navigate(['/admin']);
        }
      },
      error: (error) => {
        console.error('Error carregant els detalls del tour:', error);
        alert('Hi ha hagut un error en carregar els detalls del tour.');
      },
    });
  }

  deleteDay(index: number): void {
    const confirmDelete = confirm('Estàs segur que vols eliminar aquest dia?');
    if (confirmDelete) {
      this.days.removeAt(index);
      this.onSubmit(); // Reutilitza la funció ja creada per enviar els canvis
    }
  }

  deleteUser(index: number): void {
    const confirmDelete = confirm('Estàs segur que vols eliminar aquest usuari?');
    if (confirmDelete) {
      this.users.removeAt(index);
      this.onSubmit(); // Reutilitza la funció ja creada per enviar els canvis
    }
  }

  deleteHotel(index: number): void {
    const confirmDelete = confirm('Estàs segur que vols eliminar aquest hotel?');
    if (confirmDelete) {
      this.hotels.removeAt(index);
      this.onSubmit();
    }
  }

  deleteLocation(index: number): void {
    const confirmDelete = confirm('Estàs segur que vols eliminar aquesta localització?');
    if (confirmDelete) {
      this.locations.removeAt(index);
      this.onSubmit();
    }
  }

  deleteDiscover(index: number): void {
    const confirmDelete = confirm('Estàs segur que vols eliminar aquest discover?');
    if (confirmDelete) {
      this.discovers.removeAt(index);
      this.onSubmit();
    }
  }


  // per a camps individuals dipus ID
  onFileSelected(event: Event, field: string, index: number): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Només es poden pujar imatges (jpg, png, webp).');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      this.tourService.uploadImage(formData).subscribe({
        next: (response) => {
          const url = response.url;
          console.log('URL rebuda del backend:', url);
          console.log('Valor elevationImage abans:', this.days.at(index).get(field)?.value);

          this.days.at(index).get(field)?.setValue(url);

          console.log('Valor elevationImage després:', this.days.at(index).get(field)?.value);
        },
        error: (err) => {
          console.error(`Error pujant la imatge per ${field}:`, err);
          alert('Error en pujar la imatge.');
        }
      });
    }
  }

  // per a camps dins d'un FormArray (imatge_etapa...)
  onFileSelectedRoot(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validació de tipus d’arxiu
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Només es poden pujar imatges (jpg, png, webp).');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      this.tourService.uploadImage(formData).subscribe({
        next: (response) => {
          const url = response.url;
          this.adminForm.get(field)?.setValue(url);
        },
        error: (err) => {
          console.error(`Error pujant la imatge per ${field}:`, err);
          alert('Error en pujar la imatge.');
        }
      });
    }
  }



  onSubmit(): void {
    if (this.adminForm.valid) {
      const formData = this.adminForm.value;

      const requestPayload: TourPayload = {
        tour: {
          nom_tour: formData.nom_tour,
          imatge_tour: formData.imatge_tour,
          data_inici: formData.data_inici,
          data_final: formData.data_final,
          password: formData.password,
        },
        days: formData.days || [],
        users: formData.users || [],
        hotels: formData.hotels || [],
        locations: formData.locations || [],
        discovers: formData.discovers || [],
      };

      if (this.tourId) {
        this.tourService.updateFullTour(this.tourId, requestPayload);
      } else {
        this.tourService.createFullTour(requestPayload);
      }

      if (!this.tourService.errorMessage()) {
        this.router.navigate(['/admin']);
        alert(this.tourId ? 'Tour actualitzat amb èxit!' : 'Tour creat amb èxit!');
      } else {
        alert(this.tourService.errorMessage());
      }
    } else {
      alert('El formulari no és vàlid. Revisa els camps.');
    };
  }
}
