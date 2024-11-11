import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
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

  constructor(private fb: FormBuilder) { }

  //validem que no estiguin buits
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      it_tour: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  //Enviem dades
  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Dades del Formulari:', formData);
    } else {
      console.log('Formulari invàlid!');
    }
  }

}
