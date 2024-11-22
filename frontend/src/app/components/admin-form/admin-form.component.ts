import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../interfaces/tour.interface';
import { Dia } from '../../interfaces/dia.interface';
import { CommonModule } from '@angular/common';
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

    // Si hi ha un ID a la ruta, carregar detalls
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
    const tour = this.tourService.getTourById(id);
    if (tour) {
      this.adminForm.patchValue({
        nom_tour: tour.nom_tour,
        imatge_tour: tour.imatge_tour,
        data_inici: tour.data_inici,
        data_final: tour.data_final,
        password: tour.password,
      });

      // Carrega els dies
      this.days.clear();
      tour.days?.forEach((day: Dia) => {
        const dayGroup = this.fb.group({
          numero_dia: day.numero_dia,
          data_dia: day.data_dia,
          titol_etapa: day.titol_etapa,
        });
        this.days.push(dayGroup);
      });

      // Carrega els usuaris
      (tour.users as { email: string }[])?.forEach((user) => {
        const userGroup = this.fb.group({
          email: user.email,
        });
        this.users.push(userGroup);
      });
    }
  }

  onSubmit(): void {
    if (this.adminForm.valid) {
      const formData = this.adminForm.value;

      // Crear el payload per enviar al backend
      const requestPayload: TourPayload = {
        tour: {
          nom_tour: formData.nom_tour,
          imatge_tour: formData.imatge_tour,
          data_inici: formData.data_inici,
          data_final: formData.data_final,
          password: formData.password,
        },
        days: formData.days || [], // Dies associats
        users: formData.users || [], // Usuaris associats
      };

      console.log('Payload enviat:', requestPayload);

      // Crida al servei per crear o actualitzar el tour
      if (this.tourId) {
        this.tourService.updateFullTour(this.tourId, requestPayload);
      } else {
        this.tourService.createFullTour(requestPayload);
      }

      // Navegació i missatges d'èxit
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
