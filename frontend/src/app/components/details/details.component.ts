import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  map!: mapboxgl.Map;

  routes: { name: string, color: string, coordinates: [number, number][] }[] = [
    { name: 'Espresso', color: '#dc3545', coordinates: [[2.648, 39.569], [2.688, 39.629]] },
    { name: 'Macchiato', color: '#28a745', coordinates: [[2.700, 39.570], [2.750, 39.630]] },
    { name: 'Cappuccino', color: '#007bff', coordinates: [[2.620, 39.550], [2.660, 39.610]] }
  ];

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    mapboxgl.default.accessToken = '';

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

  onRouteSelect(route: { name: string, color: string, coordinates: [number, number][] }): void {
    this.loadRouteWithDirections(route.coordinates, route.color);
  }

}