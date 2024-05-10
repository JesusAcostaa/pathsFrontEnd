import { Component, inject } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  private loaderService = inject(LoaderService);
  public showLoader = this.loaderService.loading;
}
