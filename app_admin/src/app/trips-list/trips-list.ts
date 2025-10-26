import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TripService, Trip } from '../trip.service';

@Component({
  selector: 'app-trips-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trips-list.html',
  styleUrls: ['./trips-list.css']
})
export class TripsListComponent implements OnInit {
  trips: Trip[] = [];
  loading = true;
  error = '';

  constructor(private api: TripService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.api.list().subscribe({
      next: d => { this.trips = d; this.loading = false; },
      error: e => { this.error = e.message || 'Error loading trips'; this.loading = false; }
    });
  }

  delete(code: string) {
    if (!confirm(`Delete trip ${code}?`)) return;
    this.api.remove(code).subscribe({
      next: () => this.refresh(),
      error: e => alert(e.message || 'Delete failed')
    });
  }
}
