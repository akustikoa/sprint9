import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // Mapbox per al mapa
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule], // Standalone component, no necessita NgModule
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  map: mapboxgl.Map; // Per a Mapbox
  routes = [
    { name: 'Espresso', color: 'btn-danger', geojson: 'assets/espresso.geojson' },
    { name: 'Macchiato', color: 'btn-success', geojson: 'assets/macchiato.geojson' },
    { name: 'Cappuccino', color: 'btn-primary', geojson: 'assets/cappuccino.geojson' }
  ];

  elevations = [
    { name: 'Espresso', image: 'assets/elevation_espresso.jpg' },
    { name: 'Macchiato', image: 'assets/elevation_macchiato.jpg' },
    { name: 'Cappuccino', image: 'assets/elevation_cappuccino.jpg' }
  ];

  ngOnInit(): void {
    this.initializeMap(); // Inicialitza el mapa
  }

  initializeMap(): void {
    (mapboxgl as any).accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Substitueix per l'access token de Mapbox

    this.map = new mapboxgl.Map({
      container: 'map', // ID del div per al mapa
      style: 'mapbox://styles/mapbox/streets-v11', // Estil del mapa
      center: [2.648, 39.569], // Coordenades centrals (Mallorca)
      zoom: 10 // Zoom inicial
    });

    this.map.on('load', () => {
      // Carregar la ruta per defecte (Espresso en aquest cas)
      this.loadRoute(this.routes[0].geojson);
    });
  }

  // Funció per carregar rutes a Mapbox des de fitxers GeoJSON
  loadRoute(geojsonPath: string): void {
    // Eliminar una capa existent si hi ha
    if (this.map.getLayer('route')) {
      this.map.removeLayer('route');
      this.map.removeSource('route');
    }

    // Afegir la nova ruta
    this.map.addSource('route', {
      'type': 'geojson',
      'data': geojsonPath
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
        'line-color': '#ff0000', // Color de la ruta (pots ajustar-ho segons la ruta)
        'line-width': 5
      }
    });
  }

  // Carrega la ruta seleccionada amb els botons
  onRouteSelect(route: any): void {
    this.loadRoute(route.geojson);
  }
}
