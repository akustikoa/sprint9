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
    });
  }

  addDay(): void {
    const dayGroup = this.fb.group({
      numero_dia: [''],
      data_dia: [''],
      titol_etapa: [''],
      imatge_etapa: [''],
      descripcio: [''],
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


  get days(): FormArray<FormGroup> {
    return this.adminForm.get('days') as FormArray<FormGroup>;
  }

  get users(): FormArray<FormGroup> {
    return this.adminForm.get('users') as FormArray<FormGroup>;
  }

  loadTourDetails(id: number): void {
    this.tourService.getTourDetailsById(id).subscribe({
      next: (tourPayload) => {

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
    }
  }
}
