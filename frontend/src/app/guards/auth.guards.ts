import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        const authenticatedTourId = localStorage.getItem('authenticatedTourId'); //recuperem el valor de localstorage
        if (!authenticatedTourId) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}