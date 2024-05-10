import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  styleUrl: './not-found.component.css',
  imports: [RouterLink],
})
export class NotFoundComponent {}
