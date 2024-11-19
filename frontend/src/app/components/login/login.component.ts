import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../interfaces/tour.interface';
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

    // Crear el formulari amb controls per email i password
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Afegim validació d'email
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { email, password } = this.loginForm.value;

    this.tourService.verifyUserTour(email, password).subscribe({
      next: (response) => {
        if (response.valid) {
          localStorage.setItem('authenticatedTourId', response.id_tour.toString()); // Guardem l'ID del tour
          // Cridem al servei per carregar el tour complet
          this.tourService.loadSelectedTour(response.id_tour);
          this.router.navigate(['/home']); // Redirigim a la home
        } else {
          this.errorMessage = 'Contrasenya incorrecta';
        }
      },
      error: (err) => {
        console.error('Error de verificació', err);
        this.errorMessage = 'Error de verificació';
      }
    });
  }
}







// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { TourService } from '../../services/tour.service';
// import { Tour } from '../../interfaces/tour.interface';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss'
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   tours = this.tourService.tours; //Array carregat per la BD
//   errorMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private tourService: TourService,
//     private router: Router
//   ) { }

//   //validem que no estiguin buits
//   ngOnInit(): void {
//     this.tourService.loadTours(); // Carregar els tours al iniciar el component

//     // Crear el formulari amb controls per ID del tour i la contrasenya
//     this.loginForm = this.fb.group({
//       id_tour: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }



//   //Enviem dades
//   onSubmit(): void {
//     const { id_tour, password } = this.loginForm.value;

//     this.tourService.verifyTourPassword(id_tour, password).subscribe({
//       next: (response) => {
//         if (response.valid) {
//           // Si la contrasenya és vàlida, redirigim l'usuari a la pàgina del tour
//           localStorage.setItem('authenticatedTourId', id_tour.toString());
//           this.tourService.selectedTour.set(id_tour);
//           this.router.navigate(['/home']);
//           console.log('Accés concedit al tour:', id_tour);

//         } else {
//           this.errorMessage = 'Contrassenya incorrecta'
//           console.error('Contrasenya incorrecta');
//         }
//       },
//       error: (err) => {
//         console.error('Error de verificació', err);
//         this.errorMessage = 'Error de verificació';
//       }
//     });
//   }
// }