import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const authenticatedTourId = localStorage.getItem('authenticatedTourId'); // Recuperem el valor de localStorage
        console.log('Guard activat:', authenticatedTourId);

        if (!authenticatedTourId) {
            console.log('No autenticat. Redirigint a login...');
            this.router.navigate(['/login']);
            return false;
        }

        // Comprovar si la ruta és administrativa
        const isAdminRoute = route.routeConfig?.path?.startsWith('admin'); // Qualsevol ruta que comenci per 'admin'

        if (isAdminRoute) {
            if (authenticatedTourId === '99999') {
                console.log('Usuari administrador detectat. Accés permès a ruta administrativa.');
                return true; // Administrador accés permès
            } else {
                console.log('Usuari normal intentant accedir a ruta administrativa. Redirigint a /home...');
                this.router.navigate(['/home']); // Redirigim els usuaris normals a la home
                return false;
            }
        } else {
            // Si no és una ruta administrativa
            if (authenticatedTourId === '99999') {
                console.log('Usuari administrador intentant accedir a una ruta no administrativa. Redirigint a /admin...');
                this.router.navigate(['/admin']);
                return false; // Els administradors no poden accedir a rutes d'usuaris normals
            } else {
                console.log('Usuari normal detectat. Permetent accés a rutes normals.');
                return true; // Permetem l'accés als usuaris normals
            }
        }
    }
}
