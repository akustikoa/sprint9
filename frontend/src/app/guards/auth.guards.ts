import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const authenticatedTourId = localStorage.getItem('authenticatedTourId');

        if (!authenticatedTourId) {
            this.router.navigate(['/login']);
            return false;
        }

        // Comprovar ruta "admin"
        const isAdminRoute = route.routeConfig?.path?.startsWith('admin');
        if (isAdminRoute) {
            if (authenticatedTourId === '99999') {
                return true;
            } else {
                this.router.navigate(['/home']);
                return false;
            }
        } else {
            if (authenticatedTourId === '99999') {
                this.router.navigate(['/admin']);
                return false;
            } else {
                return true;
            }
        }
    }
}
