import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService, Trip } from '../trip.service';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-form.html',
  styleUrls: ['./trip-form.css']
})
export class TripFormComponent implements OnInit {
  codeParam?: string;
  title = 'Add Trip';
  saving = false;
  error = '';

  // bind this to the text input; we’ll copy it into model.description[0] on save
  descriptionText = '';

  model: Trip = {
    code: '',
    name: '',
    length: 7,
    start: new Date().toISOString().slice(0,10),
    resort: '',
    perPerson: 0,
    image: '',
    description: ['']
  };

  constructor(private route: ActivatedRoute, private api: TripService, private router: Router) {}

  ngOnInit(): void {
    this.codeParam = this.route.snapshot.paramMap.get('code') ?? undefined;
    if (this.codeParam) {
      this.title = `Edit Trip ${this.codeParam}`;
      this.api.get(this.codeParam).subscribe({
        next: t => {
          this.model = { ...t, start: (t.start || '').toString().slice(0,10) };
          this.descriptionText = (t.description && t.description[0]) ? t.description[0] : '';
        },
        error: e => this.error = e.message || 'Load failed'
      });
    }
  }

  submit() {
    this.saving = true; this.error = '';
    // put the single-line field into the array the API expects
    this.model.description = [this.descriptionText || ''];

    const save$ = this.codeParam
      ? this.api.update(this.codeParam, this.model)
      : this.api.add(this.model);

    save$.subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: e => { this.error = e.message || 'Save failed'; this.saving = false; }
    });
  }
}
