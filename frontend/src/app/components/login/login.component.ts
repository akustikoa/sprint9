import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TourService } from '../../services/tour.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private tourService: TourService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { email, password } = this.loginForm.value;

    this.tourService.verifyUserTour(email, password).subscribe({
      next: (response) => {
        if (response.valid) {
          localStorage.setItem('authenticatedTourId', response.id_tour.toString());
          this.tourService.loadSelectedTour(response.id_tour);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Contrasenya incorrecta';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error de verificació';
      }
    });
  }
}