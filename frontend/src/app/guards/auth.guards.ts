import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        const authenticatedTourId = localStorage.getItem('authenticatedTourId'); //recuperem el valor de localstorage
        console.log('Guard activat:', authenticatedTourId);
        if (!authenticatedTourId) {
            console.log('Redirigint a login...');
            this.router.navigate(['/login']);
            return false;
        }
        console.log('Accés permès.');
        return true;
    }
}