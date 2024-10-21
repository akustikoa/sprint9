import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { CommonModule } from '@angular/common';
import { RouteService } from '../../services/route.service';
import { Route } from '../../interfaces/route.interface';
import { Chart, registerables } from 'chart.js';

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
  chart!: Chart;

  constructor(private routeService: RouteService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.routes = this.routeService.getRoutes();
    this.initializeMap();
    this.createChart([]); // Inicialitzem el gràfic amb dades buides
  }

  initializeMap(): void {
    mapboxgl.default.accessToken = 'Token';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [2.648, 39.569],
      zoom: 10,
      pitch: 40,
      bearing: -25
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

        // Cridem a la funció per obtenir les dades d'elevació
        this.getElevationData(route.coordinates);
      })
      .catch(error => console.error('Error carregant la ruta: ', error));
  }

  // Funció per obtenir l'elevació mitjançant l'API d'Elevació de Mapbox
  getElevationData(coordinates: [number, number][]): void {
    const elevationPromises = coordinates.map(coord => {
      const elevationRequest = `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${coord[0]},${coord[1]}.json?layers=contour&limit=1&access_token=${mapboxgl.default.accessToken}`;
      return fetch(elevationRequest).then(response => response.json());
    });

    // Esperem a que totes les dades d'elevació arribin
    Promise.all(elevationPromises).then(elevationResults => {
      const elevations = elevationResults.map(result => {
        if (result.features.length > 0) {
          return result.features[0].properties.ele; // Elevació en metres
        }
        return 0;
      });

      // Actualitzem el gràfic amb les dades d'elevació
      this.updateChart(elevations);
    }).catch(error => console.error('Error obtenint les dades d\'elevació: ', error));
  }

  createChart(elevationData: number[]): void {
    const canvas = <HTMLCanvasElement>document.getElementById('elevationChart');
    const ctx = canvas.getContext('2d');
    const gradient = ctx?.createLinearGradient(0, 0, 0, canvas.height);

    // Definir el gradient de color
    if (gradient) {
      gradient.addColorStop(0, 'red'); // Punts baixos
      gradient.addColorStop(1, 'green');   // Punts alts
    }

    // Ajustar les etiquetes per mostrar cada 5 km
    const labels = elevationData.map((_, i) => i % 5 === 0 ? `Km ${i}` : '');

    this.chart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: labels, // Etiquetes amb intervals de 5 km
        datasets: [{
          label: 'Elevation',
          data: elevationData,
          borderColor: gradient,
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: 'Distance (km)' } },
          y: { title: { display: true, text: 'Elevation (m)' } }
        }
      }
    });
  }

  updateChart(elevationData: number[]): void {
    // Ajustar les etiquetes per mostrar cada 5 km
    const labels = elevationData.map((_, i) => i % 5 === 0 ? `Km ${i}` : '');

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = elevationData;
    this.chart.update();
  }

  onRouteSelect(route: Route): void {
    this.loadRouteWithDirections(route.coordinates, route.color);
  }
}





