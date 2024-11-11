import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TourService } from '../../services/tour.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  tours = [
    { id: 1, nom: "MARK'S MALLORCA CYCLING TOUR" },
    { id: 2, nom: "Tour Alps" },
    { is: 3, nom: "Tour Pirineus" },
  ];

  constructor(private fb: FormBuilder, private tourService: TourService) { }

  //validem que no estiguin buits
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      id_tour: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  //Enviem dades
  onSubmit() {
    if (this.loginForm.valid) {
      const { id_tour, password } = this.loginForm.value;

      this.tourService.verifyTourPassword(id_tour, password).subscribe({
        next: (response) => {
          if (response.valid) {
            console.log('Contrassenya correcta');
          } else {
            console.log('Contrassenya incorrecta');
          }
        },
        error: (error) => {
          if (error.status === 404) {
            console.log('Tour no trobat');
          } else if (error.status === 403) {
            console.log('Contrassenya incorrecta');
          } else {
            console.log('Error del servidor');
          }
        }
      });
    } else {
      console.log('Formulari invàlid!');
    }
  }
}
