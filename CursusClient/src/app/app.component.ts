import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, RouterPreloader } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CursusClient';
}
