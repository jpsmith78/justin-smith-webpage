import { Component } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  constructor(private mapservice: MapService) {}

  state = 'Arkansas';
}
