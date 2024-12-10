import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { TourService } from '../../services/tour.service';
import { Dia } from '../../interfaces/dia.interface';
import * as mapboxgl from 'mapbox-gl';
import { Chart, registerables } from 'chart.js';



@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id_dia: number | null = null;
  selectedDay = signal<Dia | null | undefined>(null);
  map!: mapboxgl.Map;
  routes: { name: string; color: string; coordinates: [number, number][] }[] = [];
  chart!: Chart;

  constructor(private route: ActivatedRoute, private tourService: TourService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.id_dia = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id_dia) {
      const day = this.tourService.getDayById(this.id_dia);
      console.log(day);

      if (day) {
        this.selectedDay.set(day);
        this.configureRoutes(day);
      }
    }
    this.initializeMap();
    this.createChart([]); // Inicialitza el gràfic amb dades buides
  }

  configureRoutes(day: Dia): void {
    this.routes = []; // Resseteja les rutes abans de configurar-les

    const parseCoordinates = (coord: string | null): [number, number] | null => {
      if (coord) {
        // converteix en nombre
        const parts = coord.split(',').map(part => parseFloat(part.trim()));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          return [parts[0], parts[1]] as [number, number];
        }
      }
      return null;
    };


    // Configura la ruta Espresso si hi ha coordenades d'inici i final
    const espressoCoords = parseCoordinates(day.coordenades_inici);
    const espressoEndCoords = parseCoordinates(day.coordenades_final);
    if (espressoCoords && espressoEndCoords) {
      this.routes.push({
        name: 'Espresso',
        color: 'red',
        coordinates: [espressoCoords, espressoEndCoords]
      });
    }

    // Configura la ruta Macchiato si hi ha coordenades d'inici2 i final2
    const macchiatoCoords = parseCoordinates(day.coordenades_inici2);
    const macchiatoEndCoords = parseCoordinates(day.coordenades_final2);
    if (macchiatoCoords && macchiatoEndCoords) {
      this.routes.push({
        name: 'Macchiato',
        color: 'green',
        coordinates: [macchiatoCoords, macchiatoEndCoords]
      });
    }

    // Configura la ruta Cappuccino si hi ha coordenades d'inici3 i final3
    const cappuccinoCoords = parseCoordinates(day.coordenades_inici3);
    const cappuccinoEndCoords = parseCoordinates(day.coordenades_final3);
    if (cappuccinoCoords && cappuccinoEndCoords) {
      this.routes.push({
        name: 'Cappuccino',
        color: 'blue',
        coordinates: [cappuccinoCoords, cappuccinoEndCoords]
      });
    }
  }

  initializeMap(): void {
    mapboxgl.default.accessToken = 'pk.eyJ1IjoiYWt1c3Rpa29hIiwiYSI6ImNtMWwxeThvNDA0a3Iya3NnZDN1YThzY24ifQ.6plMBiCVFOoSIRpcj_hm8A';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [2.648, 39.569],
      zoom: 10,
      pitch: 40,
      bearing: -25
    });

    this.map.on('load', () => {
      if (this.routes.length === 1) {
        this.loadRouteWithDirections(this.routes[0].coordinates, this.routes[0].color);
      } else if (this.routes.length > 1) {
        this.loadRouteWithDirections(this.routes[0].coordinates, this.routes[0].color);
      }
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

        this.getElevationData(route.coordinates);
      })
      .catch(error => console.error('Error carregant la ruta: ', error));
  }

  getElevationData(coordinates: [number, number][]): void {
    const elevationPromises = coordinates.map(coord => {
      const elevationRequest = `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${coord[0]},${coord[1]}.json?layers=contour&limit=1&access_token=${mapboxgl.default.accessToken}`;
      return fetch(elevationRequest).then(response => response.json());
    });

    Promise.all(elevationPromises).then(elevationResults => {
      const elevations = elevationResults.map(result => {
        if (result.features.length > 0) {
          return result.features[0].properties.ele;
        }
        return 0;
      });

      this.updateChart(elevations);
    }).catch(error => console.error('Error obtenint les dades d\'elevació: ', error));
  }

  createChart(elevationData: number[]): void {
    const canvas = <HTMLCanvasElement>document.getElementById('elevationChart');
    const ctx = canvas.getContext('2d');
    const gradient = ctx?.createLinearGradient(0, 0, 0, canvas.height);

    if (gradient) {
      gradient.addColorStop(0, 'red');
      gradient.addColorStop(1, 'green');
    }

    const labels = elevationData.map((_, i) => i % 5 === 0 ? `Km ${i}` : '');

    this.chart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: labels,
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
    const labels = elevationData.map((_, i) => i % 5 === 0 ? `Km ${i}` : '');

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = elevationData;
    this.chart.update();
  }

  onRouteSelect(route: { coordinates: [number, number][]; color: string }): void {
    this.loadRouteWithDirections(route.coordinates, route.color);
  }
}
