import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { CommonModule } from '@angular/common';
import { RouteService } from '../../services/route.sevice'
import { Route } from '../../interfaces/route.interface'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  map!: mapboxgl.Map;
  routes: Route[] = [];

  constructor(private routeService: RouteService) { }

  ngOnInit(): void {
    this.routes = this.routeService.getRoutes(); // Obtenim rutes del servei
    this.initializeMap();
  }

  initializeMap(): void {
    mapboxgl.default.accessToken = ''; // Mapbox token

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.648, 39.569],
      zoom: 11
    });

    this.map.on('load', () => {
      this.loadRouteWithDirections(this.routes[0].coordinates, this.routes[0].color);
    });
  }

  loadRouteWithDirections(coordinates: [number, number][], color: string): void {
    const start = coordinates[0];
    const end = coordinates[coordinates.length - 1];

    const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.default.accessToken}`;

    fetch(directionsRequest)
      .then(response => response.json())
      .then(data => {
        const route = data.routes[0].geometry;

        if (this.map.getLayer('route')) {
          this.map.removeLayer('route');
          this.map.removeSource('route');
        }

        this.map.addSource('route', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': route,
            'properties': {}
          }
        });

        this.map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': color,
            'line-width': 5
          }
        });
      })
      .catch(error => console.error('Error carregant la ruta: ', error));
  }

  onRouteSelect(route: Route): void {
    this.loadRouteWithDirections(route.coordinates, route.color);
  }
}
