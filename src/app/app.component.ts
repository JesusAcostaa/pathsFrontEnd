import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit() {
    this.setUserInformation();
  }

  setUserInformation() {
    this.authService.user$.subscribe(user => {
      if (!user) {
        this.authService.currentUser.set(null);
        return;
      }

      this.authService.currentUser.set({
        email: user.email!,
        userName: user.displayName!,
        photoUrl: user.photoURL!,
        uid: user.uid!,
      });
    });
  }
}
