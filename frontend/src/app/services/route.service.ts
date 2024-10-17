import { Injectable } from '@angular/core';
import { Route } from '../interfaces/route.interface';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private routes: Route[] = [
    { name: 'Espresso', color: '#dc3545', coordinates: [[2.450, 39.569], [2.688, 39.629]] },
    { name: 'Macchiato', color: '#28a745', coordinates: [[2.700, 39.570], [2.750, 39.630]] },
    { name: 'Cappuccino', color: '#007bff', coordinates: [[2.620, 39.550], [2.660, 39.610]] }


  ];

  getRoutes(): Route[] {
    return this.routes;
  }
}
